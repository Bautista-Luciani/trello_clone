import { z } from "zod"
import { CreateList } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { List } from "@prisma/client"

export type InputType = z.infer<typeof CreateList>
/* Es lo que esperamos que retorne el index.ts, en este caso una List */
export type ReturnType = ActionState<InputType, List>