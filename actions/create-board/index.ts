"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"
import { InputType, ReturnType } from "./types"
import { CreateBoard } from "./schema"

/* Recordemos que lo que debe retornar esta funcion es data, error o fieldErrors,
ya que fue lo que declaramos en el archivo 'create-safe-action' */
const handler = async(data: InputType): Promise<ReturnType> => {
    /* Obtenemos el usuario */
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const { title, image } = data

    /* En el FormPicker definimos un input el cual es el que envia la informacion al form
    El valor de ese input lo definimos con varios valores dividios por un '|'
    Usamos el split para obtener esos valores por separados, es importante el orden en que los extraemos porque tiene que ser el mismo orden de como lo definimos en el value
    Entre esos valores se encuentra el link de la imagen, el autor de la imagen, etc */
    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|")

    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
        return {
            error: "Missing fields. Failed to create board."
        }
    }

    let board

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML
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