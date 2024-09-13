'use client'

import { useSearchParams } from "next/navigation"
import { CreateRecruitmentPage } from "./CreateRecruitmentPage"
import { RecruitmentTablePage } from "./RecruitmentTablePage"

export const RecruitmentMainPage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {

        if (action === 'create') {
            return (
                <><CreateRecruitmentPage /></>
            )
        } else if (action === 'edit') {
            return (
                <><CreateRecruitmentPage /></>
            )
        } else {
            return <><RecruitmentTablePage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}