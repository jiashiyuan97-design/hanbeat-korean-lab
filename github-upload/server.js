const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { execFile } = require("node:child_process");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const audioCache = new Map();
const captionCache = new Map();
const authCodes = new Map();
const ytDlpBinary = process.platform === "darwin"
  ? path.join(root, "tools", "yt-dlp_macos")
  : path.join(root, "tools", "yt-dlp");
const ytDlpCommand = process.platform === "darwin" ? ytDlpBinary : "python3";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/api/auth/request-code") return requestAuthCode(req, res);
    if (url.pathname === "/api/auth/verify-code") return verifyAuthCode(req, res);
    if (url.pathname === "/api/auth/complete-profile") return completeProfile(req, res);
    if (url.pathname === "/api/naver-tts") return proxyNaver(url, res);
    if (url.pathname === "/api/find-spoken-clip") return findSpokenClip(url, res);
    if (url.pathname === "/api/group-clip") return groupClip(url, res);
    if (url.pathname === "/api/group-audio") return groupAudio(url, res);
    if (url.pathname === "/api/group-audio-source") return groupAudioSource(req, url, res);
    return serveStatic(url, res);
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

async function requestAuthCode(req, res) {
  const body = await readJson(req);
  const phone = normalizePhone(body.phone);
  if (!phone) return sendJson(res, 400, { error: "请输入有效手机号" });
  const users = readUsers();
  const code = String(Math.floor(100000 + Math.random() * 900000));
  authCodes.set(phone, { code, expires: Date.now() + 10 * 60 * 1000 });
  sendJson(res, 200, {
    ok: true,
    exists: Boolean(users[phone]),
    devCode: process.env.SMS_PROVIDER ? undefined : code,
    message: process.env.SMS_PROVIDER ? "验证码已发送" : "演示环境验证码已生成"
  });
}

async function verifyAuthCode(req, res) {
  const body = await readJson(req);
  const phone = normalizePhone(body.phone);
  const code = String(body.code || "").trim();
  const record = authCodes.get(phone);
  if (!phone || !code) return sendJson(res, 400, { error: "手机号和验证码不能为空" });
  if (!record || record.expires < Date.now()) return sendJson(res, 400, { error: "验证码已过期，请重新获取" });
  if (record.code !== code) return sendJson(res, 400, { error: "验证码不正确" });
  const users = readUsers();
  const user = users[phone] || null;
  authCodes.delete(phone);
  sendJson(res, 200, { ok: true, exists: Boolean(user), user });
}

async function completeProfile(req, res) {
  const body = await readJson(req);
  const phone = normalizePhone(body.phone);
  const name = String(body.name || "").trim().slice(0, 24);
  const avatar = String(body.avatar || "mint").replace(/[^a-z0-9-]/gi, "").slice(0, 24) || "mint";
  if (!phone) return sendJson(res, 400, { error: "手机号无效" });
  if (!name) return sendJson(res, 400, { error: "请输入用户名" });
  const users = readUsers();
  const user = users[phone] || { phone, createdAt: new Date().toISOString() };
  user.name = name;
  user.avatar = avatar;
  user.updatedAt = new Date().toISOString();
  users[phone] = user;
  writeUsers(users);
  sendJson(res, 200, { ok: true, user });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

function usersPath() {
  const dir = path.join(root, ".cache");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "users.json");
}

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersPath(), "utf8"));
  } catch {
    return {};
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersPath(), JSON.stringify(users, null, 2));
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "";
  return digits;
}

server.listen(port, () => {
  console.log(`Hanbeat server listening on http://127.0.0.1:${port}`);
});

