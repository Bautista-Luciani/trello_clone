"use client"

import { ListWithCards } from "@/types"
import ListForm from "./list-form"

interface ListContainerProps {
    boardId: string
    data: ListWithCards[]
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
        <ListForm/>
        {/* Este div lo que hace es agregar un padding al final del contendor de la lista, 
        ya que sin el podria quedar mal el final del contenedor al hacer scroll */}
        <div className="flex-shrink-0 w-1"/>
    </ol>
  )
}

export default ListContainer