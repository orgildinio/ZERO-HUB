import { upstashRedis } from './redis'

import { Ratelimit } from '@upstash/ratelimit'

export const ratelimit = new Ratelimit({
    redis: upstashRedis,
    limiter: Ratelimit.slidingWindow(10, "10s")
})