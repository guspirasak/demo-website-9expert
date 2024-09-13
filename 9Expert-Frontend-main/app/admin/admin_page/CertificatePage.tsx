'use client'

import { useSearchParams } from "next/navigation"
import { CertificateMainPage } from "../components/certificate/CertificateMainPage"
import { CreateCertificatePage } from "../components/certificate/CreateCertificatePage"
import { CreateCertificateProvider } from "../context/CreateCertificateContext"
import { DetailCertificatePage } from "../components/certificate/DetailCertificatePage"
import { EditCertificatePage } from "../components/certificate/EditCertificatePage"

export const CertificatePage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <CreateCertificateProvider>
                    <CreateCertificatePage />
                </CreateCertificateProvider>
            )
        } else if (action === 'edit') {
            return <><EditCertificatePage /></>
        } else if (action === 'detail') {
            return (
                <>
                    <DetailCertificatePage />
                </>
            )
            
        } else {
            return (
                <>
                    <CertificateMainPage />
                </>
            )
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}