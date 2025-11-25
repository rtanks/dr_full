import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class DraftService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis:Redis){}

    async saveDraft(userKey: string, data:any) {
        //30 min => 30 * 60s => 1800s
        return await this.redis.set(`draft:${userKey}`, JSON.stringify(data), 'EX', 1800);
    }

    async getDraft(userKey:string) {
        const data = await this.redis.get(`draft:${userKey}`);
        // return data ? JSON.parse(data) : null;
        return data;
    }

    async deleteDraft(userKey:string) {
        await this.redis.del(`draft:${userKey}`);
    }
}