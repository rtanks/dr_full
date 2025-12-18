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




// import { Module } from "@nestjs/common";
// import {Redis} from 'ioredis'
// @Module({
//     providers: [{
//         provide: "REDIS_CLIENT",
//         useFactory: () => {
//             return new Redis({
//                 host: "localhost", 
//                 port: 6379
//             })
//         }
//     }],
//     exports:['REDIS_CLIENT']
// })

// export class RedisModule{};