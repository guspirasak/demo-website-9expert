'use client'

import { Navbar } from '@/app/components/layout/Navbar'
import { Container, Heading, Stack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { ArticleBanner } from './ArticleBanner'
import { ArticleCategory } from './ArticleCategory'
import { ArticleFilterButton } from './ArticleFilterButton'
import { Footer } from '@/app/components/layout/Footer'
import { TArticle } from '@/app/admin/interface/CreateArticleInterface'
import { useArticle } from '../context/ArticleContext'
import { useEffect, useState } from 'react'
import { TCourseCard } from '@/app/components/ContentCard/Card'
import { getAllArticlesByCourseGroupId, getArticleByCourseGroup, getLatestCourse } from '@/libs/AdminAPI'
import { Chat } from '@/app/components/Chat'
import { containerBreakpoints } from '@/config/theme'
import { ArticleSection } from './ArticleSection'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { getCourseGroup } from '@/redux/courseGroupSlide'
import { TCourseGroup } from '@/app/admin/interface/CreateCourseInterface'
import { getArticleByType } from '@/libs/UserAPI'

export const ArticlePage = ({ article }: { article: TArticle[] }) => {
    const { state, setState } = useArticle()

    const [course, setCourse] = useState<TCourseCard>({} as TCourseCard)

    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const bgColor = useColorModeValue('#F4F7FB', '#24262A')

    const groupFilter = useSearchParams().get('group')
    const category = useSearchParams().get('category')
    const courseGroup = useSelector(getCourseGroup)

    useEffect(() => {
        getLatestCourse((data: TCourseCard, error: unknown) => {
            if (error) console.log(error)
            if (data) setCourse(data)
        })
    }, [])

    useEffect(() => {
        setState(article)
    }, [article])

    useEffect(() => {
        if (groupFilter) {
            const getGroupFilterId = courseGroup.find((group: TCourseGroup) => {
                return group.courseGroupNameAbbr === groupFilter?.replaceAll(/_/g, ' ')
                    ||
                    group.courseGroupName === groupFilter?.replaceAll(/_/g, ' ')
            })

            getAllArticlesByCourseGroupId(getGroupFilterId?._id as string, (data: TArticle[], error: unknown) => {
                if (error) console.log(error)
                if (data) {
                    setState(data)
                } else {
                    setState([])
                }
            })
        }
    }, [groupFilter])

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                py={{ base: '3rem', lg: '4rem' }}
                position='relative'
                bg={bgColor}
            >
                <Heading as='h1' display='none'>บทความ</Heading>
                <Container p={0} maxW={containerBreakpoints}>
                    <Stack spacing={{ base: '1rem', lg: '3rem' }}>
                        <ArticleBanner />
                        <ArticleCategory />
                        <Stack
                            w='100%'
                            h='100%'
                            px={{ base: '2rem', lg: '4rem' }}
                            spacing={{ base: '2rem', lg: '3rem' }}
                        >
                            <ArticleFilterButton />
                            <ArticleSection course={course} />
                            <Chat />
                        </Stack>
                    </Stack>
                </Container >
            </Stack >
            <Footer />
        </>
    )
}