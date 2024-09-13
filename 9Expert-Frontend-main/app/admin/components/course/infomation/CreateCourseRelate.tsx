'use client'

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { SortIcon } from "@/app/icons/AdminIcon"
import { AddIcon } from "@chakra-ui/icons"
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, Center, Checkbox, Container, HStack, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, Tag, TagCloseButton, TagLabel, Text, useDisclosure, useToast, Wrap } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { useCreateCourse } from "@/app/admin/context/CreateCourseContext"
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"
import { getAllCourseNameByMultiId, getCourseByCourseGroup } from "@/libs/AdminAPI"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export const SelectCourseRelateAccordionPanelItem = ({ course }: { course: TCourseDrawer }) => {

    const { state, setState } = useCreateCourse()

    const toast = useToast()

    return (
        <Stack
            w='100%'
            h='80px'
            align='center'
            justify='start'
            direction='row'
            bg='white'
        >
            <Stack
                w='100%'
                h='100%'
                align='start'
                justify='start'
                direction='row'
                spacing='1rem'
            >
                <Stack
                    w='20%'
                    h='100%'
                    align='center'
                    justify='center'
                    direction='row'
                    spacing='15px'
                >
                    <Center
                        h='50px'
                        border='1px'
                        borderColor='#1CA7EC'
                        borderStyle='dashed'
                        position='relative'
                    >
                        <Center
                            bg='#1CA7EC'
                            w='7px'
                            h='7px'
                            position='absolute'
                            borderRadius='full'
                            bottom='-3px'
                        >

                        </Center>
                    </Center>
                    <Checkbox
                        w='30px'
                        h='30px'
                        textColor='#3D475C'
                        onChange={() => {
                            if (state.relatedCourse!.includes(course._id as string)) {
                                return setState(prev => ({
                                    ...prev,
                                    relatedCourse: state.relatedCourse!.filter(id => id !== course._id as string)
                                }))
                            }
                            if (state.relatedCourse!.length >= 5) {
                                return toast({
                                    title: 'คุณสามารถเลือกได้ไม่เกิน 5 หลักสูตร',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'top-right'
                                })
                            }
                            setState(prev => ({
                                ...prev,
                                relatedCourse: state.relatedCourse!.includes(course._id as string) ? state.relatedCourse!.filter(id => id !== course._id as string) : [...prev.relatedCourse!, course._id as string]
                            }))
                        }}
                        isChecked={state.relatedCourse!.includes(course._id as string)}
                    />
                </Stack>
                <Stack
                    w='80%'
                    h='100%'
                    align='center'
                    justify='start'
                    direction='row'
                    spacing='15px'
                >
                    <Text
                        fontSize='24px'
                        fontWeight='600'
                        textColor='#3D475C'
                    >
                        {course.courseName}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export const SelectCourseRelateAccordion = ({ courseGroup, index }: { courseGroup: TCourseGroup, index: number }) => {

    const [course, setCourse] = useState<TCourseDrawer[]>([])

    const tab = useSearchParams().get('tab')

    const handleClick = async () => {
        await getCourseByCourseGroup(courseGroup._id as string, tab === 'normal-course' ? 'Offline' : 'Online', (data: TCourseDrawer[], error: unknown) => {
            console.log(data)
            if (error) console.log(error)
            if (data) setCourse(data.sort((a, b) => a.courseName.localeCompare(b.courseName)))
        })
    }

    return (
        <AccordionItem
            w='100%'
        >
            <AccordionButton
                w='100%'
                h='80px'
                p='0'
                onClick={handleClick}
            >
                <Stack
                    w='100%'
                    h='80px'
                    align='center'
                    justify='start'
                    direction='row'
                    bg='#19B5FE1A'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='start'
                        direction='row'
                        spacing='1rem'
                    >
                        <Stack
                            w='20%'
                            h='100%'
                            align='center'
                            justify='center'
                            direction='row'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#3D475C'
                            >
                                {`${(index + 1).toString().length === 1 ? `0${index + 1}` : index + 1}`}
                            </Text>
                            <IconButton
                                aria-label="sort"
                                w='24px'
                                h='24px'
                                icon={<SortIcon w='24px' h='24px' color='#3D475C' />}
                                bg='transparent'
                            />
                        </Stack>
                        <Stack
                            w='80%'
                            h='100%'
                            align='center'
                            justify='start'
                            direction='row'
                            spacing='15px'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#3D475C'
                            >
                                {courseGroup.courseGroupName}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </AccordionButton>
            <AccordionPanel
                w='100%'
                h='100%'
                p='0'
            >
                {
                    course.length > 0 && course.map((c, i) => (
                        <SelectCourseRelateAccordionPanelItem key={i} course={c} />
                    ))
                }
            </AccordionPanel>
        </AccordionItem>
    )
}

export const CreateCourseRelate = () => {

    const [course, setCourse] = useState<TCourseDrawer[]>([])

    const CourseGroup = useSelector(getCourseGroup)

    const { onOpen, isOpen, onClose } = useDisclosure()

    const { state, setState } = useCreateCourse()

    useEffect(() => {
        getAllCourseNameByMultiId(state.relatedCourse as string[], (data: TCourseDrawer[], error: unknown) => {
            if (error) console.log(error)
            if (data) setCourse(data.sort((a, b) => a.courseName.localeCompare(b.courseName)))
        })
    }, [state.relatedCourse])

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='8px'    
        >
            <Text fontSize='lg'>{`หลักสูตรที่เกี่ยวข้อง`}</Text>
            <Stack
                w='100%'
                h='100%'
                direction='row'
                spacing='80px'
            >
                <Wrap
                    display='flex'
                    w='100%'
                    h='60px'
                    px='1rem'
                    border='1px'
                    borderColor='#C1C1C1'
                    borderRadius='10px'
                    align='center'
                    justify='start'
                >
                    {
                        course.length > 0 && state.relatedCourse!.slice(0, 2).map((a, index) => (
                            <Tag
                                key={index}
                                w={course.length === 1 ? 'fit-content' : '40%'}
                                h='fit-content'
                                bg='#D9ECFF'
                                px='20px'
                                py='10px'
                                borderRadius='full'
                                variant='solid'
                                colorScheme='green'
                            >
                                <TagLabel
                                    textColor='#4091F4'
                                    fontSize='1rem'
                                    fontWeight='600'
                                >
                                    {course.filter(v => v._id === a).length > 0 && course.filter(v => v._id === a)[0].courseName}
                                </TagLabel>
                                <TagCloseButton
                                    color='#4091F4'
                                    onClick={() => setState(prev => ({ ...prev, relatedCourse: state.relatedCourse!.filter((_, i) => i !== index) }))}
                                />
                            </Tag>
                        ))
                    }
                    {
                        state.relatedCourse && state.relatedCourse.length > 2 && (
                            <Tag
                                w='fit-content'
                                h='fit-content'
                                bg='#4091F4'
                                px='20px'
                                py='10px'
                                borderRadius='full'
                                variant='solid'
                                colorScheme='green'
                            >
                                <TagLabel
                                    textColor='white'
                                    fontSize='1rem'
                                    fontWeight='600'
                                >
                                    {`+ ${(state.relatedCourse!.length - 2)}`}
                                </TagLabel>
                            </Tag>
                        )
                    }
                </Wrap>
                <Button
                    w='250px'
                    h='60px'
                    minW='250px'
                    leftIcon={<AddIcon w='16px' h='16px' />}
                    bg='exBlue'
                    textColor='white'
                    onClick={onOpen}
                >
                    {`เพิ่มหลักสูตรที่เกี่ยวข้อง`}
                </Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size='6xl'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader
                            borderBottom='1px'
                            borderColor='#817F7F80'
                        >
                            <HStack
                                w='100%'
                                align='center'
                                justify='space-between'
                            >
                                <Text
                                    fontSize='36px'
                                    textColor='#2E2E2E'
                                >
                                    {`หลักสูตรที่เกี่ยวข้อง`}
                                </Text>
                                <Text
                                    fontSize='36px'
                                    textColor='#2E2E2E'
                                >
                                    {`( ${state.relatedCourse && state.relatedCourse!.length} /5 )`}
                                </Text>
                            </HStack>
                        </ModalHeader>
                        <ModalBody>
                            <Container
                                maxW='90%'
                            >
                                <Stack
                                    w='100%'
                                    h='600px'
                                    overflowY='auto'
                                    align='start'
                                    justify='start'
                                    borderRadius='20px'
                                    my='40px'
                                    spacing='0'
                                >
                                    <Stack
                                        w='100%'
                                        h='80px'
                                        minH='80px'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                        bg='#4091F4'
                                        borderTopRadius='20px'
                                    >
                                        <Stack
                                            w='100%'
                                            h='100%'
                                            align='start'
                                            justify='start'
                                            direction='row'
                                            spacing='1rem'
                                        >
                                            <Stack
                                                w='20%'
                                                h='100%'
                                                align='center'
                                                justify='center'
                                                direction='row'
                                            >
                                                <Text
                                                    fontSize='24px'
                                                    fontWeight='600'
                                                    textColor='white'
                                                >
                                                    {`ID`}
                                                </Text>
                                                <IconButton
                                                    aria-label="sort"
                                                    w='24px'
                                                    h='24px'
                                                    icon={<SortIcon w='24px' h='24px' color='white' />}
                                                    bg='transparent'
                                                />
                                            </Stack>
                                            <Stack
                                                w='80%'
                                                h='100%'
                                                align='center'
                                                justify='start'
                                                direction='row'
                                            >
                                                <Text
                                                    fontSize='24px'
                                                    fontWeight='600'
                                                    textColor='white'
                                                >
                                                    {`Course Group`}
                                                </Text>
                                                <IconButton
                                                    aria-label="sort"
                                                    w='24px'
                                                    h='24px'
                                                    icon={<SortIcon w='24px' h='24px' color='white' />}
                                                    bg='transparent'
                                                />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Accordion
                                        allowToggle
                                        w='100%'
                                        h='100%'
                                    >
                                        {
                                            CourseGroup.map((courseGroup: TCourseGroup, index: number) => (
                                                <SelectCourseRelateAccordion key={index} courseGroup={courseGroup} index={index} />
                                            ))
                                        }
                                    </Accordion>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='space-between'
                                    direction='row'
                                    mt='60px'
                                    mb='37px'
                                >
                                    <Button
                                        w='300px'
                                        h='70px'
                                        variant='outline'
                                        borderColor='#817F7F'
                                        textColor='#817F7F'
                                        fontSize='24px'
                                        fontWeight='600'
                                        onClick={() => {
                                            setState(prev => ({ ...prev, relatedCourse: [] }))
                                            onClose()
                                        }}
                                    >
                                        {`ยกเลิก`}
                                    </Button>
                                    <Button
                                        w='300px'
                                        h='70px'
                                        bg='#19B5FE'
                                        textColor='white'
                                        fontSize='24px'
                                        fontWeight='600'
                                        onClick={onClose}
                                    >
                                        {`เพิ่มหลักสูตรที่เกี่ยวข้อง`}
                                    </Button>
                                </Stack>
                            </Container>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Stack>
        </Stack>
    )
}