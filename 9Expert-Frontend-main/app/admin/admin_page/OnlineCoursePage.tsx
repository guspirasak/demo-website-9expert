'use client'

import { useSearchParams } from "next/navigation"
import { CreateCourseProvider } from "../context/CreateCourseContext"
import { CreateOnlineCoursePage } from "../components/course/CreateOnlineCoursePage"
import { OnlineCourseTablePage } from "../components/course/OnlineCourseTablePage"
import { CreateCourseComplete } from "../components/course/CreateCourseSuccess"
import { ValidateCreateCourseProvider } from "../context/ValidateCreateCourse"

export const OnlineCoursePage = () => {
    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <CreateCourseProvider>
                    <ValidateCreateCourseProvider>
                        <CreateOnlineCoursePage />
                    </ValidateCreateCourseProvider>
                </CreateCourseProvider>
            )
        } else if (action === 'edit') {
            return (
                <CreateCourseProvider>
                    <ValidateCreateCourseProvider>
                        <CreateOnlineCoursePage />
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
            return <><OnlineCourseTablePage /></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}