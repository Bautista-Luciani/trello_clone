"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type State = {
    errors?: {
        title?: string[]
    },
    message?: string | null
}

/* Utilizamos zod para la verificacion del formulario */
const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letters is required"
    })
})

export async function create(prevState: State, formData: FormData) {

    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields."
        }
    }

    /* Obtenemos el titulo del formulario */
    const { title } = validatedFields.data

    /* Creamos el board en la base de datos */
    try {
        await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            message: "Database Error"
        }
    }

    /* Actualizamos los boards en tiempo real */
    revalidatePath("/organization/")
    redirect("/organization/")
}