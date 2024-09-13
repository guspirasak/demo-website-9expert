'use client'

import { TBundleCard } from "@/app/admin/interface/BundleInterface"
import { Chat } from "@/app/components/Chat"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { Footer } from "@/app/components/layout/Footer"
import { Navbar } from "@/app/components/layout/Navbar"
import { ELBundleInclude } from "@/app/course/[name]/e-learning/components/ELBundle/ELBundleInclude"
import { Stack, Container } from "@chakra-ui/react"

export const BundelPage = ({ bundles }: { bundles: { bundle: TBundleCard, course: TCourseCard[] } }) => {

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                pt='5rem'
                align='center'
                bg={{ base: 'linear-gradient(180deg, #05102C, #11456C)', xl: 'linear-gradient(180deg, #0B345D, #19B5FE)' }}
            >
                <Container
                    maxW={{ base: '100%', xl: '80%', '3xl': '1920px' }}
                >
                    <ELBundleInclude title='Bundle Includes' course={bundles.course} >
                        {bundles.bundle.teaser ? bundles.bundle.teaser : `กลุ่มหลักสูตรสำหรับ Office Automation ได้รวบรวมหลักสูตร Microsoft Excel Intermediate , Microsoft Word Intermediate, และ Microsoft PowerPoint Advanced ไว้ด้วยกัน /ระยะเวลาการเรียน 365 วัน นับจากวันอนุมัติ`}
                    </ELBundleInclude>
                </Container>
            </Stack>
            <Footer />
            <Chat />
        </>
    )
}