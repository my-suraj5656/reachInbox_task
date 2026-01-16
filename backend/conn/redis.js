import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false
  }
});

redis.on("connect", () => {
  console.log("Redis connected (Upstash)");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

await redis.connect();
