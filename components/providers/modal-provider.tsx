"use client"

import { useEffect, useState } from "react"
import CardModal from "../modal/card-modal"

const ModalProvider = () => {

    /* Evitamos problemas de hidratacion con el useState, useEffect y el if */
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return
    }

    return (
        <CardModal />
    )
}

export default ModalProvider