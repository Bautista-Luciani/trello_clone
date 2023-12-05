# LISTAS
1. En el archivo `schema.prisma` creamos:
   - El modelo para las listas
   - El modelo para las cards
   - En la terminal ejecutamos el comando *npx prisma migrate reset* (mucho cuidado con este comando porque se borra todo lo que esta cargado dentro de la base de datos, en este caso lo hacemos ya que lo que esta cargado hasta ahora no incluye los dos modelos que creamos recien, debido a que cuando creamos los boards todavia no habiamos definido estos dos modelos)
   - En la terminal ejecutamos el comando *npx prisma db push*
   - En la terminal ejecutamos el comando *npx prisma generate*
2. Obtenemos las listas para renderizarlas ► `.../(dashboard)/board/[boardId]/page.tsx`
3. Creamos el type *ListWithCards* y *CardWithList* ► `types.ts`
4. Creamos el componente *ListContainer* ► `.../(dashboard)/board/[boardId]/_components/list-container.tsx`
5. Creamos la accion *createList* para crear listas ► `actions/create-list`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts* 
6. Creamos el componente *ListForm* ► `.../(dashboard)/board/[boardId]/_components/list-form.tsx`
7. Creamos el componente *ListWrapper* ► `.../(dashboard)/board/[boardId]/_components/list-wrapper.tsx`
8. Usamos el ListWrapper en el ListForm ► `.../(dashboard)/board/[boardId]/_components/list-form.tsx`
9.  Usamos el ListForm en el ListContainer ► `.../board/[boardId]/_components/list-container.tsx`
10. Usamos el ListContainer en el BoardIdPage ► `.../(dashboard)/board/[boardId]/page.tsx`
   