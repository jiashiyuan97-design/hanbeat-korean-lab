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
