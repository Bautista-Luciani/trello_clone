"use client"

import { createCard } from "@/actions/create-card"
import FormSubmit from "@/components/form/form-submit"
import FormTextarea from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { Plus, X } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface CardFormProps {
    listId: string
    isEditing: boolean
    enableEditing: () => void
    disableEditing: () => void
}

/* Recordemos que cuando pasamos un ref como prop debemos envolver el componente en el forwardRef y definir el displayName */
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, isEditing, enableEditing, disableEditing }, ref) => {

    const params = useParams()

    const formRef = useRef<ElementRef<"form">>(null)

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data)=> {
            toast.success(`Card "${data.title}" created`)
            formRef.current?.reset()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Escape"){
            disableEditing()
        }
    }

    /* En un textarea normal si apretas 'enter' hace un salto de linea, en este caso queremos que si el usuario hace enter se guarden los cambios
    Salvo que al apretar 'enter' este tocando 'shift', en ese caso si queremos que haga un salto de linea */
    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            formRef.current?.requestSubmit()
        }
    }

    const handlerSubmit = (formData: FormData) => {
        const listId = formData.get("listId") as string
        const title = formData.get("title") as string
        const boardId = params.boardId as string

        execute({title, boardId, listId})
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)
    
    if (isEditing) {
        return (
            <form 
                className="m-1 py-0.5 px-1 space-y-4"
                ref={formRef}
                action={handlerSubmit}
            >
                <FormTextarea
                    id="title"
                    ref={ref}
                    placeholder="Enter a title for this card..."
                    onKeyDown={onTextareakeyDown}
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button
                        onClick={disableEditing}
                        size="sm"
                        variant="ghost"
                    >
                        <X className="h-5 w-5"/>
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                size="sm"
                variant="ghost"
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"

export default CardForm