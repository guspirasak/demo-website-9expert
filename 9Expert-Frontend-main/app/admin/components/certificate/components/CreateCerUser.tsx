'use client'

import { useCreateCertificate } from "@/app/admin/context/CreateCertificateContext"
import { AdminFileIcon, DragNDropIcon } from "@/app/icons/AdminIcon"
import { csvFileToArray } from "@/libs/ArrayManage"
import { CreateCertificate } from "@/libs/CreateCertificate"
import { Button, Container, Divider, HStack, Heading, IconButton, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { filesize } from "filesize"
import { CloseIcon } from "@chakra-ui/icons"
import { TCertificate, TCertificateHours } from "@/app/admin/interface/CreateCertificate"
import { createNewCertificate, getCourseHours, getCourseHoursByCourseId } from "@/libs/AdminAPI"
import { Loading } from "../../Loading"

export const CreateCerUser = () => {

    const { state, setState } = useCreateCertificate()
    const [course, setCourse] = useState<TCertificateHours>({
        _id: '',
        courseName: '',
        hours: '',
        days: '',
    })

    const [loading, setLoading] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const toast = useToast()

    const reader = new FileReader()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]

        const prefix = Math.floor(Math.random() * 10000)

        if (file) {
            reader.onload = async (event) => {
                const csvOutput = event?.target?.result

                const csvUser = csvFileToArray(csvOutput as string)

                const filterUndefined = csvUser.filter((user) => user.name)

                const newUser = await CreateCertificate(filterUndefined, state.courseName, state.courseInstructor, prefix, state.courseId, course.days, course.hours)

                const newUserFilter = newUser.filter((user) => user.name)
                
                const addCerNumber = newUserFilter.map((user, index) => ({ 
                    ...user, 
                    certificateNo: `${state.courseId}-${prefix.toString()}${(index + 1).toString().length === 1 ? `0${index + 1}` : index + 1}`, 
                    isSending: false,
                    startDate: state.classStartDate,
                }))

                setLoading(true)

                const newState = {
                    ...state,
                    user: addCerNumber
                }

                await createNewCertificate(newState, (data: TCertificate, error: unknown) => {
                    if (error) {
                        setLoading(false)
                        e.target.value = ''
                        return toast({
                            title: 'เกิดข้อผิดพลาด',
                            description: 'กรุณาลองใหม่อีกครั้ง',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top-right'
                        })
                    }

                    setLoading(false)
                    setState(prev => ({
                        ...prev,
                        ...data,
                        file: {
                            name: file.name,
                            size: file.size
                        }
                    }))

                })
            };

            reader.readAsText(file)
        }
    }

    useEffect(() => {
        if (!state.file.name || !state.file.size) inputRef.current!.value = ''
    }, [state.file.name, state.file.size])

    useEffect(() => {
        getCourseHoursByCourseId(state.courseId as string, (data: TCertificateHours, error: unknown) => {
            console.log(data)
            if (error) console.log(error)

            if (data) setCourse(data)
        })
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
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
                    <Heading>{`Create User(s)`}</Heading>
                </HStack>
                <Stack
                    w='100%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='31px'
                    py='40px'
                >
                    <Input
                        ref={inputRef}
                        type='file'
                        accept='.csv'
                        hidden
                        onChange={handleOnChange}
                    />
                    <IconButton
                        aria-label="dragndrop"
                        w='100%'
                        h='100%'
                        variant='ghost'
                        icon={<DragNDropIcon w='512px' h='512px' />}
                        onClick={() => inputRef.current?.click()}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    />
                    <Text
                        fontSize='30px'
                        fontWeight='600'
                        textColor='#2E2E2E'
                    >
                        {`Uplolad your files`}
                    </Text>
                    <HStack>
                        <Text
                            fontSize='30px'
                            fontWeight='400'
                            textColor='#2E2E2E'
                        >
                            {`Drag and Drop your file here or`}
                        </Text>
                        <Text
                            fontSize='30px'
                            fontWeight='400'
                            textColor='#19B5FE'
                            cursor='pointer'
                            textDecoration='underline'
                            onClick={() => inputRef.current?.click()}
                        >
                            {`choose file`}
                        </Text>
                    </HStack>
                </Stack>
                <Stack
                    w='100%'
                    h='fit-content'
                    mb='30px'
                    align='center'
                    justify='center'
                >
                    <Stack
                        w='95%'
                        h='fit-content'
                        align='start'
                        justify='center'
                        spacing='30px'
                    >
                        <Heading
                            w='100%'
                            fontSize='32px'
                            fontWeight='600'
                            textColor='#2E2E2E'
                            pb='15px'
                            borderBottom='1px'
                            borderColor='#C4C4C4'
                        >
                            {`files`}
                        </Heading>
                        <Stack
                            w='100%'
                            h='90px'
                            px='20px'
                            py='20px'
                            border='1px'
                            borderColor='#C4C4C4'
                            borderRadius='10px'
                            direction='row'
                            align='center'
                            justify='space-between'
                        >
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='start'
                                direction='row'
                                spacing='15px'
                            >
                                {
                                    state.file.name &&
                                    <AdminFileIcon
                                        w='30px'
                                        h='35px'
                                        color='#36B37E'
                                    />
                                }
                                <Text
                                    fontSize='20px'
                                    fontWeight='400'
                                    textColor='#717579'
                                >
                                    {state.file.name}
                                </Text>
                            </Stack>
                            {
                                state.file.name &&
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='end'
                                    direction='row'
                                    spacing='30px'
                                >
                                    <Text
                                        w='fit-content'
                                        h='50px'
                                        px='10px'
                                        display='flex'
                                        fontSize='20px'
                                        fontWeight='400'
                                        textColor='#817F7F'
                                        bg='#EDEDED80'
                                        textAlign='center'
                                        alignItems='center'
                                        justifyContent='center'
                                        borderRadius='5px'
                                    >
                                        {filesize(state.file.size)}
                                    </Text>
                                    <Divider orientation='vertical' />
                                    <IconButton
                                        aria-label="delete"
                                        bg='#EDEDED80'
                                        w='50px'
                                        h='50px'
                                        borderRadius='full'
                                        icon={<CloseIcon w='15px' h='15px' color='#817F7F' />}
                                        onClick={() => {
                                            setState(prev => ({ ...prev, user: [], file: { name: '', size: 0 } }))
                                        }}
                                    />
                                </Stack>
                            }
                        </Stack>
                        <Button
                            w='250px'
                            h='65px'
                            bg='#19B5FE'
                            textColor='white'
                            fontSize='18px'
                            fontWeight='600'
                            onClick={() => inputRef.current?.click()}
                        >
                            {`Upload CSV`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}