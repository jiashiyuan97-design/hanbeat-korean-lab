FROM node:24-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates python3 ffmpeg \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

ENV NODE_ENV=production
ENV PORT=4173

EXPOSE 4173
CMD ["node", "server.js"]
