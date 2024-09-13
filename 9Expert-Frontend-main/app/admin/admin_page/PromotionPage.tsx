'use client'

import { useSearchParams } from "next/navigation"
import { PromotionMainPage } from "../components/promotion/PromotionMainPage"
import { BundleMainPage } from "../components/promotion/bundle/BundleMainPage"
export const PromotionPage = () => {
    const sub = useSearchParams().get('sub')

    const renderPage = () => {
        if (sub === 'pm') {
            return (
                <><PromotionMainPage /></>
            )
        } else if (sub === 'bundle') {
            return (
                <><BundleMainPage /></>
            )
        } else {
            return <><PromotionMainPage /></>
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}