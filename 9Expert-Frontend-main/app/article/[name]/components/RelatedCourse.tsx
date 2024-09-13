'use client'

import { MiniSearchCourseCard } from "@/app/components/ContentCard/MiniSearchCourseCard"
import { AspectRatio, Heading, Stack, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { useEffect, useState } from "react"
import { getAllCourseCardByMultiId } from "@/libs/UserAPI"


const MiniCourseCard = ({ course }: { course: TCourseCard }) => {

    const textColor = useColorModeValue('#747474', 'white')

    return (
        <Stack
            w='100%'
            h='97px'
            direction='row'
            justify='space-between'
            spacing='36px'
        >
            <AspectRatio
                ratio={148 / 97}
                w='148px'
                minW='148px'
            >
                <Image
                    alt={`${course.courseName} image`}
                    w='148px'
                    src={course.courseImage}
                />
            </AspectRatio>
            <Stack
                w='100%'
                h='100%'
            >
                <Text noOfLines={2} textColor={textColor} fontSize='0.75rem' >{course.courseName}</Text>
                <Heading noOfLines={3} fontSize='14px'>{course.courseTeaserAbbr}</Heading>
            </Stack>
        </Stack>
    )
}

export const RelatedCourse = () => {

    const { state } = useSingleArticle()

    const [ course, setCourse ] = useState<TCourseCard[]>([])

    const borderColor = useColorModeValue('#F2F5FA', 'black')

    useEffect(() => {
        getAllCourseCardByMultiId(state.courseRelated as string[], (data: TCourseCard[], error: unknown) => {
            console.log(data)
            if (error) console.log(error)
            data ? setCourse(data) : setCourse([])
        })
    }, [state])

    return (
        <>
            {
                course.length > 0 && (
                    <Stack
                        w='100%'
                        h='100%'
                        p='40px'
                        align='start'
                        justify='center'
                        border='1px'
                        borderRadius='10px'
                        borderColor={borderColor}
                        shadow='md'
                    >
                        <Heading
                            fontSize='24px'
                        >
                            {`หลักสูตรที่เกี่ยวข้อง`}
                        </Heading>
                        <Stack
                            w='100%'
                            mt='39px'
                            mb='66px'
                            align='center'
                            justify='center'
                        >
                            <MiniSearchCourseCard course={course[0]} />
                        </Stack>
                        <Stack
                            w='100%'
                            align='center'
                            justify='center'
                            spacing='36px'
                        >
                            {
                                course.slice(1).map((item, index) => (
                                    <MiniCourseCard key={index} course={item} />
                                ))
                            }
                        </Stack>
                    </Stack>
                )
            }
        </>
    )
}