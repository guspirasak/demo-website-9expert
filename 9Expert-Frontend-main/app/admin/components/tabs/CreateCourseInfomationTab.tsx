'use client'

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react"
import { AdminCourseInfomationInput } from "../AdminCourseInfomationInput"
import { CreateCourseImage } from "../course/CreateCourseImage"
import { CreateCourseMainDetail } from "../course/CreateCourseMainDetail"
import { CreateCourseSubDetail } from "../course/CreateCourseSubDetail"
import { useCreateCourse } from "../../context/CreateCourseContext"
import { CourseTopic } from "../course/infomation/CourseTopic"

export const CreateCourseInfomationTab = () => {

    const { state } = useCreateCourse()

    return (
        <>
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
                <Heading fontWeight='extrabold' >{`รายละเอียดที่แสดงทั้งหมด`}</Heading>
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
                </Stack>
            </Container>
            <VStack>
                <Box
                    display='flex'
                    w='100%'
                    h='130px'
                    px='5%'
                    alignItems='center'
                    justifyContent='start'
                    borderBottom='1px'
                    borderColor='exGray.300'
                >
                    <Heading fontWeight='extrabold' >{`รายละเอียดของหลักสูตร`}</Heading>
                </Box>
                <AdminCourseInfomationInput 
                    placeholder={`หลักสูตรนี้เหมาะสำหรับ...`} 
                    data={state.courseBenefit} 
                    objKey="courseBenefit"
                >
                    {/* courseObjective */}
                    {`หลักสูตรนี้เหมาะสำหรับ (${state.courseBenefit ? state.courseBenefit.length : 0}/10)`}
                </AdminCourseInfomationInput>
                <AdminCourseInfomationInput 
                    placeholder={`วัตถุประสงค์ของหลักสูตรนี้...`} 
                    data={state.courseObjective}
                    objKey="courseObjective"
                >
                    {/* courseObjective */}
                    {`วัตถุประสงค์ (${state.courseObjective ? state.courseObjective.length : 0}/10)`}
                </AdminCourseInfomationInput>
                <AdminCourseInfomationInput 
                    placeholder={`ความต้องการของระบบของหลักสูตรนี้...`} 
                    data={state.courseRequirement} 
                    objKey="courseRequirement"
                >
                    {/* courseRequirement */}
                    {`ความต้องการของระบบ (${state.courseRequirement ? state.courseRequirement.length : 0}/10)`}
                </AdminCourseInfomationInput>
                <CourseTopic />
            </VStack>
        </>
    )
}