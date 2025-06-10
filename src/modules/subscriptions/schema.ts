import { z } from "zod";

export const verifySchema = z.object({
    plan: z.string(),
})