import { auth } from "@clerk/nextjs"
import { db } from "./db"

const DAYS_IN_MS = 84_400_000

/* Funcion para chequear subscripcion */
export const checkSubscription = async () => {

    /* Obtenemos el orgId */
    const { orgId } = auth()

    /* En caso de que el orgId no exista retornamos false, ya que al no haber organizacion tampoco hay subscripcion */
    if( !orgId ){
        return false
    }

    /* Obtenemos la subscripcion de la organizacion, y seleccionamos todas las propiedades de stripe */
    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        }
    })

    /* En caso de que no haya una subscripcion retornamos false */
    if( !orgSubscription ){
        return false
    }

    /* Verificamos de que la subscripcion no haya espirado, para eso verificamos:
    - que tenga un precio
    - que el dia final de la sub + un dia, sea mayor al dia actual */
    const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS > Date.now()

    /* Retornamos el "isValid" con dos signos de exclamacion adelante para transformarlo en un booleano */
    return !!isValid
}
