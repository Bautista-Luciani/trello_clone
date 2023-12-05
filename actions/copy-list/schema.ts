import { z } from "zod"

export const CopyList = z.object({
    /* Con el id sabemos que list quiere copiar, y con el boardId sabemos a que board pertenece esa list */
    id: z.string(),
    boardId: z.string()
})