function serveStatic(url, res) {
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "content-type": mime[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

async function proxyNaver(url, res) {
  const text = url.searchParams.get("text") || "";
  const gender = url.searchParams.get("gender") === "m" ? "jinho" : "kyuri";
  if (!text.trim()) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Missing text" }));
    return;
  }
  const naverUrl = `https://dict.naver.com/api/nvoice?service=dictionary&speech_fmt=mp3&speaker=${gender}&speed=0&text=${encodeURIComponent(text)}`;
  const response = await fetch(naverUrl, {
    headers: {
      "user-agent": "Mozilla/5.0",
      referer: "https://dict.naver.com/"
    }
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  res.writeHead(response.ok ? 200 : response.status, {
    "content-type": "audio/mpeg",
    "cache-control": "public, max-age=86400",
    "content-length": buffer.length
  });
  res.end(buffer);
}

async function groupAudio(url, res) {
  const videoId = url.searchParams.get("videoId");
  const start = Number(url.searchParams.get("start") || 0);
  const end = start + Number(url.searchParams.get("duration") || 4);
  if (!videoId) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Missing videoId" }));
    return;
  }
  try {
    const audioUrl = await resolveAudioUrl(videoId);
    res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
    res.end(JSON.stringify({ url: audioUrl, start, end }));
  } catch (error) {
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function groupAudioSource(req, url, res) {
  const videoId = url.searchParams.get("videoId");
  if (!videoId) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Missing videoId" }));
    return;
  }
  try {
    const audioUrl = await resolveAudioUrl(videoId);
    const headers = {
      "user-agent": "Mozilla/5.0",
      accept: "*/*"
    };
    if (req.headers.range) headers.range = req.headers.range;
    const response = await fetch(audioUrl, { headers });
    res.writeHead(response.status, {
      "content-type": response.headers.get("content-type") || "audio/mp4",
      "content-length": response.headers.get("content-length") || undefined,
      "content-range": response.headers.get("content-range") || undefined,
      "accept-ranges": response.headers.get("accept-ranges") || "bytes",
      "cache-control": "public, max-age=3600"
    });
    if (!response.body) return res.end();
    for await (const chunk of response.body) res.write(chunk);
    res.end();
  } catch (error) {
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function groupClip(url, res) {
  const videoId = url.searchParams.get("videoId");
  const text = url.searchParams.get("text") || "";
  const example = url.searchParams.get("example") || "";
  if (!videoId || !text.trim()) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Missing videoId or text" }));
    return;
  }
  try {
    const cues = await resolveCaptions(videoId);
    const targets = buildCaptionTargets(text, example);
    const match = cues.find((cue) => {
      const normalized = normalizeKorean(cue.text);
      return targets.some((target) => normalized.includes(target));
    });
    if (!match) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "没有找到可截取的成员原声音频片段" }));
      return;
    }
    const start = Math.max(0, match.start - 0.18);
    const end = Math.max(start + 1.8, Math.min(match.end + 0.28, match.start + 5.2));
    const clipPath = await ensureClip(videoId, text, start, end);
    serveAudioFile(clipPath, res);
  } catch (error) {
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function findSpokenClip(url, res) {
  const videoId = url.searchParams.get("videoId");
  const text = url.searchParams.get("text") || "";
  const example = url.searchParams.get("example") || "";
  if (!videoId || !text.trim()) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Missing videoId or text" }));
    return;
  }
  try {
    const cues = await resolveCaptions(videoId);
    const targets = buildCaptionTargets(text, example);
    const match = cues.find((cue) => {
      const normalized = normalizeKorean(cue.text);
      return targets.some((target) => normalized.includes(target));
    });
    if (!match) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "没有在公开视频字幕时间轴里找到这个词的成员原声片段" }));
      return;
    }
    const start = Math.max(0, match.start - 0.18);
    const end = Math.max(start + 1.8, Math.min(match.end + 0.28, match.start + 5.2));
    res.writeHead(200, { "content-type": "application/json", "cache-control": "public, max-age=3600" });
    res.end(JSON.stringify({ videoId, text, start, end, cue: match.text, source: "youtube-caption" }));
  } catch (error) {
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

function buildCaptionTargets(text, example) {
  const pieces = [text, example, ...String(example || "").split(/\s+/), ...String(text || "").split(/\s+/)];
  return [...new Set(pieces.map(normalizeKorean).filter((item) => item.length >= 2))].sort((a, b) => b.length - a.length);
}

function resolveAudioUrl(videoId) {
  if (audioCache.has(videoId)) return Promise.resolve(audioCache.get(videoId));
  return new Promise((resolve, reject) => {
    execFile(ytDlpCommand, ytDlpArgs(["-f", "bestaudio[ext=m4a]/bestaudio", "-g", "--no-playlist", `https://www.youtube.com/watch?v=${videoId}`]), { timeout: 45000 }, (error, stdout, stderr) => {
      if (error) return reject(new Error(stderr.trim() || error.message));
      const directUrl = stdout.trim().split("\n").filter(Boolean).pop();
      if (!directUrl) return reject(new Error("Could not resolve audio stream"));
      audioCache.set(videoId, directUrl);
      resolve(directUrl);
    });
  });
}

function ensureSourceAudio(videoId) {
  const audioDir = path.join(root, ".cache", "audio");
  fs.mkdirSync(audioDir, { recursive: true });
  const sourcePath = path.join(audioDir, `${videoId}.m4a`);
  if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).size > 1024) return Promise.resolve(sourcePath);
  return new Promise((resolve, reject) => {
    execFile(ytDlpCommand, ytDlpArgs(["-f", "bestaudio[ext=m4a]", "--no-playlist", "-o", sourcePath, `https://www.youtube.com/watch?v=${videoId}`]), { timeout: 90000 }, (error, _stdout, stderr) => {
      if (error) return reject(new Error(stderr.trim() || error.message));
      if (!fs.existsSync(sourcePath)) return reject(new Error("没有成功下载可截取的音频文件"));
      resolve(sourcePath);
    });
  });
}

