'use client'

import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { CheckIcon } from "@chakra-ui/icons"
import { Box, OrderedList, ListItem, Stack, Text, List, Center, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Heading, UnorderedList, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useRef, useEffect } from "react"
import { TLiveRef } from "../../class/interface/LiveTab"

export const ELDescription = ({ setTabRef }: { setTabRef: Dispatch<SetStateAction<TLiveRef>> }) => {

    const { state }: ISingleCourseContext = useSingleCourse()

    const benefitRef = useRef<HTMLDivElement>(null)
    const objectiveRef = useRef<HTMLDivElement>(null)
    const requirementRef = useRef<HTMLDivElement>(null)
    const topicRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTabRef(prev => ({
            ...prev,
            benefit: benefitRef,
            objective: objectiveRef,
            requirement: requirementRef,
            topic: topicRef
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
                        textColor='white'
                    >
                        {state.courseTeaserAbbr}
                    </Text>
                </Stack>
            </Stack>
            {
                state.courseObjective && state.courseObjective.length > 0 && (
                    <Stack
                        ref={objectiveRef}
                        aria-label="objective"
                        scrollMarginTop='150px'
                        w='100%'
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
                                color='white'
                                spacing='0.5rem'
                            >
                                {
                                    state.courseObjective && state.courseObjective.length > 0 && state.courseObjective.map((item, index) => (
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
                        ref={benefitRef}
                        aria-label="benefit"
                        scrollMarginTop='150px'
                        w='100%'
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
                                {`หลักสูตรนี้เหมาะสำหรับ`}
                            </Text>
                            <List
                                fontSize='18px'
                                color='white'
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
                        ref={requirementRef}
                        aria-label="requirement"
                        scrollMarginTop='150px'
                        w='100%'
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
                                {`ความต้องการของระบบ`}
                            </Text>
                            <OrderedList
                                fontSize='18px'
                                color='white'
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
                        ref={topicRef}
                        aria-label="topic"
                        scrollMarginTop='150px'
                        w='100%'
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
                                        <AccordionItem
                                            key={index}
                                            border='0'
                                        >
                                            <Heading
                                                as='h2'
                                                borderTopRadius='20px'
                                                borderRadius='10px'
                                                minH='52px'
                                                size='18px'
                                            >
                                                <AccordionButton
                                                    bg={useColorModeValue('exBlue', '#0B345D')}
                                                    minH='52px'
                                                    borderRadius='10px'
                                                    _expanded={{
                                                        borderTopRadius: '20px',
                                                        borderBottomRadius: '0'
                                                    }}
                                                >
                                                    <Box
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
                                                bg={useColorModeValue('#0E4E7D', '#155A90')}
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