'use client'

import { Box, Container, Heading, VStack, Button, Center, Stack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { OfflineCourseSchedule } from "../schedule/CourseSchedule"
import { CreateCourseImage } from "../course/CreateCourseImage"
import { CreateCourseMainDetail } from "../course/CreateCourseMainDetail"
import { CreateCourseSubDetail } from "../course/CreateCourseSubDetail"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { TClassDetails } from "../../interface/CreateCourseInterface"
import { useSearchParams } from "next/navigation"
export const CreateCourseCardTab = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()


    const searchParams = useSearchParams().get('tab')

    const addSchedule = () => {

        const emptySchedule: TClassDetails = {
            courseId: state.courseId,
            classType: 'Classroom',
            classStartDate: '',
            classEndDate: '',
            classStartTime: '09:00',
            classEndTime: '16:00',
            classLocation: [],
            classTeamsURL: '',
            classStatus: '',
            classNote: '',
            classRoom: [],
            classCapacity: 0
        }

        return setState(prev => ({
            ...prev,
            classDetails: prev.classDetails?.length === 0 ? [emptySchedule] : [...prev.classDetails as TClassDetails[], emptySchedule]
        }))
    }

    return (
        <Stack>
            <Box
                display='flex'
                w='100%'
                h='130px'
                px='5%'
                alignItems='center'
                justifyContent='start'
                borderBottom='1px'
                borderColor='rgba(233, 234, 240, 1)'
            >
                <Heading fontWeight='extrabold' >{`ข้อมูลแสดงบนการ์ด`}</Heading>
            </Box>
            <Container
                maxW={{ base: '100%', md: '90%' }}
            >
                <Stack
                    align='start'
                    my='1.5rem'
                    spacing='1.5rem'
                >
                    <CreateCourseImage />
                    <CreateCourseMainDetail />
                    <CreateCourseSubDetail />
                    {
                        searchParams === 'normal-course' &&
                        <>
                            <Box
                                w='100%'
                                mt='1.5rem'
                            >
                                <Heading size='lg' >{`รอบอบรมและสถานะการอบรม`}</Heading>
                                <VStack
                                    w='100%'
                                    spacing='1.5rem'
                                >
                                    {
                                        state.classDetails?.map((schedule, index) =>
                                            <OfflineCourseSchedule key={index} index={index} detail={schedule} />
                                        )
                                    }
                                </VStack>
                            </Box>
                            <Center
                                w='100%'
                            >
                                <Button
                                    h='10rem'
                                    bg='transparent'
                                    variant='ghost'
                                    color='exBlue'
                                    leftIcon={<AddIcon w='30px' h='30px' />}
                                    onClick={addSchedule}
                                    _hover={{
                                        bg: 'transparent',
                                    }}
                                    _active={{
                                        bg: 'transparent',
                                    }}
                                >
                                    {`เพิ่มรอบการอบรม`}
                                </Button>
                            </Center>
                        </>
                    }
                </Stack>
            </Container>
        </Stack>
    )
}