"use client"

import Link from 'next/link';
import { useLocalStorage } from "usehooks-ts"
import { Plus } from "lucide-react"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Accordion } from '@/components/ui/accordion';
import NavItem, { Organization } from './nav-item';

/* Necesitamos storageKey para evitar problemas con el acordeon del sidebar
Vamos a usar el storageKey como key para almacenar en el localStorage el valor de la opcion en donde nos encontramos en el acordeon */
interface SidebarProps {
    storageKey?: string
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {

    /* Usamos el metodo 'useLocalStorage' para obtener el valor almacenado en el LocalStorage */
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

    /* Usamos el 'useOrganization' para obtener la organizacion y si esta cargada, de paso le cambiamos el alias */
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()

    /* Usamos el 'useOrganizationList' para obtener el usuario de organizacion y si esta cargado, de de paso le cambiamos el alias
    Ademas debemos agregar el 'infinite: true', esto lo dice la documentacion */
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({ userMemberships: { infinite: true } })

    /* Creamos una constante la cual itera en todas las key que estan almacenadas en el localStorage,
    y en caso de que esa clave tenga un valor la agrega al acc (que es un array vacio)
    Si la key no tiene ningun valor devuelve el acc como esta, sin agregar nada */
    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }

            return acc
        }, [])

    /* Creamos una funcion la cual abre o cierra la organizacion que le pasemos por parametro */
    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    }

    /* En caso de que este cargando mostramos un skeleton */
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <Skeleton />
            </>
        )
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className='pl-4'>
                    Workspace
                </span>
                <Button type='button' size="icon" variant="ghost" className='ml-auto' asChild>
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(({organization}) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}

export default Sidebar