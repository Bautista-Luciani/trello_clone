"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

/* Recordemos que lo que debe retornar esta funcion es data, error o fieldErrors,
ya que fue lo que declaramos en el archivo 'create-safe-action' */
const handler = async(data: InputType): Promise<ReturnType> => {
    
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const { id, boardId } = data

    let list 

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            }
        })
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler)