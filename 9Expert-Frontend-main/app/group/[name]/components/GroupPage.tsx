'use client'

import { Container, Stack, useColorModeValue } from "@chakra-ui/react"
import { GroupBanner } from "./GroupBanner"
import { GroupClassroom } from "./GroupClassroom"
import { GroupOnline } from "./GroupOnline"
import { Navbar } from "@/app/components/layout/Navbar"
import { TGroupContextState, useGroup } from "../context/GroupContext"
import { useEffect, useState } from "react"
import { Footer } from "@/app/components/layout/Footer"
import { GroupArticle } from "./GroupArticle"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { getAllArticlesByCourseGroupId } from "@/libs/AdminAPI"

export const GroupPage = ({ course }: { course: TGroupContextState }) => {

    const { state, setState } = useGroup()

    const [article, setArticle] = useState<TArticle[]>([])
 
    useEffect(() => {
        setState(course)
    }, [course])

    useEffect(() => {
        getAllArticlesByCourseGroupId(course.courseGroup?._id as string, (data: TArticle[], error: unknown) => {
            if (error) console.log(error)
            if (data) setArticle(data)
        })
    }, [])

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h='100%'
                align='center'
                justify='center'
                bg={state.courseGroup?.courseGroupColor.length === 1 ? state.courseGroup?.courseGroupColor[0] : `linear-gradient(180deg, ${state.courseGroup?.courseGroupColor[0]}, ${state.courseGroup?.courseGroupColor[1]})`}
                position='relative'
            >
                <GroupBanner />
            </Stack>
            <Container
                maxW={{ base: '90%', lg: '80%' }}
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='center'
                    position='relative'
                >
                    <GroupClassroom />
                </Stack>
            </Container>
            {
                course.course.filter((c) => c.courseType === 'Online').length > 0 &&
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='center'
                    position='relative'
                    bg={useColorModeValue(state.courseGroup.courseGroupColor[0], state.courseGroup.courseGroupColor.length > 1 ? state.courseGroup.courseGroupColor[1] : state.courseGroup.courseGroupColor[0])}
                    pt='128px'
                >
                    <Container
                        maxW={{ base: '90%', lg: '80%' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='center'
                            justify='center'
                            position='relative'
                        >
                            <GroupOnline />
                        </Stack>
                    </Container>
                </Stack>
            }
            {
                article.length > 0 &&
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='center'
                    position='relative'
                    pt='113px'
                >
                    <Container
                        maxW={{ base: '100%', lg: '80%' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='center'
                            justify='center'
                            position='relative'
                        >
                            <GroupArticle article={article} />
                        </Stack>
                    </Container>
                </Stack>
            }
            <Footer />
        </>
    )
}