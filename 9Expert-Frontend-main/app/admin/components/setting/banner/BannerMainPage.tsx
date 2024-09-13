'use client'

import { useSearchParams } from "next/navigation"
import { CreateBannerPage } from "./CreateBannerPage"
import { BannerTablePage } from "./BannerTablePage"
import { CreateBannerProvider } from "@/app/admin/context/CreateBannerContext"

export const BannerMainPage = () => {

    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <CreateBannerProvider>
                    <CreateBannerPage />
                </CreateBannerProvider>
            )
        } else if (action === 'edit') {
            return (
                <CreateBannerProvider>
                    <CreateBannerPage />
                </CreateBannerProvider>
            )
        } else {
            return <><BannerTablePage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}