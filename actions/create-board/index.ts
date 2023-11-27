"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"

/* Recordemos que lo que debe retornar esta funcion es data, error o fieldErrors,
ya que fue lo que declaramos en el archivo 'create-safe-action' */
const handler = async(data: InputType): Promise<ReturnType> => {
    /* Obtenemos el usuario */
    const { userId } = auth()

    if(!userId){
        return {
            error: "Unauthorized"
        }
    }

    const { title } = data

    let board

    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${board.id}`)
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)