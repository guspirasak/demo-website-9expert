'use client'

import { ClipboardTextIcon, IDCardIcon } from "@/app/icons/AdminIcon"
import { Container, TabList, TabPanels, TabPanel, Text, Tabs, Tab, HStack, Button, Stack, useToast } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { CreateCourse, adminGetCourseById, updateCourse } from "@/libs/AdminAPI"
import { useEffect, useState } from "react"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { CreateCourseInfomationTab } from "../tabs/CreateCourseInfomationTab"
import { TCreateCourse, TCreateOfflineCourseValidateData } from "../../interface/CreateCourseInterface"
import { CreateCourseCardTab } from "../tabs/CreateCourseCardTab"
import { Validation } from "@/libs/Validation"
import { ICreateCourseValidateContext, useValidateCreateCourse } from "../../context/ValidateCreateCourse"
import { Loading } from "../Loading"

export const CreateOfflineCoursePage = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()
    const { setValidate }: ICreateCourseValidateContext = useValidateCreateCourse()

    const [loading, setLoading] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    const searchParams = useSearchParams().get('course')
    const action = useSearchParams().get('action')
    const tab = useSearchParams().get('tab')
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {

        if (tab === 'normal-course') {
            setState(prev => ({
                ...prev,
                courseType: 'Offline'
            }))
        }

        if (tab === 'elearning-course') {
            setState(prev => ({
                ...prev,
                courseType: 'Online'
            }))
        }

        if (action === 'edit') {

            if (!searchParams) {
                router.push('/admin?tab=normal-course')
            }

            adminGetCourseById(searchParams as string, (data: TCreateCourse, error: unknown) => {
                if (error) {
                    return console.log(error)
                }
                console.log(data)
                setState(data)
            })
        }
    }, [searchParams])

    

    const handleCreateCourse = async () => {

        const dataForValidate = {
            courseId: state.courseId,
            courseName: state.courseName,
            courseType: "Offline",
            courseColor: state.courseColor,
            courseStatus: state.courseStatus,
            courseImage: state.courseImage,
            // courseInstructorProfile: '',
            courseTarget: state.courseTarget,
            technologyArea: state.technologyArea,
            technologyNameAbbr: state.technologyNameAbbr,
            courseGroupName: state.courseGroupName,
            courseGroupNameAbbr: state.courseGroupNameAbbr,
            price: state.price,
            hours: state.hours,
            days: state.days,
            difficultLevel: state.difficultLevel,
            skills: state.skills,
        }

        Validation(dataForValidate, async (res: Record<string, boolean | Record<string, boolean>>, empty: boolean) => {
            if (empty) {
                console.log(res)
                setValidate(res as TCreateOfflineCourseValidateData)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'กรุณากรอกข้อมูลให้ครบ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setLoading(true)
            await CreateCourse({ ...state, courseType: "Offline" }, (data: TCreateCourse, error: unknown) => {
                if (error) {
                    return toast({
                        title: 'เกิดข้อผิดพลาด',
                        description: 'ไม่สามารถสร้างหลักสูตรได้',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                setLoading(false)
                router.push('/admin?tab=normal-course&action=result&course=' + data._id)
            })
        })
    }

    const handleUpdateCourse = async () => {
        console.log('Update course')
        setLoading(true)
        await updateCourse(state._id as string, { ...state, courseType: "Offline" }, (data: TCreateCourse, error: unknown) => {
            if (error) {
                console.log(error)
                setLoading(false)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถแก้ไขหลักสูตรได้',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setLoading(false)
            router.push('/admin?tab=normal-course&action=result')
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            {
                loading && <Loading />
            }
            <Container
                mt='2rem'
                maxW='95%'
                bg='white'
                h='max-content'
                borderRadius='20px'
            >
                <Tabs
                    w='100%'
                    isFitted
                    isLazy
                    index={tabIndex}
                >
                    <TabList
                        color='exGray.500'
                        h='95px'
                    >
                        <Tab
                            onClick={() => setTabIndex(0)}
                            _selected={{
                                borderColor: 'exBlue'
                            }}
                        >
                            <IDCardIcon w='40px' h='40px' />
                            <Text ml='1rem' fontSize='lg'>{`ข้อมูลแสดงบนการ์ด`}</Text>
                        </Tab>
                        <Tab
                            onClick={() => setTabIndex(1)}
                            _selected={{
                                borderColor: 'exBlue'
                            }}
                        >
                            <ClipboardTextIcon w='40px' h='40px' />
                            <Text fontSize='lg'>{`รายละเอียดที่จะแสดงทั้งหมด`}</Text>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <CreateCourseCardTab />
                        </TabPanel>
                        <TabPanel>
                            <CreateCourseInfomationTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
            <HStack
                my='3rem'
                align='center'
                justify='space-between'
                w='100%'
                px='2.5rem'
            >
                <Button
                    w='120px'
                    h='50px'
                    bg='white'
                    textColor='#6E7485'
                    fontSize='18px'
                    onClick={() => {
                        tabIndex === 0 ? router.push('/admin?tab=normal-course') : setTabIndex(0)
                    }}
                >
                    {`ย้อนกลับ`}
                </Button>
                <Button
                    w='170px'
                    h='50px'
                    fontSize='18px'
                    bg='exBlue'
                    color='white'
                    onClick={() => {
                        if (tabIndex === 0) {
                            setTabIndex(1)
                        } else {
                            searchParams ? handleUpdateCourse() : handleCreateCourse()
                        }
                    }}
                >{tabIndex === 0 ? `ถัดไป` : `บันทึก`}</Button>
            </HStack>
        </Stack>
    )
}