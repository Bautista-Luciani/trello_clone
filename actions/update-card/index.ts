"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

/* Recordemos que lo que debe retornar esta funcion es data, error o fieldErrors,
ya que fue lo que declaramos en el archivo 'create-safe-action' */
const handler = async(data: InputType): Promise<ReturnType> => {
    
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const { id, boardId, ...values } = data

    let card 

    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            },
            data: {
                ...values
            }
        })

        await createAuditLog({
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            entityTitle: card.title,
            action: ACTION.UPDATE
        })

    } catch (error) {
        return {
            error: "Failed to update."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
