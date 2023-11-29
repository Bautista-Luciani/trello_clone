# FORM
# Creacion de componentes
1. Creamos el componente *FormInput* ► `components/form/form-input.tsx`
2. Creamos el componente *FormErrors* ► `components/form/form-errors.tsx`
3. Usamos el FormErrors en el FormInput  ► `components/form/form-input.tsx`
4. Creamos el componente *FormSubmit* ► `components/form/form-submit.tsx`

# Creacion del popover
5. Creamos el componente *Info* ► `.../organization/[organizationId]/_components/info.tsx`
6. Usamos el Info en el OrganizationIdPage ► `.../organization/[organizationId]/page.tsx`
7. Creamos el componente *BoardList* ► `.../organization/[organizationId]/_components/board-list.tsx`
8. Creamos el componente *Hint* ► `components/hint.tsx`
9.  Usamos el Hint en el BoardList ► `.../organization/[organizationId]/_components/board-list.tsx`
10. Usamos el BoardList en el OrganizationIdPage ► `.../organization/[organizationId]/page.tsx`
11. Instalamos sonner ► npm i sonner
12. Agregamos el *Toaster* al `app/(platform)/layout.tsx`
13. Creamos el componente *FormPopover* ► `components/form/form-popover.tsx`
14. Agregamos el *PopoverClose* en el archivo `components/ui/popover.tsx`
15. Usamos el FormInput y FormSubmit en el FormPopover ► `components/form/form-popover.tsx`
16. Usamos el FormPopover en el BoardList ► `.../organization/[organizationId]/_components/board-list.tsx`

# Subida de imagen
17. Vamos a [https://unsplash.com/developers]:
    - Nos registramos como un developer
    - Creamos una nueva aplicacion
    - Seleccionamos todas las opciones y aceptamos los terminos
    - Definimos un nombre y una descripcion, en este caso *trello-clone*
    - Instalamos unsplash ► npm i unsplash-js
    - Creamos el archivo `lib/unsplash.ts`
    - Creamos la vde *NEXT_PUBLIC_UNSPLASH_ACCESS_KEY* y su valor va a ser el *Access Key* que nos brinda unsplash al crear la aplicacion ► `.env`
18. Creamos el componente *FormPicker* ► `components/form/form-picker.tsx`
19. Usamos el FormPicker en el FormPopover ► `components/form/form-popover.tsx`
20. Creamos un archivo *defaultImages* para almacenar 9 imagenes por defecto ► `constants/images.ts`
21. Usamos el defaultImages en el FormPicker cosa de que en caso de que haya un error muestre las imagenes por defecto
22. Usamos el FormPopover en el Navbar ► `.../(dashboard)/_components/navbar.tsx`
