# MARKETING
1. Borramos el archivo `app/page.tsx`
2. Creamos el MarketingLayout ► `app/(marketing)/layout.tsx`
3. Creamos el archivo `app/(marketing)/page.tsx`
4. Vamos a [https://github.com/AntonioErdeljac/next13-trello/blob/master/public/fonts/font.woff2]
5. Instalamos el archivo raw para los fonts
6. Pegamos el archivo descargado en la carpeta *public* ► `public/fonts/font.woff2`
7. Agregamos fonts al archivo `app/(marketing)/page.tsx`:
   - *LocalFonts:*
     - Importamos localFont de *next/font/local*
     - Cramos la constante headingFont
     - Agregamos el headingFont al div
   - *GoogleFonts:*
     - Importamos Poppins de *next/font/google*
     - Cramos la constante textFont
     - Agregamos el headingFont al div
8. Vamos a [https://github.com/AntonioErdeljac/next13-trello/blob/master/public/logo.svg]
9. Instalamos el logo
10. Creamos el componente Logo ► `components/logo.tsx`
11. Creamos el componente Navbar ► `app/(marketing)/_components/navbar.tsx`
12. Usamos el componente Logo en el Navbar ► `app/(marketing)/_components/navbar.tsx`
13. Usamos el componente Navbar en el MarketingLayout ► `app/(marketing)/layout.tsx`
14. Creamos el componente Footer ► `app/(marketing)/_components/footer.tsx`
15. Usamos el componente Footer en el MarketingLayout ► `app/(marketing)/layout.tsx`