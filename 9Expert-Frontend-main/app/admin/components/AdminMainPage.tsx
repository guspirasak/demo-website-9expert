'use client'

import { useRouter } from "next/navigation"
import { AdminDashboard } from "../admin_page/DashboardPage"
import { NormalCoursePage } from "../admin_page/NormalCoursePage"
import { CreateCourseProvider } from "../context/CreateCourseContext"
import { AdminArticlePage } from "../admin_page/ArticlePage"
import { Stack } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { getAllCourseGroup, getAllTechnologyArea } from "@/libs/AdminAPI"
import { setCourseGroup } from "@/redux/courseGroupSlide"
import { setTechnologyAreas } from "@/redux/technologyAreasSlide"
import { useEffect } from "react"
import { TCourseGroup, TTechnologyArea } from "../interface/CreateCourseInterface"
import { CertificatePage } from "../admin_page/CertificatePage"
import { SettingPage } from "../admin_page/SettingPage"
import { OnlineCoursePage } from "../admin_page/OnlineCoursePage"
import { PromotionPage } from "../admin_page/PromotionPage"
// import { AddCourseGroup } from "./setting/SettingPage"

export const AdminMainPage = ({ query }: { query: string }) => {

    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(() => {
        getAllCourseGroup((data: TCourseGroup[], error: unknown) => {
            if (error) console.log(error)

            //sort data by courseGroupName
            data.sort((a, b) => {
                if (a.courseGroupName === 'Other') return 1
                if (b.courseGroupName === 'Other') return -1

                return a.courseGroupName.localeCompare(b.courseGroupName)
            })
            dispatch(setCourseGroup(data) as any)
        })

        getAllTechnologyArea((data: TTechnologyArea[], error: unknown) => {
            if (error) console.log(error)

            //sort data by technologyName
            data.sort((a, b) => {
                if (a.technologyName === 'Other') return 1
                if (b.technologyName === 'Other') return -1

                return a.technologyName.localeCompare(b.technologyName)
            })

            dispatch(setTechnologyAreas(data) as any)
        })
    }, [])

    const renderPage = () => {
        if (query === 'dashboard') {
            return <AdminDashboard />
        } else if (query === 'setting') {
            return <SettingPage />
        } else if (query === 'promotion') {
            return <PromotionPage />
        } else if (query === 'normal-course') {
            return (
                <CreateCourseProvider>
                    <NormalCoursePage />
                </CreateCourseProvider>
            )
        } else if (query === 'elearning-course') {
            return (
                <CreateCourseProvider>
                    <OnlineCoursePage />
                </CreateCourseProvider>
            )
        } else if (query === 'article') {
            return (
                <>
                    <AdminArticlePage />
                </>
            )
        } else if (query === 'certificate') {
            return (
                <>
                    <CertificatePage />
                </>
            )
        } else {
            router.push('/admin/login')
        }
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            {renderPage()}
        </Stack>
    )
}