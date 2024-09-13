'use client'

import { AddIcon } from "@chakra-ui/icons"
import { HStack, Text, Button, VStack, Input, Divider, Container, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import { TAdminCourseInfomation, TCourseInputRef } from "../interface/AdminInterface"
import { MoreIcon } from "@/app/icons/AdminIcon"
import { useState, useRef, useEffect } from "react"
import { useCreateCourse } from "../context/CreateCourseContext"


export const AdminCourseInfomationList = ({ index, item, setState }: { index: number, item: string, setState: React.Dispatch<React.SetStateAction<Array<string>>> }) => {

    const [onEdit, setOnEdit] = useState<boolean>(false)

    const inputRef = useRef<TCourseInputRef>()

    const removeInput = () => {
        setState(prev => ([
            ...prev.filter((_, i) => i !== index)
        ]))
    }

    const editInput = () => {
        const input = inputRef.current?.value

        if (!input) return

        setState(prev => [...prev.slice(0, index), input, ...prev.slice(index + 1)])
        setOnEdit(false)
    }

    return (
        <Stack
            w='100%'
            align='start'
            justify='space-between'
            direction='row'
            pl='16px'
        >
            {
                onEdit ?
                    <>
                        <Stack
                            w='100%'
                        >
                            <Input
                                ref={inputRef}
                                defaultValue={item}
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
                        <Text >{`${index + 1}. ${item}`}</Text>
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
                    </>
            }
        </Stack>
    )
}

export const AdminCourseInfomationInput = ({ children, placeholder, data, objKey }: TAdminCourseInfomation) => {

    const { setState } = useCreateCourse()

    const [infoState, setInfoState] = useState<Array<string>>(data)
    const [maxInput, setMaxInput] = useState<boolean>(false)

    const inputRef = useRef<TCourseInputRef>()

    const addInput = () => {

        const input = inputRef.current?.value

        if (!input) return

        setInfoState((prev: string[]) => ([...prev, input]))
        
        inputRef.current.value = ''
    }

    useEffect(() => {

        setState(prev => ({
            ...prev,
            [objKey]: infoState
        }))

        return () => {
            
        }
    }, [infoState])

    useEffect(() => {
        if (infoState.length >= 10) return setMaxInput(true)

        setMaxInput(false)

        return () => {
            
        }
    }, [infoState])

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
                            <Text fontSize='lg' fontWeight='bold' >{children}</Text>
                            {
                                maxInput ?
                                    <></>
                                    :
                                    <Button
                                        leftIcon={<AddIcon />}
                                        color='exBlue'
                                        variant='ghost'
                                        bg='transparent'
                                        onClick={maxInput ? () => true : addInput}
                                        _hover={{ bg: 'transparent' }}
                                        _active={{ bg: 'transparent' }}
                                    >
                                        {`Add new`}
                                    </Button>
                            }
                        </HStack>
                        {
                            maxInput ?
                                <></>
                                :
                                <Input
                                    ref={inputRef}
                                    placeholder={placeholder}
                                />
                        }
                    </VStack>
                </VStack>
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                    spacing='12px'
                >
                    {
                        infoState.length > 0 && infoState.map((item: string, index: number) => (
                            <AdminCourseInfomationList
                                key={index}
                                index={index}
                                item={item}
                                setState={setInfoState}
                            />
                        ))
                    }
                </Stack >
            </Container >
            <Divider my='1.5rem' borderColor='rgba(233, 234, 240, 1)' />
        </>
    )
}