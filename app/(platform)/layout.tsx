import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

/* Creamos este layout para definir que se necesita estar loggeado para ingresar a los archivos que se 
encuentran dentro de la carpeta platform, a diferencia de la carpeta marketing la cual no se necesita estar
loggeado para ingresar a sus archivos */

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout