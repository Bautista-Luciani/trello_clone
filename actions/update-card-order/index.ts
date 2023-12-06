"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { UpdateCardOrder } from "./schema";
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

    const { items, boardId } = data

    let updatedCards

    try {
        const transaction = items.map((card) =>
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        )

        /* El transaction lo que hace es esperar a que se actualicen todos los items, 
        y que en caso de que falle alguno no se actualiza ninguna */
        updatedCards = await db.$transaction(transaction)

    } catch (error) {
        return {
            error: "Failed to reorder."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
