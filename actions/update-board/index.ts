"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { UpdateBoard } from "./schema";
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

    const { title, id } = data

    let board 

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
            },
            data: {
                title
            }
        })

        await createAuditLog({
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            entityTitle: board.title,
            action: ACTION.UPDATE
        })

    } catch (error) {
        return {
            error: "Failed to update."
        }
    }

    revalidatePath(`/board/${id}`)
    return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
