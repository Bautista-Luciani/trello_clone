# PRIMEROS PASOS
## ENVIROMENT SETUP
1. Creamos un nuevo proyecto ► npx create-next-app@latest trello-clone
2. Configuramos el nuevo proyecto:
   - TypeScript ► yes
   - ESLint ► yes
   - Tailwind CSS ► yes
   - Src ► no
   - App Router ► yes
   - Import alias ► no
3. Instalamos Shadcn Ui ► npx shadcn-ui@latest init
4. Configuramos shadcn-ui:
   - TypeScript ► yes
   - Style ► default
   - Base color ► neutral
   - Global Css ► app/global.css
   - CSS Variables ► yes
   - Tailwind.config.js ► tailwind.config.ts
   - Components ► @/components
   - Utils ► @/lib/utils
   - React Server Components ► yes
   - Components.json ► yes
5. Definimos estilos para el html, body y root ► `app/globals.css`
6. Corremos la aplicacion con `npm run dev`
