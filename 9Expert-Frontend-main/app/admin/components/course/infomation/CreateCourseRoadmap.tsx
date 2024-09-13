'use client'

import { useCreateCourse } from "@/app/admin/context/CreateCourseContext"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"
import { SortIcon } from "@/app/icons/AdminIcon"
import { getCourseByCourseGroup } from "@/libs/AdminAPI"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { AddIcon } from "@chakra-ui/icons"
import { AccordionButton, AccordionItem, AccordionPanel, Center, Checkbox, Divider, IconButton, Stack, Text, Image, Accordion, Button, Container, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useSelector } from "react-redux"

export const SelectCourseRoadmapAccordionPanelItem = ({ course, type }: { course: TCourseDrawer, type: string }) => {

    const { state, setState } = useCreateCourse()

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
                            if (type === 'prev') {
                                setState(prev => ({
                                    ...prev,
                                    courseRoadmapPrevious: course._id as string
                                }))
                            }

                            if (type === 'next') {
                                setState(prev => ({
                                    ...prev,
                                    courseRoadmapNext: course._id as string
                                }))
                            }
                        }}
                        isChecked={type === 'prev' ? state.courseRoadmapPrevious === course._id : state.courseRoadmapNext === course._id}
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

export const SelectCourseRoadmapAccordion = ({ courseGroup, index, type }: { courseGroup: TCourseGroup, index: number, type: string }) => {

    const [course, setCourse] = useState<TCourseDrawer[]>([])

    const handleClick = async () => {
        await getCourseByCourseGroup(courseGroup._id as string, 'Offline', (data: TCourseDrawer[], error: unknown) => {
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
                        <SelectCourseRoadmapAccordionPanelItem key={i} course={c} type={type} />
                    ))
                }
            </AccordionPanel>
        </AccordionItem>
    )
}


const PrevRoadMap = () => {

    const CourseGroup = useSelector(getCourseGroup)
    const { state, setState } = useCreateCourse()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const icon = CourseGroup.length > 0 && CourseGroup.map((c: TCourseGroup) => {
        const id = c.course
        if (id?.includes(state.courseRoadmapPrevious)) {
            return c.courseGroupIcon
        }
    })

    return (
        <>
            {
                state.courseRoadmapPrevious ?
                    <Center
                        w='60px'
                        h='60px'
                        borderRadius='full'
                        bg={state.courseColor[0] || '#E8F1FB'}
                        cursor='pointer'
                        onClick={onOpen}
                    >
                        <Image
                            w='100%'
                            h='100%'
                            borderRadius='full'
                            src={icon.filter((i: string) => i !== undefined)[0] || ''}
                        />
                    </Center>
                    :
                    <IconButton
                        aria-label="prev-roadmap"
                        w='60px'
                        h='60px'
                        icon={<AddIcon w='24px' h='24px' color='#3D475C' />}
                        bg='transparent'
                        border='1px'
                        borderColor='#3D475C'
                        borderRadius='full'
                        onClick={onOpen}
                    />
            }
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
                                {`หลักสูตรก่อนหน้า`}
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
                                            <SelectCourseRoadmapAccordion key={index} courseGroup={courseGroup} index={index} type='prev' />
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
                                        setState(prev => ({ ...prev, courseRoadmapPrevious: '' }))
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
        </>
    )
}

const NextRoadMap = () => {

    const CourseGroup = useSelector(getCourseGroup)
    const { state, setState } = useCreateCourse()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const icon = CourseGroup.length > 0 && CourseGroup.map((c: TCourseGroup) => {
        const id = c.course
        if (id?.includes(state.courseRoadmapNext)) {
            return c.courseGroupIcon
        }
    })

    return (
        <>
            {
                state.courseRoadmapNext ?
                    <Center
                        w='60px'
                        h='60px'
                        borderRadius='full'
                        bg={state.courseColor[0] || '#E8F1FB'}
                        cursor='pointer'
                        onClick={onOpen}
                    >
                        <Image
                            w='100%'
                            h='100%'
                            borderRadius='full'
                            src={icon.filter((i: string) => i !== undefined)[0] || ''}
                        />
                    </Center>
                    :
                    <IconButton
                        aria-label="prev-roadmap"
                        w='60px'
                        h='60px'
                        icon={<AddIcon w='24px' h='24px' color='#3D475C' />}
                        bg='transparent'
                        border='1px'
                        borderColor='#3D475C'
                        borderRadius='full'
                        onClick={onOpen}
                    />
            }
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
                                {`หลักสูตรก่อนหน้า`}
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
                                            <SelectCourseRoadmapAccordion key={index} courseGroup={courseGroup} index={index} type='next' />
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
                                        setState(prev => ({ ...prev, courseRoadmapNext: '' }))
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
        </>
    )
}

export const CreateCourseRoadmap = () => {

    const { state } = useCreateCourse()

    const courseGroup = useSelector(getCourseGroup)

    const icon = courseGroup.length > 0 && courseGroup.filter((c: TCourseGroup) => c.courseGroupName === state.courseGroupName).length > 0 ? courseGroup.filter((c: TCourseGroup) => c.courseGroupName === state.courseGroupName)[0].courseGroupIcon : ''

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='8px'  
        >
            <Text fontSize='lg'>{`Roadmap`}</Text>
            <Stack
                w='100%'
                h='100%'
                align='center'
                direction='row'
                spacing='0'
            >
                <PrevRoadMap />
                <Divider w='200px' h='10px' bg={state.courseColor[0]} />
                <Center
                    w='60px'
                    h='60px'
                    borderRadius='full'
                    border='2px'
                    borderColor={state.courseColor[1] || '#E8F1FB'}
                    bg={state.courseColor[0] || '#E8F1FB'}
                >
                    <Image 
                        w='100%'
                        h='100%'
                        borderRadius='full'
                        src={ icon || ''}
                    />
                </Center>
                <Divider w='200px' h='10px' bg={state.courseColor[0]} />
                <NextRoadMap />
            </Stack>
        </Stack>
    )
}