'use client'

import { Stack } from "@chakra-ui/react"
import { HomepageCourseGroup } from "./Homepage/HomepageCourseGroup"
import { HomepageService } from "./Homepage/HomepageService"
import { Navbar } from "./layout/Navbar"
import { HomepageSpeech } from "./Homepage/HomepageSpeech"
import { HomepageArticle } from "./Homepage/HomepageArticle"
import { HomepageComment } from "./Homepage/HomepageComment"
import { HomepageTechnology } from "./Homepage/HomepageTechnology"
import { HomepageVideoArticle } from "./Homepage/HomepageVideoArticle"
import { Footer } from "./layout/Footer"
import { Chat } from "./Chat"
import { HomepageRegister } from "./Homepage/HomepageRegister"
import { HomepageBanner } from "./Homepage/HomepageBanner"
import { HomepageArticleWraper } from "./Homepage/wraper/ArticleWraper"

export const Homepage = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                overflow='hidden'
            >
                <HomepageBanner />
                <HomepageService />
                <HomepageCourseGroup />
                {children}
                <HomepageTechnology />
                <HomepageRegister />
                <HomepageComment />
                <HomepageArticleWraper />
                <HomepageSpeech />
            </Stack>
            <Chat />
            <Footer />
        </>
    )
}

