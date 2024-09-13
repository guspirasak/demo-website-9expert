'use client'

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { getCourseByCourseGroup } from "@/libs/AdminAPI"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { Accordion, AccordionItem, AccordionButton, Button, AccordionIcon, AccordionPanel, Stack, Text, useColorModeValue, Link } from "@chakra-ui/react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { DrawerButton } from "./MobileNavbar"
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"

export const DrawerCourseSubMenu = ({ courseGroup }: { courseGroup: TCourseGroup }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [course, setCourse] = useState<TCourseDrawer[]>([])

    const handleExpanded = async () => {
        await getCourseByCourseGroup(courseGroup._id as string, '', (data: TCourseDrawer[], error: unknown) => {
            if (error) console.error(error)
            if (data) setCourse(data)
        })
        setExpanded(!expanded)
    }

    return (
        <Accordion
            as="a"
            w='100%'
            allowToggle
            onChange={handleExpanded}
        >
            <AccordionItem
                w='100%'
                border='0'
            >
                <AccordionButton
                    as={Button}
                    w='100%'
                    textAlign='start'
                    variant='ghost'
                    borderRadius='8px'
                    _hover={{
                        bg: 'exMidBlue',
                        color: 'white',
                    }}
                    _expanded={{
                        bg: 'exMidBlue',
                        color: 'white',
                    }}
                    _active={{
                        bg: 'exMidBlue',
                        color: 'white',
                    }}
                >
                    <Text
                        w='100%'
                        textAlign='start'
                        fontSize='1rem'
                        fontWeight={400}
                    >
                        {courseGroup.courseGroupNameAbbr ? courseGroup.courseGroupNameAbbr : courseGroup.courseGroupName}
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <Stack
                        w='100%'
                    >
                        <Button
                            as={Link}
                            href={`/group/${courseGroup.courseGroupName.replaceAll(' ', '-')}`}
                            w='100%'
                            variant='ghost'
                            textAlign='start'
                            borderRadius='8px'
                            p={0}
                            _hover={{
                                bg: 'transparent',
                            }}
                            _active={{
                                bg: 'transparent',
                            }}
                        >
                            <Text
                                w='100%'
                                fontSize='1rem'
                            >
                                {`หลักสูตร ${courseGroup.courseGroupNameAbbr ? courseGroup.courseGroupNameAbbr : courseGroup.courseGroupName} ทั้งหมด`}
                            </Text>
                        </Button>
                        {
                            course.length > 0 && course.map((c, index) => (
                                <DrawerButton key={index} course={c} />
                            ))
                        }
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export const MobileCourseMenu = () => {
    const courseGroup: TCourseGroup[] = useSelector(getCourseGroup)
    const fontColor = useColorModeValue('#77808B', '#ffffff')
    const [expanded, setExpanded] = useState<boolean>(false)
    const activeStyle = {
        bg: 'transparent',
        borderBottom: '2px',
        borderColor: 'exMidBlue',
        color: 'exMidBlue',
    }

    return (
        <Accordion
            as="a"
            w='100%'
            allowToggle
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionItem
                w='100%'
                border='0'
            >
                <AccordionButton
                    as={Button}
                    w='100%'
                    textAlign='start'
                    variant='ghost'
                    borderRadius='0'
                    textColor={fontColor}
                    _focus={{ bg: 'transparent' }}
                    _hover={activeStyle}
                    _expanded={activeStyle}
                >
                    <Text
                        w='100%'
                        fontSize="1rem"
                        fontWeight={400}
                    >
                        หลักสูตร
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <Stack
                        align='center'
                        w='100%'
                        mt="10px"
                    >
                        <Button
                            w='100%'
                            textAlign='start'
                            variant='ghost'
                            borderRadius='8px'
                            _hover={{
                                bg: 'exMidBlue',
                                color: 'white',
                            }}
                            _expanded={{
                                bg: 'exMidBlue',
                                color: 'white',
                            }}
                            _active={{
                                bg: 'exMidBlue',
                                color: 'white',
                            }}
                        >
                            <Text
                                w='100%'
                                textAlign='start'
                                fontSize='1rem'
                                fontWeight={400}
                            >
                                หลักสูตรทั้งหมด
                            </Text>
                        </Button>
                        {
                            courseGroup.map((item: TCourseGroup, index: number) => (
                                <DrawerCourseSubMenu key={index} courseGroup={item} />
                            ))
                        }
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
