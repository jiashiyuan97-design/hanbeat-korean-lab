# Hanbeat Korean Lab 长期公开网址部署

这个项目不能只用临时隧道，因为成员原声截取和 Naver 发音都依赖 `server.js` 后端接口。要得到长期可打开的网址，需要部署到支持 Node/Docker 的托管服务。

## 推荐：Render

1. 把整个文件夹上传到一个 GitHub 仓库。
2. 打开 Render，选择 `New` -> `Blueprint`。
3. 连接这个仓库，Render 会读取 `render.yaml` 和 `Dockerfile`。
4. 创建完成后，Render 会生成一个固定网址，例如：
   `https://hanbeat-korean-lab.onrender.com`

## 需要保留的文件

- `server.js`
- `index.html`
- `app.js`
- `styles.css`
- `assets/`
- `tools/yt-dlp`
- `package.json`
- `Dockerfile`
- `render.yaml`

`tools/yt-dlp_macos` 和 `tools/cloudflared` 只用于本机调试，云端不会用到。

## 本地检查

```bash
node --check app.js
node --check server.js
PORT=4173 node server.js
```

打开 `http://127.0.0.1:4173` 即可预览。
