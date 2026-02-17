FROM oven/bun:latest as builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN bun install -g serve
EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
