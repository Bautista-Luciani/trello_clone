import { z } from "zod"

export const DeleteList = z.object({
    /* Con el id sabemos que list quiere eliminar, y con el boardId sabemos a que board pertenece esa list */
    id: z.string(),
    boardId: z.string()
})