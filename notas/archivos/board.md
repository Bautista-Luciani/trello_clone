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

## BOARD 
<!-- Trabajamos en el limite de los baords -->
1. Creamos el modelo *OrgLimit* ► `prisma/schema.prisma`
2. En la terminal ejecutamos:
   - npx prisma generate
   - npx prisma db push
3. Creamos la constante *MAX_FREE_BOARDS* ► `constants/board.ts`
4. Creamos las siguientes funciones para el helper `lib/org-limit.ts`:
   - incrementAvailableCount
   - decreaseAvailableCount
   - hasAvailableCount
   - getAvailableCount
5. Usamos el MAX_FREE_BOARDS y getAvailableCount en el BoardList ► `../[organizationId]/../board-list.tsx`
6. Usamos el incrementAvailableCount y hasAvailableCount al crear un board ► `actions/create-board`
7. Usamos decreaseAvailableCount al eliminar un board ► `actions/delete-board`
<!-- Trabajamos en la subscripcion de los baords -->
8. Creamos el modelo *OrgSubscription* ► `prisma/schema.prisma`
9.  En la terminal ejecutamos:
   - npx prisma generate
   - npx prisma db push
10. Instalamos stripe ► npm i stripe
11. Creamos un helper para stripe ► `lib/stripe.ts`
12. Creamos un helper para saber si nuestra subscripcion esta activa ► `lib/subscription.ts`
13. Vamos a [https://stripe.com/es-us]:
    - iniciamos sesion
    - Tocamos en "Nueva empresa" o "new account"
    - Definimos un nombre, en este caso trello-clone
    - Tocamos en "Desarrolladores" o "Developers"
    - Vamos a "Claves de API" o "API keys"
    - Tocamos en "Revelar la clave de prueba" o "Reveal test key"
    - Copiamos la clave de prueba
14. Definimos la vde *STRIPE_API_KEY* y su valor va a ser la clave de prueba que copiamos antes ► `env`
<!-- Trabajamos en el modal para la subscripcion -->
15. Creamos el hook *useProModal* ► `hooks/use-pro-modal.ts`
16. Creamos el componente *ProModal* ► `components/modal/pro-modal.tsx`
17. Agregamos el *ProModal* dentro del ModalProvider ► `components/providers/modal-provider.tsx`
18. Usamos el *useProModal* en el FormPopover ► `components/form/form-popover.tsx`
<!-- Trabajamos en el pago para la subscripcion -->
19. Creamos la vde *NEXT_PUBLIC_APP_URL* y su valor va a ser nuestra url ► `.env`
20. Creamos la utilidad *absoluteUrl* ► `lib/utils.ts`
21. Creamos la accion *stripeRedirect* para redirijir a stripe: ► `actions/stripe-redirect`
   - Primero creamos el *schema.ts*
   - Segundo creamos el *types.ts*
   - Por ultimo creamos el *index.ts*
22. Usamos el *stripeRedirect* en el ProModal ► `components/modal/pro-modal.tsx`
23. Creamos el endpoint para poder pagar, ya que hasta el momento no se puede ► `app/api/webhook/route.ts`
24. Volvemos al proyecto dentro de [https://stripe.com/es-us]:
    - Vamos a "Webhooks"
    - Tocamos en "Probar en un entorno local" o "test in a local enviroment"
    - Seguimos los pasos que nos dicen:
      - Descargamos la CLI (ver video en youtube [https://www.youtube.com/watch?v=jJu8vQH7hLY])
      - En el cmd ejecutamos "stripe login"
      - Nos dirijimos a la url que nos brinda el cmd al hacer "stripe login"
      - Tocamos en "Dar acceso" o "Allow access"
      - Cuando volvamos al webhook debemos ver que el primer paso dice "Completado" o "Completed"
      - En el cmd ejecutamos "stripe listen --forward-to localhost:3000/api/webhook"
      - Copiamos el *webhook signing secret* que nos brinda al ejecutar el comando anterior
      - Cuando volvamos al webhook debemos ver que el segundo paso dice "Completado" o "Completed"
25. Creamos la vde *STRIPE_WEBHOOK_SECRET* y su valor va a ser lo que copiamos ► `.env`
26. Agregamos el */api/webhook* al publicRoutes para poder acceder sin autenticacion ► `middleware.ts`
27. Usamos el *chechSubscription* en el BoardList ► `../[organizationId]/_components/board-list.tsx`
29. Usamos el *chechSubscription* en el createBoard ► `actions/create-board`
30. Le pasamos como prop el *isPro* al componente *Info* ► `../[organizationId]/_components/info.tsx`
31. Modificamos todos los lugares donde usamos el componente *Info* agregandole la prop *isPro*
<!-- Trabajamos en la pagina del billing -->
32. Volvemos al proyecto dentro de [https://stripe.com/es-us]:
   - En el buscador escribimos "billing portal" y tocamos el que dice "conf > billing > portal de clientes"
   - Tocamos donde dice "Activar enlace de prueba" o "Activate test link"
33. Creamos la pagina *BillingPage* ► `../[organizationId]/billing/page.tsx`
34. Creamos el componente *SubscriptionButton* ► `../billing/_components/subscription-button.tsx`
35. Usamos el *SubscriptionButton* en el BillingPage ► `../[organizationId]/billing/page.tsx`
