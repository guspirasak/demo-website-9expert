'use client'

import { useCreateCourse } from "@/app/admin/context/CreateCourseContext"
import { TCourseInputRef, TCourseTextAreaRef } from "@/app/admin/interface/AdminInterface"
import { MoreIcon } from "@/app/icons/AdminIcon"
import { AddIcon } from "@chakra-ui/icons"
import { HStack, Text, Button, VStack, Input, Divider, Container, Stack, Menu, IconButton, MenuButton, MenuItem, MenuList, Textarea, Accordion, AccordionItem, AccordionButton, AccordionPanel, UnorderedList, ListItem } from "@chakra-ui/react"
import { useRef, useState } from "react"


export const CourseTopicList = ({ index, item }: { index: number, item: { header: string, description?: string[] } }) => {

    const { setState } = useCreateCourse()

    const [onEdit, setOnEdit] = useState<boolean>(false)

    const inputRef = useRef<TCourseInputRef>()
    const textAreaRef = useRef<TCourseInputRef>()

    const removeInput = () => {
        setState(prev => ({
            ...prev,
            courseTopic: [
                ...prev.courseTopic.slice(0, index),
                ...prev.courseTopic.slice(index + 1)
            ]
        }))
    }

    const editInput = () => {
        const input = inputRef.current?.value
        const textArea = textAreaRef.current?.value

        const textAreaValue = (textArea as string).split('\n')

        if (!input) return

        const newTopic = {
            header: input,
            description: textAreaValue[0] === '' ? [] : textAreaValue
        }

        setState(prev => ({ 
            ...prev, 
            courseTopic: [
                ...prev.courseTopic.slice(0, index),
                newTopic,
                ...prev.courseTopic.slice(index + 1)
            ]
        }))

        setOnEdit(false)
    }

    return (
        <Stack
            w='100%'
            align='center'
            justify='space-between'
            direction='row'
        >
            {
                onEdit ?
                    <>
                        <Stack
                            w='100%'
                        >
                            <Input 
                                ref={inputRef}
                                defaultValue={item.header}
                            />
                            <Textarea
                                ref={textAreaRef}
                                defaultValue={
                                    item.description?.join('\n')
                                }
                            />
                            <Stack
                                direction='row'
                                w='100%'
                                align='end'
                                justify='end'
                            >
                                <Button 
                                    onClick={() => editInput()}
                                    bg='exBlue'
                                    color='white'
                                    _hover={{
                                        bg: 'exBlue'
                                    }}
                                    _active={{
                                        bg: 'exBlue'
                                    }}
                                >
                                    Save
                                </Button>
                                <Button 
                                    onClick={() => setOnEdit(false)} 
                                    bg='exGray.100'
                                    color='black'
                                    _hover={{
                                        bg: 'exGray.100'
                                    }}
                                    _active={{
                                        bg: 'exGray.100'
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </>
                    :
                    <>
                        <Accordion 
                            allowToggle 
                            w='100%' 
                            border='0'
                        >
                            <AccordionItem
                                w='100%'
                                h='100%'
                                border='0'
                            >
                                <AccordionButton
                                    w='100%'
                                    h='100%'
                                    borderRadius='20px'
                                    bg='#F4F9F9'
                                    _expanded={{
                                        borderTopRadius: '20px',
                                        borderBottomRadius: '0'
                                    }}
                                >
                                    <Stack
                                        direction='row'
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='space-between'
                                    >
                                        <Text >{item.header}</Text>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                icon={<MoreIcon />}
                                                variant='ghost'
                                                _hover={{ bg: 'transparent' }}
                                                _active={{ bg: 'transparent' }}
                                            />
                                            <MenuList>
                                                <MenuItem onClick={() => setOnEdit(true)}>Edit</MenuItem>
                                                <MenuItem onClick={() => removeInput()} >Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Stack>
                                </AccordionButton>
                                <AccordionPanel
                                    bg='#FDFDFD'
                                    borderBottomRadius='20px'
                                >
                                    <UnorderedList>
                                        {
                                            item.description?.map((text, i) => (
                                                <ListItem key={i}>{text}</ListItem>
                                            ))
                                        }
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>
            }
        </Stack>
    )
}

export const CourseTopic = () => {

    const { state, setState } = useCreateCourse()

    const inputRef = useRef<TCourseInputRef>()
    const textAreaRef = useRef<TCourseTextAreaRef>()

    const addInput = () => {
        if (!inputRef.current?.value) return
        
        const textAreaValue = (textAreaRef.current?.value as string).split('\n')

        setState(prev => ({ 
            ...prev, 
            courseTopic: [
                ...prev.courseTopic, 
                { 
                    header: inputRef.current?.value, 
                    description: textAreaValue[0] === '' ? [] : textAreaValue
                }
            ] 
        }))

        inputRef.current.value = ''
        textAreaRef.current.value = ''
    }

    return (
        <>
            <Container
                maxW={{ base: '100%', md: '90%' }}
            >
                <VStack
                    align='start'
                    my='1.5rem'
                    spacing='1.5rem'
                    w='100%'
                >
                    <VStack
                        w='100%'
                    >
                        <HStack
                            w='100%'
                            justify='space-between'
                        >
                            <Text fontSize='lg' fontWeight='bold' >{`หัวข้อการฝึกอบรม (${state.courseTopic.length}/30)`}</Text>
                            <Button
                                leftIcon={<AddIcon />}
                                color='exBlue'
                                variant='ghost'
                                bg='transparent'
                                onClick={addInput}
                                _hover={{ bg: 'transparent' }}
                                _active={{ bg: 'transparent' }}
                            >
                                {`Add new`}
                            </Button>
                        </HStack>
                        <Input placeholder={`หัวข้อการฝึกอบรมของหลักสูตรนี้...`} ref={inputRef} />
                        <Textarea
                            placeholder={`รายละเอียดหัวข้อการฝึกอบรมของหลักสูตรนี้...`} 
                            ref={textAreaRef} 
                        />
                    </VStack>
                </VStack>
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                >
                    {
                        state.courseTopic.length > 0 && state.courseTopic.map((item, index) => (
                            <CourseTopicList
                                key={index}
                                index={index}
                                item={item}
                            />
                        ))
                    }
                </Stack >
            </Container >
            <Divider my='1.5rem' borderColor='rgba(233, 234, 240, 1)' />
        </>
    )
}
