'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Stack, useColorModeValue, Text, Container, Button } from "@chakra-ui/react"
import { SearchHeader } from "./SearchHeader"
import { SearchFilterList } from "@/libs/GlobalData"
import { useEffect, useState } from "react"
import { TSearchState } from "../interfaces/SearchInterface"
import { SearchArticleContent, SearchCourseContent, SearchCourseWithFilterContent } from "./SearchContent"
import { Footer } from "@/app/components/layout/Footer"
import { searchCourseAndArticle, searchCourseAndArticleWithPage } from "@/libs/AdminAPI"
import { containerBreakpoints } from "@/config/theme"

export const SearchPage = () => {

    const [prevSearch, setPrevSearch] = useState('')
    const [prevPageCourse, setPrevPageCourse] = useState(1)
    const [prevPageArticle, setPrevPageArticle] = useState(1)

    const [state, setState] = useState<TSearchState>({
        courses:{
            items: [],
            count: 0
        },
        articles: {
            items: [],
            count: 0
        },
        type: 'All'
    })

    useEffect(() => {
        searchCourseAndArticle('', prevPageCourse, prevPageArticle, (data: TSearchState, error: unknown) => {

            if (error) {
                console.log(error)
            }

            setState(prev => ({
                ...prev,
                courses: data.courses,
                articles: data.articles,
            }))
        })
    }, [])

    const onChangePageArticle = async (pageNumber: string) => {
        onSearch(prevSearch, 0, Number(pageNumber));
    }

    const onChangePageCourse = async (pageNumber: string) => {
        onSearch(prevSearch, Number(pageNumber), 0);
    }

    const onSearch = async (search: string, pageCourse: number= 0, pageArticle: number= 0) => {
        const pageCourseNumber = pageCourse || prevPageCourse;
        const pageArticleNumber = pageArticle || prevPageArticle;

        if (pageCourse) setPrevPageCourse(pageCourseNumber);
        if (pageArticle) setPrevPageArticle(pageArticleNumber);

        setPrevSearch(search);

        searchCourseAndArticle(search, pageCourseNumber, pageArticleNumber, (data: TSearchState, error: unknown) => {
            if (error) {
                console.log(error)
            }

            setState(prev => ({
                ...prev,
                courses: data.courses,
                articles: data.articles,
            }))
        })
    }

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h={{ base: '180px', lg: '380px' }}
                align='center'
                position='relative'
            >
                <SearchHeader onSearch={onSearch} />
            </Stack>
            <Container p={0} maxW={containerBreakpoints}
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    position='relative'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        w='100%'
                        align='center'
                        justify='space-between'
                    >
                        <Stack
                            w={{ base: '100%', lg: '50%' }}
                            pt={{ base: '1rem', lg: '2rem' }}
                            h='100%'
                            align={{ base: 'center', lg: 'start' }}
                            justify='center'
                            spacing={{ base: '2rem', lg: '2rem' }}
                        >
                            <Text as='b' fontSize={{ base: '1rem', lg: '2rem' }} >{`ประเภทการค้นหา`}</Text>
                            <Stack
                                direction='row'
                                m='0'
                                w={{ base: '100%', lg: 'min-content' }}
                                h='50px'
                                color='#5D8BF4'
                                borderRadius='100px'
                                spacing='0'
                                bg={useColorModeValue('#EFF3FE', '#6584CD')}
                            >
                                {
                                    SearchFilterList.map((item, index) => (
                                        <>
                                            <Button
                                                key={index}
                                                isActive={state.type === item}
                                                m='0'
                                                px='25px'
                                                borderRadius='100px'
                                                color={useColorModeValue('#5D8BF4', 'white')}
                                                borderColor={useColorModeValue('#5D8BF4', 'white')}
                                                variant='ghost'
                                                w={{ base: '100%', lg: 'min-content' }}
                                                h='50px'
                                                bg={useColorModeValue('#EFF3FE', '#6584CD')}
                                                onClick={() => setState({ ...state, type: item })}
                                                _hover={{
                                                    bg: useColorModeValue('#EFF3FE', '#6584CD')
                                                }}
                                                _active={{
                                                    bg: useColorModeValue('#5D8BF4', '#759CF6') || useColorModeValue('#5D8BF4', 'white'),
                                                    color: useColorModeValue('white', 'white')
                                                }}
                                            >
                                                {item === 'Course' ? 'หลักสูตร' : item === 'Article' ? 'บทความ' : item}
                                            </Button>
                                        </>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                {
                    state.type === 'All' &&
                    <>
                        <Stack
                            w='100%'
                            h='100%'
                            minH='750px'
                            align='center'
                            position='relative'
                            mt='2rem'
                        >
                            <SearchCourseContent courses={state.courses.items} count={state.courses.count} onPageChange={onChangePageCourse} currentPage={prevPageCourse} />
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            minH='916px'
                            align='center'
                            position='relative'
                        >
                            <SearchArticleContent articles={state.articles.items} count={state.articles.count} onPageChange={onChangePageArticle} currentPage={prevPageArticle} itemsPerPage={10} />
                        </Stack>
                    </>
                }
                {
                    state.type === 'Course' &&
                    <Stack
                        w='100%'
                        h='100%'
                        minH='916px'
                        align='center'
                        position='relative'
                        mt='2rem'
                    >
                        <SearchCourseWithFilterContent courses={state.courses.items} count={state.courses.count}  onPageChange={onChangePageCourse} currentPage={prevPageCourse} itemsPerPage={10} />
                    </Stack>
                }
                {
                    state.type === 'Article' &&
                    <Stack
                        w='100%'
                        h='100%'
                        minH='916px'
                        align='center'
                        position='relative'
                        mt='2rem'
                    >
                        <SearchArticleContent articles={state.articles.items} count={state.articles.count} onPageChange={onChangePageArticle} currentPage={prevPageArticle} itemsPerPage={10} />
                    </Stack>
                }
            </Container >
            <Footer />
        </>
    )
}