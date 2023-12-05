"use client"

import { ListWithCards } from "@/types"
import ListForm from "./list-form"
import { useEffect, useState } from "react"
import ListItem from "./list-item"

interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {

  const [ordenedData, setOrdenedData] = useState(data)

  useEffect(() => {
    setOrdenedData(data)
  }, [data])

  return (
    <ol className="flex gap-x-3 h-full">
      {ordenedData.map((list, index) => {
        return (
          <ListItem
            key={list.id}
            index={index}
            data={list}
          />
        )
      })}
      <ListForm />
      {/* Este div lo que hace es agregar un padding al final del contendor de la lista, 
        ya que sin el podria quedar mal el final del contenedor al hacer scroll */}
      <div className="flex-shrink-0 w-1" />
    </ol>
  )
}

export default ListContainer