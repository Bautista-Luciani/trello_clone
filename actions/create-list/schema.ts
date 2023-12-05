import { z } from "zod";

export const CreateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3, {
        message: "Title is too short."
    }),
    /* Con el boardId sabemos a que board pertenece la lista */
    boardId: z.string()
})