async function ensureClip(videoId, text, start, end) {
  const clipDir = path.join(root, ".cache", "clips");
  fs.mkdirSync(clipDir, { recursive: true });
  const safeText = normalizeKorean(text).slice(0, 24) || "clip";
  const roundedStart = Math.round(start * 100) / 100;
  const duration = Math.round((end - start) * 100) / 100;
  const clipPath = path.join(clipDir, `${videoId}-${safeText}-${Math.round(roundedStart * 100)}-${Math.round(duration * 100)}.m4a`);
  if (fs.existsSync(clipPath) && fs.statSync(clipPath).size > 1024) return clipPath;
  const sourcePath = await ensureSourceAudio(videoId);
  await trimAudioClip(sourcePath, clipPath, roundedStart, duration);
  return clipPath;
}

function trimAudioClip(sourcePath, clipPath, start, duration) {
  if (process.platform === "darwin" && fs.existsSync("/usr/bin/avconvert")) {
    return runClipCommand("/usr/bin/avconvert", [
      "--source",
      sourcePath,
      "--preset",
      "PresetAppleM4A",
      "--start",
      String(start),
      "--duration",
      String(duration),
      "--output",
      clipPath,
      "--replace"
    ], clipPath);
  }
  return runClipCommand("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    String(start),
    "-t",
    String(duration),
    "-i",
    sourcePath,
    "-vn",
    "-acodec",
    "aac",
    "-b:a",
    "128k",
    "-y",
    clipPath
  ], clipPath);
}

function runClipCommand(command, args, clipPath) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { timeout: 45000 }, (error, _stdout, stderr) => {
      if (error) return reject(new Error(stderr.trim() || error.message));
      if (!fs.existsSync(clipPath) || fs.statSync(clipPath).size <= 1024) return reject(new Error("没有成功生成成员原声片段"));
      resolve(clipPath);
    });
  });
}

function serveAudioFile(filePath, res) {
  fs.stat(filePath, (error, stat) => {
    if (error) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Clip not found" }));
      return;
    }
    res.writeHead(200, {
      "content-type": "audio/mp4",
      "cache-control": "public, max-age=86400",
      "content-length": stat.size
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function resolveCaptions(videoId) {
  if (captionCache.has(videoId)) return Promise.resolve(captionCache.get(videoId));
  const captionDir = path.join(root, ".cache", "captions");
  fs.mkdirSync(captionDir, { recursive: true });
  const output = path.join(captionDir, `${videoId}.%(ext)s`);
  const args = [
    "--skip-download",
    "--write-subs",
    "--write-auto-subs",
    "--sub-langs",
    "ko,ko-KR,ko.*",
    "--sub-format",
    "vtt",
    "--no-playlist",
    "-o",
    output,
    `https://www.youtube.com/watch?v=${videoId}`
  ];
  return new Promise((resolve, reject) => {
    execFile(ytDlpCommand, ytDlpArgs(args), { timeout: 60000 }, (error, _stdout, stderr) => {
      const files = fs.readdirSync(captionDir).filter((file) => file.startsWith(`${videoId}.`) && file.endsWith(".vtt"));
      if (!files.length) return reject(new Error(error ? (stderr.trim() || error.message) : "这个公开视频暂时没有可用韩文字幕时间轴"));
      const cues = files.flatMap((file) => parseVtt(fs.readFileSync(path.join(captionDir, file), "utf8")));
      if (!cues.length) return reject(new Error("字幕文件里没有可匹配的时间轴"));
      captionCache.set(videoId, cues);
      resolve(cues);
    });
  });
}

function ytDlpArgs(args) {
  return process.platform === "darwin" ? args : [ytDlpBinary, ...args];
}

function parseVtt(content) {
  const blocks = content.replace(/\r/g, "").split(/\n\n+/);
  return blocks.flatMap((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const timeLine = lines.find((line) => line.includes("-->"));
    if (!timeLine) return [];
    const [startRaw, endRaw] = timeLine.split("-->").map((part) => part.trim().split(/\s+/)[0]);
    const text = lines
      .filter((line) => !line.includes("-->") && !/^WEBVTT$|^Kind:|^Language:|^\d+$/.test(line))
      .join(" ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return [];
    return [{ start: parseVttTime(startRaw), end: parseVttTime(endRaw), text }];
  }).filter((cue) => Number.isFinite(cue.start) && Number.isFinite(cue.end));
}

function parseVttTime(value) {
  const parts = value.replace(",", ".").split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return Number.NaN;
}

function normalizeKorean(value) {
  return String(value || "").replace(/[^\u3131-\u318e\uac00-\ud7a3a-zA-Z0-9]/g, "").toLowerCase();
}
