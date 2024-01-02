import { z } from "zod"

export const DeleteCard = z.object({
    /* Con el id sabemos que card quiere copiar, y con el boardId sabemos a que board pertenece esa card */
    id: z.string(),
    boardId: z.string()
})
