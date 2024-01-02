"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import { useQuery } from "@tanstack/react-query"
import CardHeader from "./header"
import CardDescription from "./description"
import CardActions from "./actions"

const CardModal = () => {

    const id = useCardModal((state) => state.id)
    const isOpen = useCardModal((state) => state.isOpen)
    const onClose = useCardModal((state) => state.onClose)

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    })



    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                { !cardData
                    ? <CardHeader.Skeleton />
                    : <CardHeader data={cardData} />
                }
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            { !cardData
                                ? <CardDescription.Skeleton />
                                : <CardDescription data={cardData} />
                            }
                        </div>
                    </div>
                    { !cardData
                        ? <CardActions.Skeleton />
                        : <CardActions data={cardData} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CardModal