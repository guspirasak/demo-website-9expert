'use client'

import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { CheckIcon } from "@chakra-ui/icons"
import { Box, OrderedList, ListItem, Stack, Text, List, Center, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Heading, UnorderedList, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { TLiveRef } from "../interface/LiveTab"

export const LiveDescription = ({ setTabRef }: { setTabRef: Dispatch<SetStateAction<TLiveRef>> }) => {

    const { state }: ISingleCourseContext = useSingleCourse()

    const benefitRef = useRef<HTMLDivElement>(null)
    const objectiveRef = useRef<HTMLDivElement>(null)
    const requirementRef = useRef<HTMLDivElement>(null)
    const topicRef = useRef<HTMLDivElement>(null)

    const descriptionColor = useColorModeValue('#949392', '#F7F7F7')

    useEffect(() => {
        setTabRef((prev) => ({
            ...prev,
            benefit: benefitRef,
            objective: objectiveRef,
            requirement: requirementRef,
            topic: topicRef,
        }))
    }, [])

    return (
        <>
            <Stack
                aria-label="Description"
                w='100%'
                direction='row'
                spacing='1rem'
            >
                <Box
                    w='7px'
                    h='53px'
                    bg={`linear-gradient(0deg, ${state.courseColor.length > 1 ? state.courseColor[1] : state.courseColor[0]}, ${state.courseColor[0]})`}
                    borderRadius='15px'
                >

                </Box>
                <Stack
                    w='100%'
                    spacing='1rem'
                >
                    <Text
                        as='h2'
                        fontWeight='bold'
                        fontSize='36px'
                    >
                        {state.courseName}
                    </Text>
                    <Text
                        fontSize='18px'
                        textColor={descriptionColor}
                    >
                        {state.courseTeaserAbbr}
                    </Text>
                </Stack>
            </Stack>
            {
                state.courseObjective && state.courseObjective.length > 0 && (
                    <Stack
                        id="objective"
                        ref={objectiveRef}
                        aria-label="objective"
                        w='100%'
                        scrollMarginTop='150px'
                        direction='row'
                        spacing='1rem'
                    >
                        <Box
                            w='7px'
                            h='53px'
                            bg='#1CA7EC'
                            borderRadius='15px'
                        >

                        </Box>
                        <Stack
                            w='100%'
                            spacing='1rem'
                        >
                            <Text
                                as='h2'
                                fontWeight='bold'
                                fontSize='36px'
                            >
                                {`วัตถุประสงค์`}
                            </Text>
                            <OrderedList
                                fontSize='18px'
                                color={descriptionColor}
                                spacing='0.5rem'
                            >
                                {
                                    state.courseObjective.length > 0 && state.courseObjective.map((item, index) => (
                                        <ListItem
                                            key={index}
                                        >
                                            {item}
                                        </ListItem>
                                    ))
                                }
                            </OrderedList>
                        </Stack>
                    </Stack>
                )
            }
            {
                state.courseBenefit && state.courseBenefit.length > 0 && (
                    <Stack
                        id="benefit"
                        ref={benefitRef}
                        aria-label="benefit"
                        scrollMarginTop='150px'
                        w='100%'
                        direction='row'
                        spacing='1rem'
                        _focus={{
                            id: 'benefit-focus'
                        }}
                    >
                        <Box
                            w='7px'
                            h='53px'
                            bg='#1CA7EC'
                            borderRadius='15px'
                        >

                        </Box>
                        <Stack
                            w='100%'
                            spacing='1rem'
                        >
                            <Text
                                as='h2'
                                fontWeight='bold'
                                fontSize='36px'
                            >
                                {`หลักสูตรนี้เหมาะสำหรับ`}
                            </Text>
                            <List
                                fontSize='18px'
                                color={descriptionColor}
                                spacing='0.5rem'
                            >
                                {
                                    state.courseBenefit && state.courseBenefit.length > 0 && state.courseBenefit.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            display='flex'
                                            flexDirection='row'
                                            gap='0.75rem'
                                        >
                                            <Center
                                                w='20px'
                                                h='20px'
                                                bg='white'
                                                shadow='md'
                                                borderRadius='5px'

                                            >
                                                <CheckIcon color='#19B5FE' w='10px' h='10px' />
                                            </Center>
                                            {item}
                                        </ListItem >
                                    ))
                                }
                            </List>
                        </Stack>
                    </Stack>
                )
            }
            {
                state.courseRequirement && state.courseRequirement.length > 0 && (
                    <Stack
                        id="requirement"
                        ref={requirementRef}
                        aria-label="requirement"
                        scrollMarginTop='150px'
                        w='100%'
                        direction='row'
                        spacing='1rem'
                        _focus={{
                            id: 'requirement-focus'
                        }}
                    >
                        <Box
                            w='7px'
                            h='53px'
                            bg='#1CA7EC'
                            borderRadius='15px'
                        >

                        </Box>
                        <Stack
                            w='100%'
                            spacing='1rem'
                        >
                            <Text
                                as='h2'
                                fontWeight='bold'
                                fontSize='36px'
                            >
                                {`ความต้องการของระบบ`}
                            </Text>
                            <OrderedList
                                fontSize='18px'
                                color={descriptionColor}
                                spacing='0.5rem'
                            >
                                {
                                    state.courseRequirement && state.courseRequirement.length > 0 && state.courseRequirement.map((item, index) => (
                                        <ListItem
                                            key={index}
                                        >
                                            {item}
                                        </ListItem>
                                    ))
                                }
                            </OrderedList>
                        </Stack>
                    </Stack>
                )
            }
            {
                state.courseTopic && state.courseTopic.length > 0 && (
                    <Stack
                        id="topic"
                        ref={topicRef}
                        aria-label="topic"
                        scrollMarginTop='150px'
                        w='100%'
                        direction='row'
                        spacing='1rem'
                        _focus={{
                            id: 'topic-focus'
                        }}
                    >
                        <Box
                            w='7px'
                            h='53px'
                            bg='#1CA7EC'
                            borderRadius='15px'
                        >

                        </Box>
                        <Stack
                            w='100%'
                            spacing='1rem'
                        >
                            <Text
                                as='h2'
                                fontWeight='bold'
                                fontSize='36px'
                            >
                                {`หัวข้อการฝึกอบรม`}
                            </Text>
                            <Accordion
                                defaultIndex={[0]}
                                allowMultiple
                                display='flex'
                                flexDirection='column'
                                w={{ base: '100%', lg: '667px' }}
                                gap='30px'
                            >
                                {
                                    state.courseTopic && state.courseTopic.length > 0 && state.courseTopic.map((item, index) => (
                                        item.description && item.description?.length > 0 && item.description![0] !== '' ?
                                            (
                                                <AccordionItem
                                                    key={index}
                                                    border='0'
                                                >
                                                    <Heading
                                                        as='h2'
                                                        size='18px'
                                                        borderTopRadius='20px'
                                                    >
                                                        <AccordionButton
                                                            minH='52px'
                                                            h='100%'
                                                            bg={useColorModeValue('#F4F9F9', '#323232')}
                                                            _expanded={{
                                                                borderTopRadius: '20px',
                                                            }}
                                                        >
                                                            <Box
                                                                h='100%'
                                                                as='span'
                                                                flex='1'
                                                                textAlign='left'
                                                            >
                                                                <Text
                                                                    fontSize='18px'
                                                                    as='b'
                                                                >
                                                                    {`${index + 1}. ${item.header}`}
                                                                </Text>
                                                            </Box>
                                                            {item.description!.length > 0 && <AccordionIcon />}
                                                        </AccordionButton>
                                                    </Heading>
                                                    <AccordionPanel
                                                        bg={useColorModeValue('#FDFDFD', '#4B4B4B')}
                                                        borderBottomRadius='20px'
                                                    >
                                                        <UnorderedList>
                                                            {
                                                                item.description!.map((text, i) => (
                                                                    <ListItem
                                                                        key={i}
                                                                    >
                                                                        {text}
                                                                    </ListItem>
                                                                ))
                                                            }
                                                        </UnorderedList>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            )
                                            :
                                            (
                                                <Stack
                                                    key={index}
                                                    as='h2'
                                                    border='0'
                                                    minH='52px'
                                                    h='100%'
                                                    bg={useColorModeValue('#F4F9F9', '#323232')}
                                                    px='1rem'
                                                    justify='center'
                                                >
                                                    <Stack
                                                        h='100%'
                                                        as='span'
                                                        flex='1'
                                                        textAlign='left'
                                                        justify='center'
                                                    >
                                                        <Text
                                                            fontSize='18px'
                                                            as='b'
                                                        >
                                                            {`${index + 1}. ${item.header}`}
                                                        </Text>
                                                    </Stack>
                                                </Stack>
                                            )
                                    ))
                                }
                            </Accordion>
                        </Stack>
                    </Stack>
                )
            }
        </>

    )
}