# AUTENTICACION
## PARA LA AUTENTICACION VAMOS A USAR CLERK
1. Vamos a [https://clerk.com/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none]
2. Creamos una nueva aplicacion:
   - Le definimos un nombre, en este caso trello-clone
   - Definimos como van a poder logearse los usuarios, en este caso solo google
3. Creamos el archivo `.env`
4. Pegamos las variables que nos brinda Clerk en el archivo `.env`
5. Agregamos el archivo en *.env* al archivo `.gitignore`
6. Vamos a la documentacion de Clerk [https://clerk.com/docs/quickstarts/nextjs?_gl=1*1fhgw02*_gcl_au*MTAxNzMyNzkzLjE3MDA1OTk1NTQ.]
7. Instalamos Clerk ► npm install @clerk/nextjs
8. Creamos el *PlatformLayout* ► `app/(platform)/layout.tsx`
9. Agregamos el *Clerk Provider* en el PlatformLayout ► `app/(platform)/layout.tsx`
10. Creamos el archivo `middleware.ts` y pegamos lo que nos brinda la doc de Clerk
11. Definimos el PublicRoutes en el authMiddleware para permitir que los usuarios ingresen al MarketingPage si no estan logueados ► `middleware.ts`
12. Vamos a [https://clerk.com/docs/references/nextjs/custom-signup-signin-pages]
13. Creamos el archivo `app/(platform)/(clerk)/sign-up/[[...sign-up]]/page.tsx` y pegamos lo que nos brinda la doc de Clerk
14. Creamos el archivo `app/(platform)/(clerk)/sign-in/[[...sign-in]]/page.tsx` y pegamos lo que nos brinda la doc de Clerk
15. Creamos las vde de Clerk para el registro y login de la aplicacion ► `.env`
16. Creamos el *ClerkLayout* ► `app/(platform)/(clerk)/layout.tsx`

## ORGANIZATIONS
1. Vamos al proyecto que creamos el Clerk y tocamos en *Organizations*
2. Tocamos en *Enable organizations* y lo activamos
3. Creamos el archivo `app/(platform)/(clerk)/select-org/[[...select-org]]/page.tsx`
4. Creamos la *OrganizationIdPage* ► `app/(platform)/(dashboard)/organization/[organizationId]/page.tsx`
5. Creamos el DashboardLayout ► `app/(platform)/(dashboard)/layout.tsx`
6. Creamos el componente Navbar ► `app/(platform)/(dashboard)/_components/navbar.tsx`
7. Usamos el Navbar en el DashboardLayout ► `app/(platform)/(dashboard)/layout.tsx`
8. Definimos el afterAuth() en el authMiddleware para que los usuarios no puedan ingresar al MarketingPage si estan logueados ► `middleware.ts`
9. 

## NOTAS
En los *Server Components* podemos usar los metodos de Clerk:
- currentUser() → para obtener el usuario ingresado y todos sus datos // const user = await currentUser()
- auth() → 
  - para obtener el id del usuario // const { userId } = await auth()
  - para obtener el id de la organizacion // const { orgId } = await auth()

En los *Client Components* podemos usar los metodos de Clerk:
- useUser() → para obtener el usuario ingresado y todos sus datos // const { user } = await useUser()
- useAuth() → para obtener el id del usuario // const { userId } = await useAuth()
