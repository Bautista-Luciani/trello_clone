# BOARD
## CREACION DE UN BOARD
1. Instalamos zod ► npm i zod
2. Creamos la accion *createSafeAction* ► `lib/create-safe-action.ts`
3. Creamos el schema *CreateBoard* ► `actions/create-board/schema.ts`
4. Creamos el archivo donde definimos los types ► `actions/create-board/types.ts`
5. Creamos el handler para crear un board ► `actions/create-board/index.ts`
6. Creamos el hook *useAction* ► `hooks/use-action.ts`

## BOARD LIST
1. En el componente BoardList: ► `.../[organizationId]/_components/board-list.tsx`
   - Creamos la lista de boards, mostrando cada board con su informacion
   - Creamos el SkeletonBoardList
2. Envolvemos el BoardList en el Suspense y pasamos el SkeletonBoardList ► `.../[organizationId]/page.tsx`

## BOARD PAGE
1. Creamos el *BoardIdPage* ► `.../(dashboard)/board/[boardId]/page.tsx`
2. Creamos el *BoardIdLayout* ► `.../(dashboard)/board/[boardId]/layout.tsx`
3. Creamos el componente *BoardNavbar* ► `.../(dashboard)/board/[boardId]/_components/board-navbar.tsx`
4. Agregamos una nueva variante *transparent* al button ► `components/ui/button.tsx`
5. Le hacemos un cambio al input ► `components/ui/input.tsx`
6. Creamos el componente *BoardTitleForm* ► `.../board/[boardId]/_components/board-title-form.tsx`
7. Usamos el BoardTitleForm en el BoardNavbar ► `.../board/[boardId]/_components/board-navbar.tsx`
8. Creamos la accion *updatedBoard* para editar el titulo del board: ► `actions/update-board`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
9. Usamos la accion updatedBoard en el BoardTitleForm ► `/board/[boardId]/_components/board-title-form.tsx`
10. Creamos el componente *BoardOptions* ► `.../board/[boardId]/_components/board-options.tsx`
11. Usamos el BoardOptions en el BoardNavbar ► `.../board/[boardId]/_components/board-navbar.tsx`
12. Creamos la accion *deleteBoard* para eliminar un board: ► `actions/delete-board`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
13. Usamos la accion deleteBoard en el BoardOptions ► `.../board/[boardId]/_components/board-options.tsx`
