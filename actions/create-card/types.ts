import { z } from "zod"
import { CreateCard } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Card } from "@prisma/client"

export type InputType = z.infer<typeof CreateCard>
/* Es lo que esperamos que retorne el index.ts, en este caso una Card */
export type ReturnType = ActionState<InputType, Card>