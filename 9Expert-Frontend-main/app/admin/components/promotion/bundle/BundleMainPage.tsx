'use client'

import { useSearchParams } from "next/navigation"
import { BundleTablePage } from "./BundleTablePage"
import { CreateBundlePage } from "./CreateBundlePage"
import { CreateBundleSuccess } from "./CreateBundleSuccess"
export const BundleMainPage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <><CreateBundlePage /></>
            )
        } else if (action === 'edit') {
            return (
                <><CreateBundlePage /></>
            )
        } else if (action === 'result') {
            return (
                <><CreateBundleSuccess /></>
            )
        } else {
            return <><BundleTablePage /></>
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}