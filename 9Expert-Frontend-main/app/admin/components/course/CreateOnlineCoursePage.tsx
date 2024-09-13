'use client'

import { ClipboardTextIcon, IDCardIcon } from "@/app/icons/AdminIcon"
import { Container, TabList, TabPanels, TabPanel, Text, Tabs, Tab, HStack, Button, useToast, Stack } from "@chakra-ui/react"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { TCreateCourse } from "../../interface/CreateCourseInterface"
import { CreateCourseCardTab } from "../tabs/CreateCourseCardTab"
import { CreateCourseInfomationTab } from "../tabs/CreateCourseInfomationTab"
import { CreateCourse, getCourseById, updateCourse } from "@/libs/AdminAPI"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loading } from "../Loading"

export const CreateOnlineCoursePage = () => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()

    const [ loading, setLoading ] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    const searchParams = useSearchParams().get('course')
    const action = useSearchParams().get('action')

    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        if (action === 'edit') {

            if (!searchParams) {
                router.push('/admin?tab=normal-course')
            }

            getCourseById(searchParams as string, (data: TCreateCourse, error: unknown) => {
                console.log(data)
                if (error) {
                    return console.log(error)
                }
                setState(data)
            })
        }
    }, [searchParams])

    const handleCreateCourse = async () => {
        setLoading(true)
        CreateCourse({ ...state, courseType: "Online", classDetails: [] }, (data: TCreateCourse, error: unknown) => {
            if (error) {
                console.log(error)
                setLoading(false)
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
            router.push('/admin?tab=elearning-course&action=result')
        })
    }
    
    const handleUpdateCourse = async () => {
        setLoading(true)
        await updateCourse(state._id as string, { ...state, courseType: "Online", classDetails: [] }, (data: TCreateCourse, error: unknown) => {
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
            router.push('/admin?tab=elearning-course&action=result&course=' + state._id)
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
            position='relative'
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
                            _selected={{
                                borderColor: 'exBlue'
                            }}
                        >
                            <IDCardIcon w='40px' h='40px' />
                            <Text ml='1rem' fontSize='lg'>{`ข้อมูลแสดงบนการ์ด`}</Text>
                        </Tab>
                        <Tab
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