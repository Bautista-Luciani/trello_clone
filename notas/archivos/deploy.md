# DEPLOY
1. Agregamos el script *postinstall* con el comando *prisma generate* ► `package.json`
2. Vamos al github y creamos un nuevo repositorio:
   - definimos un nombre
   - elegimos si hacerlo publico o privado, en este caso privado
   - creamos el repositorio
3. En la terminal ejecutamos:
   - git add .
   - git commit -m "..."
   - copiamos y pegamos los comando de github donde dice "or push an existing repository..."
4. Vamos a Vercel [https://vercel.com/]:
   - creamos un nuevo proyecto
   - importamos el repositorio que acabamos de crear
   - agregamos todas las variables de entorno
   - hacemos el deploy
5. Una vez que el deploy termina correctamente debemos cambiar las vde *NEXT_PUBLIC_APP_UR* y *STRIPE_WEBHOOK_SECRET*, para eso:
   - Vamos al proyecto dentro de Stripe [https://stripe.com/es-us]
   - Tocamos en "Desarrolladores" o "Developers"
   - Tocamos en "Webhooks"
   - Tocamos en "Añadir punto de conexion" o "Add endpoint"
   - Pegamos la url que nos da Vercel y le agregamos al final *api/webhook*
   - Tocamos en "select events" y seleccionamos:
     - checkout > checkout.session.completed
     - invoice > invoice.payment.succeeded
    (sabemos que tenemos que seleccionar estas porque estan en el archivo `app/api/webhook/route.ts`)
   - Tocamos en "Add endpoint"
   - Revelamos el *Signing secret* y copiamos el codigo
6. Volvemos al proyecto en Vercel:
   - Vamos a *Settings*
   - Vamos a *Enviroment Variables*
   - Editamos la vde *STRIPE_WEBHOOK_SECRET* y pegamos el codigo que habiamos copiado
   - Editamos la vde *NEXT_PUBLIC_APP_UR* y pegamos la url de la pp que nos dio vercel y removemos el ultimo "/"
   - Hacemos un redeploy del proyecto y listo

