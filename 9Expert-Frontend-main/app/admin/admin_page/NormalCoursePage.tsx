'use client'

import { useSearchParams } from "next/navigation"
import { CreateOfflineCoursePage } from "../components/course/CreateOfflineCoursePage"
import { CreateCourseProvider } from "../context/CreateCourseContext"
import { OfflineCoursePage } from "../components/course/OfflineCoursePage"
import { CreateCourseComplete } from "../components/course/CreateCourseSuccess"
import { ValidateCreateCourseProvider } from "../context/ValidateCreateCourse"

export const NormalCoursePage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <CreateCourseProvider>
                    <ValidateCreateCourseProvider>
                        <CreateOfflineCoursePage />
                    </ValidateCreateCourseProvider>
                </CreateCourseProvider>
            )
        } else if (action === 'edit') {
            return (
                <CreateCourseProvider>
                    <ValidateCreateCourseProvider>
                        <CreateOfflineCoursePage />
                    </ValidateCreateCourseProvider>
                </CreateCourseProvider>
            )
        } else if (action === 'result') {
            return (
                <>
                    <CreateCourseComplete />
                </>
            )
        } else {
            return <><OfflineCoursePage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}