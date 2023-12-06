"use client"

import { ListWithCards } from "@/types"
import ListForm from "./list-form"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import ListItem from "./list-item"
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"

interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

/* Funcion para reordenar elementos de un arreglo */
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  /* Hacemos una copia del array "list" */
  const result = Array.from(list);

  /* Eliminamos un elemento del array en el índice 'startIndex' y lo guardamos en 'removed' */
  const [removed] = result.splice(startIndex, 1);

  /* Insertamos el elemento 'removed' en la posición 'endIndex' del array 'result' */
  result.splice(endIndex, 0, removed);

  /* Retorna el array modificado 'result' con los elementos reordenados */
  return result;
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {

  const [orderedData, setOrderedData] = useState(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (data)=> {
      toast.success("List reordered")
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data)=> {
      toast.success("Card reordered")
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    /* Extraemos las propiedades que vamos a necesitar
    Destination: info sobre el elemento luego del drop
    Source: info sobre el elemento antes del drop
    Type: que elemento queremos mover (en este caso tenemos list y card) */
    const { destination, source, type } = result

    /* Si no hay destino rompemos la funcion */
    if (!destination) return

    /* En caso de que se lance en la misma posicion, tambien rompemos la funcion */
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    /* En caso de que el usuario mueva una lista
    Sabemos lo que esta moviendo porque en el droppable de las lists definimos el type 'list' y en el droppable de las cards definimos el type 'card' */
    if (type === "list") {
      /* Usamos el reorder para reordenar las listas
      1 parametro: orderedData, que es como se encuentran las listas inicialmente antes del reordenamiento 
      2 parametro: source.index, posicion donde se encontraba inicialmente el elemento
      3 parametro: destination.index, posicion donde se lanza el elemento 
      Luego con el map definimos el nuevo orden */
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index
      }))

      /* Guardamos el nuevo orden en el state */
      setOrderedData(items)

      /* Hacemos el cambio en la base de datos */
      executeUpdateListOrder({items, boardId})
    }

    /* En caso de que el usuario mueva una card */
    if (type === "card") {
      /* Hacemos una copia de la orderedData, es decir de las listas */
      let newOrderedData = [...orderedData]

      /* Buscamos a que lista pertenece la card la cual agarramos, y tambien buscamos la lista en la que esa card se suelta 
      En caso de no encontrar ninguna de las dos rompemos la funcion */
      const sourceList = newOrderedData.find(list => list.id === source.droppableId)
      const destinationList = newOrderedData.find(list => list.id === destination.droppableId)

      if (!sourceList || !destinationList) return

      /* Chequeamos si hay cards en el sourceList, sino le definimos un array vacio
      Lo mismo con el destinationList */
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      if (!destinationList.cards) {
        destinationList.cards = []
      }

      /* En caso de que la card se mueva dentro de la misma lista */
      if (source.droppableId === destination.droppableId) {
        /* Usamos el reorder para reordenar las cards
        1 parametro: sourceList.cards, que es como se encuentran las cards inicialmente antes del reordenamiento 
        2 parametro: source.index, posicion donde se encontraba inicialmente el elemento
        3 parametro: destination.index, posicion donde se lanza el elemento */
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index)

        /* Actualizamos el orden de las cards */
        reorderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderedCards

        /* Guardamos el nuevo orden en el state */
        setOrderedData(newOrderedData)

        /* Hacemos el cambio en la base de datos */
        executeUpdateCardOrder({boardId, items: reorderedCards})

      } else {
        /* En caso de que la card se mueva a una lista diferente */

        /* Removemos la card dentro de la lista en la que se encuentra */
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        /* Le asignamos el nuevo listId a la card que estamos moviendo */
        movedCard.listId = destination.droppableId

        /* Agregamos la card a la lista de destino */
        destinationList.cards.splice(destination.index, 0, movedCard)

        /* Actualizamos el orden de las cards de ambas listas */
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        destinationList.cards.forEach((card, index) => {
          card.order = index
        })

        /* Guardamos el nuevo orden en el state */
        setOrderedData(newOrderedData)
        
        /* Hacemos el cambio en la base de datos */
        executeUpdateCardOrder({boardId, items: destinationList.cards})
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              )
            })}
            {provided.placeholder}
            <ListForm />
            {/* Este div lo que hace es agregar un padding al final del contendor de la lista, 
          ya que sin el podria quedar mal el final del contenedor al hacer scroll */}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer