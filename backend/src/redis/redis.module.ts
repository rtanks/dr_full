import { Module, Global } from "@nestjs/common";
import Redis from "ioredis";

let redisClient: Redis;

@Global()
@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        if (!redisClient) {
          redisClient = new Redis({
            path: '/home/lovelybu/redis/redis.sock',
          });

          redisClient.on("connect", () => console.log("Redis connected!"));
          redisClient.on("error", (err) => console.error("Redis error:", err));
        }
        return redisClient;
      },
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
