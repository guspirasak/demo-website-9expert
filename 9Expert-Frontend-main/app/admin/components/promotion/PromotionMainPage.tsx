'use client'

import { useSearchParams } from "next/navigation"
import { PromotionTablePage } from "./PromotionTablePage"
import { CreatePromotionPage } from "./CreatePromotionPage"
import { CreatePromotionSuccess } from "./CreatePromotionSuccess"
export const PromotionMainPage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <><CreatePromotionPage /></>
            )
        } else if (action === 'edit') {
            return (
                <><CreatePromotionPage /></>
            )
        } else if (action === 'result') {
            return (
                <><CreatePromotionSuccess /></>
            )
        } else {
            return <><PromotionTablePage /></>
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}