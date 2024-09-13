'use client'

import { useSearchParams } from "next/navigation"
import { AreaTablePage } from "./AreaTablePage"
import { CGMainPage } from "./courseGroup/CGMainPage"

export const AreaMainPage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'detail') {
            return (
                <><CGMainPage /></>
            )
        } else {
            return <><AreaTablePage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}