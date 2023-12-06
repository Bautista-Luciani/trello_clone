# DRAG N' DROP
1. Instalamos la libreria para el drag n drop ► npm i @hello-pangea/dnd
2. En el ListContainer: ► `.../[boardId]/_components/list-container.tsx`
   - Envolvemos el return en el DragDropContext 
   - Le agregamos el onDragEnd al DragDropContext (por ahora una funcion vacia)
   - Envolvemos lo que esta dentro del DragDropContext en el Droppable
   - Al Droppable le definimos un droppableId, un type y una direction
   - Dentro del Droppable desestructuramos el *provided* prop
   - En la ol desestructuramos el *provided.droppableProps* y le pasamos el ref *provided.innerRef*
   - Arriba del ListForm le pasamos el *provided.placeholder*
3. En el ListItem: ► `.../[boardId]/_components/list-item.tsx`
   - Envolvemos el return en el Draggable 
   - Al Draggable le definimos un draggableId y un index
   - Dentro del Draggable desestructuramos el *provided* prop
   - En la li desestructuramos el *provided.droppableProps* y le pasamos el ref *provided.innerRef*
   - Al div que le sigue al li, le desestructuramos el *provided.dragHandleProps*
   - Envolvemos la ol en el Droppable
   - Al Droppable le definimos el droppableId y el type
   - Dentro del Droppable desestructuramos el *provided* prop
   - En la ol desestructuramos el *provided.droppableProps* y le pasamos el ref *provided.innerRef*
   - Antes de que cierre la ol le pasamos el *provided.placeholder*
4. En el CardItem: ► `.../[boardId]/_components/card-item.tsx`
   - Envolvemos el return en el Draggable 
   - Al Draggable le definimos un draggableId y un index
   - Dentro del Draggable desestructuramos el *provided* prop
   - Al div le desestructuramos *provided.droppableProps* y *provided.dragHandleProps* y le pasamos el ref *provided.innerRef*
5. Creamos la accion *updateListOrder* para reordenar las listas ► `actions/update-list-order` 
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts* 
6. Creamos la accion *updateCardOrder* para reordenar las cards ► `actions/update-card-order` 
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts* 
7. En el ListContainer: ► `.../[boardId]/_components/list-container.tsx`
   - Creamos la funcion *reorder* para reordenar elementos de un array
   - Creamos la funcion *onDragEnd* para cuando soltamos un elemento al cual le hicimos drag
