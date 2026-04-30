FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci && DATABASE_URL=file:./data/build.db npx prisma generate && mkdir -p /app/prisma/data

COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=file:./data/juris.db

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 5000) + '/health').then((res) => { if (!res.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["sh", "-c", "RUST_LOG=info npm run prisma:deploy && node src/app.js"]
