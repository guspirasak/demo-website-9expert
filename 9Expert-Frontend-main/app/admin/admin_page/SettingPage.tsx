'use client'

import { useSearchParams } from "next/navigation"
import { BannerMainPage } from "../components/setting/banner/BannerMainPage"
import { PortfolioMainpage } from "../components/setting/portfolio/PortfolioMainPage"
import { ReviewMainPage } from "../components/setting/review/ReviewMainPage"
import { AreaMainPage } from "../components/setting/technologyArea/AreaMainPage"
import { RecruitmentMainPage } from "../components/setting/recruitment/RecruitmentMainPage"
import { FaqPage } from "../components/setting/faq/FaqPage"

export const SettingPage = () => {
    const sub = useSearchParams().get('sub')

    const renderPage = () => {
        if (sub === 'banner') {
            return (
                <><BannerMainPage /></>
            )
        } else if (sub === 'group') {
            return (
                <><AreaMainPage /></>
            )
        } else if (sub === 'review') {
            return (
                <><ReviewMainPage /></>
            )
        } else if (sub === 'portfolio') {
            return (
                <><PortfolioMainpage /></>
            )
        } else if (sub === 'faq') {
            return (
                <><FaqPage /></>
            )
        } else if (sub === 'recruitment') {
            return (
                <><RecruitmentMainPage /></>
            )
        } else {
            return <></>
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}