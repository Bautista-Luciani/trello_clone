"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { UpdateList } from "./schema";
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

    const { title, id, boardId } = data

    let list 

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId
                } 
            },
            data: {
                title
            }
        })

        await createAuditLog({
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            entityTitle: list.title,
            action: ACTION.UPDATE
        })

    } catch (error) {
        return {
            error: "Failed to update."
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)
