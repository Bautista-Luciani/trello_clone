# BASE DE DATOS
## PARA ESTA BASE DE DATOS VAMOS A USAR PRISMA Y MYSQL (CON PLANETSCALE)
1. Instalamos prisma ► npm i -D prisma
2. Inicializamos prisma ► npx prisma init
3. Vamos a [https://planetscale.com/] e iniciamos session
4. Creamos una nueva base de datos:
    - Le definimos un nombre, en este caso *trello-clone*
    - Seleccionamos el plan gratuito
    - Seleccionamos *prisma* como framework
    - Creamos una contraseña, en este caso dejamos la que nos aparece por defecto
    - Verificamos que este seleccionada la opcion de *Optimized*
    - Copiamos la *DATABASE_URL* que nos brinda planetscale y la pegamos en el archivo *.env*
    - Copiamos el *schema.prisma* que nos brinda planetscale y lo pegamos en el archivo del proyecto
5. Creamos el modelo de *Board* ► `prisma/schema.prisma`
6. Cada vez que modificamos el archivo `schema.prisma`, ejecutamos en la terminal :
    - npx prisma generate 
    - npx prisma db push
7. Instalamos prisma client ► npm i @prisma/client
8. Creamos una library para poder acceder a la db ► `lib/db.ts`
9. Instalamos zod ► npm i zod
10. Creamos la accion para crear boards ► `actions/create-board.ts`
11. Creamos la accion para eliminar boards ► `actions/delete-board.ts`
   