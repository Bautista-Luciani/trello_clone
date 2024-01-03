"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";

/* Recordemos que lo que debe retornar esta funcion es data, error o fieldErrors,
ya que fue lo que declaramos en el archivo 'create-safe-action' */
const handler = async(data: InputType): Promise<ReturnType> => {
    
    const { userId, orgId } = auth()

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const { title, boardId, listId } = data

    let card 

    try {
        /* Obtenemos la lista donde deberiamos crear la card */
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId
                }
            }
        })

        if(!list){
            return {
                error: "List not found :("
            }
        }

        /* Obtenemos la ultima card para saber su order, lo cual define la cantidad de cards que hay */
        const lastCard = await db.card.findFirst({
            where: {
                listId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1 

        card = await db.card.create({
            data: {
                title,
                listId,
                order: newOrder,
            }
        })

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE
        })

    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)
