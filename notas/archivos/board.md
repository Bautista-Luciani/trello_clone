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
1. 
   