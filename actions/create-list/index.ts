"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { CreateList } from "./schema";
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

    const { title, boardId } = data

    let list 

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        })

        if(!board){
            return {
                error: "Unauthorized"
            }
        }

        /* Creamos el lastList para obtener el orden del ultimo elemento de la lista (que significa la cantidad de listas que hay),
        para luego definir el orden de la nueva lista que vamos a crear */
        const lastList = await db.list.findFirst({
            where: {
                boardId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        })

        const newOrder = lastList ? lastList.order + 1 : 1

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        })

        await createAuditLog({
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            entityTitle: list.title,
            action: ACTION.CREATE
        })

    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const createList = createSafeAction(CreateList, handler)
