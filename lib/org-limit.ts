/* Creamos este helper para:
-  hacer el fetch de cuantos free boards quedan
-  incrementar la cantidad de boards
-  si se puede crear un nuevo free board o alcanzo el maximo */

import { auth } from "@clerk/nextjs"
import { db } from "./db"
import { MAX_FREE_BOARDS } from "@/constants/board"

/* Funcion para incrementar la cantidad de boards */
export const incrementAvailableCount = async () => {

    /* Obtenemos el orgId */
    const { orgId } = auth()

    /* Verificamos que el orgId exista */
    if( !orgId ){
        throw new Error("Unauthorized")
    }

    /* En caso de que exista obtenemos el orgLimit de esa organizacion */
    const orgLimit = await db.orgLimit.findUnique({
        where: {
            orgId
        }
    })

    /* En caso de que exista editamos el orgLimit e incrementamos la cantidad de boards de esa organizacion
    En caso de que no exista significa que es la primera vez que se crea un board en esa organizacion, entonces debemos crear el orgLimit */
    if( orgLimit ){
        await db.orgLimit.update({
            where: {
                orgId
            },
            data: {
                count: orgLimit.count + 1
            }
        })
    } else {
        await db.orgLimit.create({
            data: {
                orgId,
                count: 1
            }
        })
    }
}

/* Funcion para decrementar la cantidad de boards */
export const decreaseAvailableCount = async () => {

    const { orgId } = auth()

    if(!orgId){
        throw new Error("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: {
            orgId
        }
    })

    if(orgLimit){
        await db.orgLimit.update({
            where: {
                orgId
            },
            data: {
                count: orgLimit.count > 0 ? orgLimit.count - 1 : 0
            }
        })
    } else {
        await db.orgLimit.create({
            data: {
                orgId,
                count: 1
            }
        })
    }
}

/* Funcion para verificar si el usuario puede crear un nuevo free board */
export const hasAvailableCount = async () => {
    
    const { orgId } = auth()

    if( !orgId ){
        throw new Error ("Unauthorized")
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: {
            orgId
        }
    })

    /* En caso de que el orgLimit no exista o que la cantidad de boards sea menor a 5 (que es el maximo permitido para los free boards)
    retornamos true, caso contrario retornamos false */
    if(!orgLimit || orgLimit.count < MAX_FREE_BOARDS){
        return true
    } else {
        return false
    }
}

/* Funcion para obtener la cantidad de free boards que se crearon */
export const getAvailableCount = async () => {

    const { orgId } = auth()

    if(!orgId){
        return 0
    }

    const orgLimit = await db.orgLimit.findUnique({
        where: {
            orgId
        }
    })

    if(!orgLimit){
        return 0
    } 

    return orgLimit.count
}
