import { z } from "zod"

export const DeleteBoard = z.object({
    /* Con el id sabemos que board quiere eliminar */
    id: z.string()
})