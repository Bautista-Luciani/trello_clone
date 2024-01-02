# CARDS
## CARD FORM
1. Creamos la accion *createCard* para crear cards ► `actions/create-card`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts* 
2. Creamos el componente *CardForm* ► `.../[boardId]/_components/card-form.tsx`
3. Usamos el CarForm en el ListItem ► `.../[boardId]/_components/list-item.tsx`
4. Creamos el componente *FormTextarea* ► `components/form/form-textarea.tsx`
5. Usamos el FormTextarea en el CardForm ► `.../[boardId]/_components/card-form.tsx`
6. Creamos el componente *CardItem* ► `.../[boardId]/_components/card-item.tsx`
7. Usamos el CardItem en el ListItem ► `.../[boardId]/_components/list-item.tsx`

## CARD MODAL
1. Creamos el hook *useCardModal* ► `hooks/use-card-modal.ts`
2. Creamos el *ModalProvider* ► `components/provider/modal-provider.tsx`
3. Agregamos el ModalProvider al PlatformLayout ► `app/(platform)/layout.tsx`
4. Usamos el *useCardModal* en el CardItem ► `.../[boardId]/_components/card-item.tsx`
5. Hacemos un cambio en el Dialog ► `components/ui/dialog.tsx`
6. Instalamos React Query ► npm i @tanstack/react-query
7. Creamos el *QueryProvider* ► `components/provider/query-provider.tsx`
8. Agregamos el QueryProvider al PlatformLayout ► `app/(platform)/layout.tsx`
9. Creamos la Rest Api para obtener cada card individual ► `app/api/cards/[cardId]/route.ts`
10. Creamos la utlidad *fetcher* ► `lib/fetcher.ts`
11. Creamos la accion *updateCard* para editar el titulo de una card: ► `actions/update-card`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
12. Creamos la accion *copyCard* para editar el titulo de una card: ► `actions/copy-card`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
13. Creamos la accion *deleteCard* para editar el titulo de una card: ► `actions/delete-card`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
14. Agregamos una variante y un size en el boton ► `components/ui/button.tsx`
15. Creamos los componentes para el *CardModal*: ► `components/modals/card-modal/index.tsx`
   - CardHeader ►  `components/modals/card-modal/header.tsx`
   - CardDescription ► `components/modals/card-modal/description.tsx`
   - CardActions ► `components/modals/card-modal/actions.tsx`
    