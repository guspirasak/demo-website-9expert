'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { AspectRatio, Box, Container, Stack, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react"
import { ELBanner } from "./ELBanner"
import { ELTag } from "./ELTag"
import { ELTab } from "./ELTab"
import { ELCourseOutline } from "./ELCourseOutline"
import { ELDescription } from "./ELDescription"
// import { ELBundleInclude } from "./ELBundle/ELBundleInclude"
import { ELRelatedCourse } from "./ELRelatedCourse"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { ISingleCourseContext } from "@/app/course/context/SingleCourseContext"
import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { useEffect, useRef, useState } from "react"
import { TLiveRef } from "../../class/interface/LiveTab"
import { Footer } from "@/app/components/layout/Footer"
import { ConvertYoutubeLinkToEmbed } from "@/libs/ConvertYoutubeLinkToEmbed"
import { getBundleByCourseId, getCoursesByCourseGroupNameAbbr } from "@/libs/AdminAPI"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { ELBundleSale } from "./ELBundle/ELBundleSale"
import { TUserBundle } from "../interface/ELTab"
import { Chat } from "@/app/components/Chat"
import { ELBundleInclude } from "./ELBundle/ELBundleInclude"
// import { ELBundleSale } from "./ELBundle/ELBundleSale"

export const ELPage = ({ course }: { course: TCourseCard }) => {

    const { state, setState }: ISingleCourseContext = useSingleCourse()

    const [tabRef, setTabRef] = useState<TLiveRef>({
        benefit: useRef<HTMLDivElement>(null),
        objective: useRef<HTMLDivElement>(null),
        requirement: useRef<HTMLDivElement>(null),
        topic: useRef<HTMLDivElement>(null),
        related: useRef<HTMLDivElement>(null),
        note: useRef<HTMLDivElement>(null),
    })

    const [showBundleDetail, setShowBundleDetail] = useState<boolean>(false)

    const [bundles, setBundle] = useState<TUserBundle>({
        _id: '',
        course: [],
        name: '',
        sellPrice: 0,
        totalPrice: 0,
        image: '',
        isActive: false,
        isDeleted: false,
        createAt: '',
    })

    useEffect(() => {
        setState({
            ...course,
        })

        // getCoursesByCourseGroupNameAbbr(course.courseGroupName, (data: { course: TCourseCard[], courseGroup: TCourseGroup }, error: unknown) => {
        //     if (error) {
        //         console.log(error)
        //     }

        //     setRelatedCourse(data.course.filter((item) => item.courseId != course.courseId))
        // }, 'Online')

        getBundleByCourseId(course._id as string, (data: { bundle: TUserBundle, course: TCourseCard[] }, error: unknown) => {
            if (error) {
                console.log(error)
            }
            console.log(data)

            const newBundle: TUserBundle = {
                ...data.bundle,
                course: data.course
            }

            setBundle(newBundle)
        })
    }, [])

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h='max-content'
                align='center'
                position='relative'
            >
                <ELBanner />
            </Stack>
            <Stack
                w='100%'
                h='min-content'
                align='start'
                justify='center'
                position='relative'
                direction={{ base: 'column', '2xl': 'row' }}
                pt='3rem'
                pb='10rem'
                bg={useColorModeValue('#0B345D', '#0E4174')}
                color='white'
            >
                <Stack
                    w={{ base: '100%', '2xl': '70%' }}
                    h='min-content'
                    align='start'
                >
                    <Container
                        maxW={{ base: '95%', xl: '80%' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            spacing='3rem'
                            justify='center'
                        >
                            <Wrap
                                w='100%'
                                display='flex'
                            >
                                <WrapItem>
                                    <ELTag color='white' bg={`${state.courseColor && state.courseColor.length > 1 ? state.courseColor[1] : `${state.courseColor[0]}30`}`}>
                                        {state.technologyArea}
                                    </ELTag>
                                </WrapItem>
                                {
                                    state.skills.map((skill, index) => (
                                        <WrapItem
                                            key={index}
                                        >
                                            <ELTag color='white' bg={`${state.courseColor && state.courseColor.length > 1 ? state.courseColor[1] : `${state.courseColor[0]}30`}`}>
                                                {skill}
                                            </ELTag>
                                        </WrapItem>
                                    ))
                                }
                                <WrapItem>
                                    <ELTag color='white' bg={`${state.courseColor && state.courseColor.length > 1 ? state.courseColor[1] : `${state.courseColor[0]}30`}`}>
                                        {`e-Learning`}
                                    </ELTag>
                                </WrapItem>
                            </Wrap>
                            {
                                state.courseVDO && (
                                    <AspectRatio
                                        ratio={16 / 9}
                                    >
                                        <Box
                                            as='iframe'
                                            position='absolute'
                                            w='80%'
                                            bg='gray'
                                            borderRadius='26px'
                                            src={ConvertYoutubeLinkToEmbed(state.courseVDO)}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        >
                                        </Box>
                                    </AspectRatio>
                                )
                            }
                            <ELDescription setTabRef={setTabRef} />
                        </Stack>
                    </Container>
                </Stack>
                <Stack
                    w={{ base: '100%', '2xl': '30%' }}
                    h='min-content'
                    pt={{ base: '2rem', xl: '0' }}
                    align='center'
                >
                    <Container
                        maxW={{ base: '95%', '2xl': '80%' }}
                        display='flex'
                        justifyContent='center'
                    >
                        <Stack
                            w={{ base: '100%', md: '50%', '2xl': '100%' }}
                            h='min-content'
                            align='center'
                            justify={{ base: 'center', '2xl': 'end' }}
                            spacing='58px'
                            mt={{ base: '34px', '2xl': '0' }}
                        >
                            {
                                state.courseObjective.length > 0 || state.courseBenefit.length > 0 || state.courseRequirement.length > 0 || state.relatedCourse.length > 0 || state.note ? (
                                    <ELTab tabRef={tabRef} />
                                ) : <></>
                            }
                            <ELCourseOutline />
                        </Stack>
                    </Container>
                </Stack>
            </Stack>
            {
                bundles._id &&
                <Stack
                    w='100%'
                    align='center'
                    bg={{ base: 'linear-gradient(180deg, #05102C, #11456C)', xl: 'linear-gradient(180deg, #0B345D, #19B5FE)' }}
                >
                    <Container
                        maxW={{ base: '100%', xl: '80%' }}
                    >
                        {
                            !showBundleDetail ?
                                <ELBundleSale bundle={bundles} setShowBundleDetail={setShowBundleDetail} />
                                :
                                <ELBundleInclude title='Bundle Includes' course={bundles.course} >
                                    {bundles.teaser ? bundles.teaser : `กลุ่มหลักสูตรสำหรับ Office Automation ได้รวบรวมหลักสูตร Microsoft Excel Intermediate , Microsoft Word Intermediate, และ Microsoft PowerPoint Advanced ไว้ด้วยกัน /ระยะเวลาการเรียน 365 วัน นับจากวันอนุมัติ`}
                                </ELBundleInclude>
                        }
                    </Container>
                </Stack>
            }
            <Stack
                w='100%'
                align='center'
                bg={
                    bundles._id ?
                        { base: 'linear-gradient(180deg, #19B5FE, #4091F4)', xl: 'linear-gradient(180deg, #19B5FE, #0B345D)' }
                        :
                        { base: 'linear-gradient(180deg, #19B5FE, #4091F4)', xl: 'linear-gradient(180deg, #0B345D, #19B5FE)' }
                }
            >
                {
                    state.relatedCourse.length > 0 && (
                        <Container
                            maxW={{ base: '95%', xl: '80%' }}
                        >
                            <ELRelatedCourse setTabRef={setTabRef} courses={course.relatedCourse} />
                        </Container>
                    )
                }
            </Stack>
            <Chat />
            <Footer />
        </>
    )
}