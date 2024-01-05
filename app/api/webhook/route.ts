import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request){
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return new NextResponse("Webhook error", { status: 400 })
    }

    /* Si llega hasta aca es posterior a que el usuario haya cargado todos los datos del pago */
    const session = event.data.object as Stripe.Checkout.Session

    /* En caso de que el pago finalice correctamente creamos la subscripcion */
    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        /* Es importante pasarle el metadata en la accion "stripe-redirect" ya que define a que organizacion hay que hacerle la subscripcion
        En caso de no haberle pasado la metadata debemos retonar un error */
        if(!session?.metadata?.orgId) {
            return new NextResponse("Org Id is required", { status: 400 })
        }

        await db.orgSubscription.create({
            data: {
                orgId: session?.metadata?.orgId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })
    }

    /* En caso de que el usuario renueve la subscripcion */
    if(event.type === "invoice.payment_succeeded"){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        await db.orgSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })

    }

    /* Impotante hacer este retorno */
    return new NextResponse(null, { status: 200 })

}
