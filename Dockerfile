FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci \
  && DATABASE_URL=postgresql://jurist221:jurist221@localhost:5432/jurist221?schema=public npm run prisma:generate

COPY src ./src

ENV NODE_ENV=production
ENV PORT=10000
ENV DATABASE_URL=postgresql://jurist221:jurist221@localhost:5432/jurist221?schema=public

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 10000) + '/health').then((res) => { if (!res.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["sh", "-c", "RUST_LOG=info npm run prisma:deploy && node src/app.js"]
