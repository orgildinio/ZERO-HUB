import { Redis as upstash } from "@upstash/redis"
import Redis from 'ioredis'

export const upstashRedis = new upstash({
    url: process.env.REDIS_DATABASE_URL!,
    token: process.env.REDIS_DATABASE_TOKEN!

});

export const redis = new Redis(process.env.REDIS_DATABASE_URI!);


