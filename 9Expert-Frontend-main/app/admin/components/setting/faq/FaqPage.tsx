'use client'

import { useSearchParams } from "next/navigation"
import { FaqMainPage } from "./FaqMainPage"
import { CreateFaqPage } from "./CreateFaqPage"
import { CreateFaqProvider } from "@/app/admin/context/CreateFaqContext"

export const FaqPage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {

        if (action === 'create') {
            return (
                <CreateFaqProvider><CreateFaqPage /></CreateFaqProvider>
            )
        } else if (action === 'edit') {
            return (
                <CreateFaqProvider><CreateFaqPage /></CreateFaqProvider>
            )
        } else {
            return <><FaqMainPage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}