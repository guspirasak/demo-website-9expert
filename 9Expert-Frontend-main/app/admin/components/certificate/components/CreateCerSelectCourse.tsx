'use client'

import { useCreateCertificate } from "@/app/admin/context/CreateCertificateContext"
import { TClassDetailWithCourseName } from "@/app/admin/interface/CreateCertificate"
import { getAllClassDetailAndCourseName } from "@/libs/AdminAPI"
import { courseInstructor } from "@/libs/GlobalData"
import { Container, HStack, Heading, Select, Stack } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"

export const CreateCerSelectCourse = () => {

    const { state, setState } = useCreateCertificate()

    const [course, setCourse] = useState<TClassDetailWithCourseName[]>([])

    useEffect(() => {
        getAllClassDetailAndCourseName((data: TClassDetailWithCourseName[], error: unknown) => {
            if (error) console.log(error)
            if (data) setCourse(data)
        })
    }, [])

    return (
        <>
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                bg='white'
                h='fit-content'
                borderRadius='20px'
            >
                <HStack
                    borderBottom='1px'
                    borderColor='exGray.100'
                    w='100%'
                    h='130px'
                    align='center'
                    justify='space-between'
                    px={{ base: '1.5rem', lg: '3rem' }}
                    m='0'
                >
                    <Heading>{`Select Class`}</Heading>
                </HStack>
                <Stack
                    w='100%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='31px'
                    py='40px'
                    spacing='2rem'
                >
                    <Select
                        w='100%'
                        h='80px'
                        placeholder="เลือกหลักสูตร"
                        onChange={(e) => {
                            setState({ 
                                ...state, 
                                classDetailId: e.target.value, 
                                courseName: course.find(item => item._id === e.target.value)?.course.courseName as string, 
                                courseId: course.find(item => item._id === e.target.value)?.course.courseId as string,
                                classStartDate: course.find(item => item._id === e.target.value)?.classStartDate as string,
                            })
                        }}
                        value={state.classDetailId}
                    >
                        {
                            course.map((item, index) => (
                                <option
                                    key={index}
                                    value={item._id}
                                >
                                    {`${item.course.courseName} - ( ${moment(new Date(item.classStartDate)).format('DD MMM')} - ${moment(new Date(item.classEndDate)).format('DD MMM')} )`}
                                </option>
                            ))
                        }
                    </Select>
                    {
                        state.classDetailId && (
                            <Select
                                w='100%'
                                h='80px'
                                placeholder="เลือกอาจารย์ผู้สอน"
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        courseInstructor: e.target.value
                                    })
                                }}
                                value={state.courseInstructor}
                            >
                                {
                                    courseInstructor.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.en}
                                        >
                                            {item.en}
                                        </option>
                                    ))
                                }
                            </Select>
                        )
                    }
                </Stack>
            </Container>
        </>
    )
}