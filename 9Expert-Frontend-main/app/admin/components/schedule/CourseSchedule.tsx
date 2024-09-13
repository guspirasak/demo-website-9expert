'use client'

import { Divider, VStack, Text, Input, Stack, Select, IconButton, Highlight, Button, useToast } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TCourseInputRef } from "../../interface/AdminInterface"
import { TClassDetails, TClassRoom } from "../../interface/CreateCourseInterface"
import { AdminInput } from "../AdminInput"
import { ICreateCourseContext, useCreateCourse } from "../../context/CreateCourseContext"
import { createClassDetails, deleteClassDetail, editClassDetail, GetEmptyRoom } from "@/libs/AdminAPI"
import { ClassStatus } from "@/libs/GlobalData"
import { useSearchParams } from "next/navigation"
import moment from "moment"
import { DeleteIcon } from "@chakra-ui/icons"
import { Validation } from "@/libs/Validation"

export const OfflineCourseSchedule = ({ detail, index }: { detail: TClassDetails, index: number }) => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()

    const [schedule, setSchedule] = useState<TClassDetails>({
        courseId: '',
        classType: 'Classroom',
        classStartDate: '',
        classEndDate: '',
        classStartTime: '09:00',
        classEndTime: '16:00',
        classCapacity: 0,
        classLocation: [],
        classTeamsURL: '',
        classStatus: 'Open',
        classNote: '',
        classRoom: [],
    })

    const [emptyRoom, setEmptyRoom] = useState<TClassRoom[]>([])

    const courseStartDateRef = useRef<TCourseInputRef>()
    const courseEndDateRef = useRef<TCourseInputRef>()
    const courseTimeRef = useRef<TCourseInputRef>()
    const classTeamsURLRef = useRef<TCourseInputRef>()
    const classNoteRef = useRef<TCourseInputRef>()
    const classCapacityRef = useRef<TCourseInputRef>()

    const courseId = useSearchParams().get('course')
    const toast = useToast()

    useEffect(() => {
        if (courseId) {
            GetEmptyRoom(new Date(schedule.classStartDate as string), new Date(schedule.classEndDate as string), (data: TClassRoom[], error: string) => {
                if (error) {
                    console.log(error)
                }
                setEmptyRoom(data)
                setSchedule({
                    ...detail,
                    courseId: courseId,
                })
            })
        }
    }, [courseId, detail])

    useEffect(() => {
        if (!courseId) {
            if (!schedule.classStartDate || !schedule.classEndDate || !schedule.classStartTime || !schedule.classEndTime || !schedule.classCapacity || !schedule.classLocation || schedule.classRoom?.length === 0) return

            const newClassDetails = [...state.classDetails!]
            newClassDetails[index] = schedule
            setState(prev => ({
                ...prev,
                classDetails: newClassDetails
            }))
        }
    }, [schedule])

    const handleGetEmptyRoom = async () => {
        await GetEmptyRoom(new Date(schedule.classStartDate as string), new Date(schedule.classEndDate as string), (data: TClassRoom[], error: string) => {
            if (error) {
                console.log(error)
            }
            setEmptyRoom(data)
        })
    }

    const handleDeleteSchedule = async (id: string) => {
        await deleteClassDetail(id, (data: unknown, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'ลบรอบการอบรมไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            const newClassDetails = [...state.classDetails!]
            newClassDetails.splice(index, 1)
            setState(prev => ({
                ...prev,
                classDetails: newClassDetails
            }))
            return toast({
                title: 'ลบรอบการอบรมสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    const handleSaveNewSchedule = async () => {

        const validateData = {
            courseId: schedule.courseId,
            classType: schedule.classType,
            classStartDate: schedule.classStartDate,
            classEndDate: schedule.classEndDate,
            classStartTime: schedule.classStartTime || '09:00',
            classEndTime: schedule.classEndTime || '16:00',
            classCapacity: schedule.classCapacity,
            classStatus: schedule.classStatus,
            classRoom: schedule.classRoom,
        }

        Validation(validateData, async (res: any, empty: boolean) => {
            if (empty) {
                return toast({
                    title: 'กรุณากรอกข้อมูลตารางเวลาให้ครบถ้วน',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            if (courseId) {
                await createClassDetails({...schedule, classStartTime: schedule.classStartTime || '09:00', classEndTime: schedule.classEndTime || '16:00' }, (data: TClassDetails, error: string) => {
                    if (error) {
                        console.log(error)
                        return toast({
                            title: 'เพิ่มรอบการอบรมไม่สําเร็จ',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top-right'
                        })
                    }
                    const newClassDetails = [...state.classDetails!]
                    newClassDetails[index] = data
                    setState(prev => ({
                        ...prev,
                        classDetails: newClassDetails
                    }))

                    return toast({
                        title: 'เพิ่มรอบการอบรมสําเร็จ',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                })
            } else {
                const newClassDetails = [...state.classDetails!]
                newClassDetails[index] = schedule
                setState(prev => ({
                    ...prev,
                    classDetails: newClassDetails
                }))
            }
        })
    }

    const handleEditSchedule = async (id: string) => {

        const validateData = {
            courseId: schedule.courseId,
            classType: schedule.classType,
            classStartDate: schedule.classStartDate,
            classEndDate: schedule.classEndDate,
            classStartTime: schedule.classStartTime || '09:00',
            classEndTime: schedule.classEndTime || '16:00',
            classCapacity: schedule.classCapacity,
            classStatus: schedule.classStatus,
            classRoom: schedule.classRoom,
        }
        
        Validation(validateData, async (res: any, empty: boolean) => {
            if (empty) {
                return toast({
                    title: 'กรุณากรอกข้อมูลตารางเวลาให้ครบถ้วน',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            await editClassDetail(id, {...schedule, classStartTime: schedule.classStartTime || '09:00', classEndTime: schedule.classEndTime || '16:00'}, (data: TClassDetails, error: string) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'บันทึกรอบการอบรมไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                console.log(data)
                const newClassDetails = [...state.classDetails!]
                newClassDetails[index] = data

                setState(prev => ({
                    ...prev,
                    classDetails: newClassDetails
                }))

                return toast({
                    title: 'บันทึกรอบการอบรมสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            })
        })
    }

    return (
        <>
            <Divider my='1.5rem' borderColor='exGray.500' />
            <VStack
                w='100%'
                spacing='1.5rem'
                position='relative'
            >
                <Stack
                    w='100%'
                    justify='space-between'
                    align='start'
                    direction={{ base: 'column', '2xl': 'row' }}
                    spacing='1.5rem'
                >
                    <VStack
                        w='100%'
                        spacing='0.5rem'
                        align='start'
                    >
                        <Text fontSize='lg'>
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`วันที่อบรม *`}
                            </Highlight>
                        </Text>
                        <Stack
                            spacing='0'
                            w='100%'
                            direction={{ base: 'column', md: 'row' }}
                        >
                            <Input
                                w='100%'
                                type='date'
                                borderRadius='0'
                                value={schedule.classStartDate as string}
                                ref={courseStartDateRef}
                                onChange={(e) => {
                                    setSchedule(prev => ({
                                        ...prev,
                                        classStartDate: e.target.value
                                    }))
                                }}
                            />
                            <Text
                                display={{ base: 'none', md: 'flex' }}
                                textAlign='center'
                                alignItems='center'
                                justifyContent='center'
                                h='40px'
                                minW='40px'
                                border='1px'
                                borderColor='exGray.100'
                                borderRadius='0'
                            >{`ถึง`}</Text>
                            <Text display={{ base: 'flex', md: 'none' }} my={{ base: '0.5rem', md: '0' }}>{`ถึง`}</Text>
                            <Input
                                ref={courseEndDateRef}
                                w='100%'
                                type='date'
                                borderRadius='0'
                                value={schedule.classEndDate as string}
                                onChange={(e) => {
                                    setSchedule(prev => ({
                                        ...prev,
                                        classEndDate: e.target.value
                                    }))
                                }}
                            />
                        </Stack>
                    </VStack>
                    <VStack
                        w='100%'
                    >
                        <Stack
                            w='100%'
                        >
                            <VStack
                                align='start'
                                w='100%'
                                spacing='0.5rem'
                            >
                                <Text fontSize='lg' >
                                    <Highlight
                                        query={["*"]}
                                        styles={{ textColor: 'crimson' }}
                                    >
                                        {`ช่วงเวลาการอบรม *`}
                                    </Highlight>
                                </Text>
                                <Stack
                                    w='100%'
                                    spacing='0'
                                    direction={{ base: 'column', md: 'row' }}
                                >
                                    <Input
                                        w='100%'
                                        ref={courseTimeRef}
                                        type='time'
                                        borderRadius='0'
                                        value={schedule.classStartTime as string}
                                        onChange={(e) => {
                                            setSchedule(prev => ({
                                                ...prev,
                                                classStartTime: e.target.value
                                            }))
                                        }}
                                    />
                                    <Text
                                        display={{ base: 'none', md: 'flex' }}
                                        textAlign='center'
                                        alignItems='center'
                                        justifyContent='center'
                                        h='40px'
                                        minW='40px'
                                        border='1px'
                                        borderColor='exGray.100'
                                        borderRadius='0'
                                    >{`ถึง`}</Text>
                                    <Text display={{ base: 'flex', md: 'none' }} my={{ base: '0.5rem', md: '0' }}>{`ถึง`}</Text>
                                    <Input
                                        w='100%'
                                        ref={courseTimeRef}
                                        type='time'
                                        borderRadius='0'
                                        value={schedule.classEndTime as string}
                                        onChange={(e) => {
                                            setSchedule(prev => ({
                                                ...prev,
                                                classEndTime: e.target.value
                                            }))
                                        }}
                                    />
                                </Stack>
                            </VStack>
                        </Stack>
                    </VStack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text fontSize='lg' >
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`รูปแบบการอบรม *`}
                            </Highlight>
                        </Text>
                        <Select
                            position='relative'
                            placeholder="เลือกรูปแบบการอบรม"
                            value={schedule.classType}
                            onChange={(e) => {
                                setSchedule({
                                    ...schedule,
                                    classType: e.target.value
                                })
                            }}
                            _placeholder={{ color: 'exGray.300' }}
                        >
                            <option value='Classroom'>{`Classroom`}</option>
                            <option value='Live'>{`Live`}</option>
                            <option value='Hybrid'>{`Hybrid`}</option>
                        </Select>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classTeamsURLRef}
                            placeholder="ระบุ URL สําหรับการอบรม"
                            value={schedule.classTeamsURL}
                            onChange={() => {
                                setSchedule(prev => ({
                                    ...prev,
                                    classTeamsURL: classTeamsURLRef.current?.value
                                }))
                            }}
                        >
                            {`URL สําหรับการอบรม`}
                        </AdminInput>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text fontSize='lg' >
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`ห้องเรียน *`}
                            </Highlight>
                        </Text>
                        <Select
                            position='relative'
                            placeholder="เลือกห้องเรียน"
                            disabled={schedule.classStartDate && schedule.classEndDate ? false : true}
                            value={schedule.classRoom![0]}
                            onClick={handleGetEmptyRoom}
                            onChange={(e) => {
                                setSchedule(prev => ({
                                    ...prev,
                                    classRoom: [e.target.value]
                                }))
                            }}
                            _placeholder={{ color: 'exGray.300' }}
                        >
                            {
                                emptyRoom.map((room) => {
                                    return (
                                        <option
                                            key={room.roomId}
                                            value={room._id}
                                        >
                                            {`${room.roomName} (${room.roomCapacity} คน)`}
                                        </option>
                                    )
                                })
                            }
                        </Select>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text fontSize='lg' >
                            <Highlight
                                query={["*"]}
                                styles={{ textColor: 'crimson' }}
                            >
                                {`สถานะการอบรม *`}
                            </Highlight>
                        </Text>
                        <Select
                            position='relative'
                            placeholder="เลือกสถานะการอบรม"
                            value={schedule.classStatus}
                            onChange={(e) => {
                                setSchedule(prev => ({
                                    ...prev,
                                    classStatus: e.target.value
                                }))
                            }}
                            _placeholder={{ color: 'exGray.300' }}
                        >
                            {
                                ClassStatus.map((status, i) => (
                                    <option
                                        key={i}
                                        value={status}
                                    >
                                        {status}
                                    </option>
                                ))
                            }
                        </Select>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classCapacityRef}
                            placeholder="ระบุจํานวนคนที่อบรม"
                            isRequired
                            type='number'
                            onWheel={(e) => classCapacityRef.current.blur()}
                            value={`${schedule.classCapacity}`}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (isNaN(parseInt(e.target.value))) {
                                    return
                                }
                                if (parseInt(e.target.value) < 0) {
                                    return
                                }
                                setSchedule(prev => ({
                                    ...prev,
                                    classCapacity: parseInt(e.target.value)
                                }))
                            }}
                        >
                            {`จํานวนคนที่อบรม`}
                        </AdminInput>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classNoteRef}
                            placeholder="ระบุหมายเหตุ"
                            value={schedule.classNote}
                            onChange={() => {
                                setSchedule(prev => ({
                                    ...prev,
                                    classNote: classNoteRef.current?.value
                                }))
                            }}
                        >
                            {`หมายเหตุ`}
                        </AdminInput>
                    </Stack>
                </Stack>
                {
                    courseId ?
                        (
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='end'
                                direction='row'
                            >
                                <Button
                                    colorScheme="red"
                                    w='100px'
                                    onClick={() => {
                                        if (detail._id) {
                                            handleDeleteSchedule(detail._id)
                                        } else {
                                            const newClassDetails = state.classDetails?.filter((item, i) => i !== index)

                                            setState(prev => ({
                                                ...prev,
                                                classDetails: newClassDetails
                                            }))
                                        }
                                    }}
                                >
                                    {`ลบ`}
                                </Button>
                                <Button
                                    w='100px'
                                    bg='exBlue'
                                    color='white'
                                    onClick={() => {
                                        if (detail._id) {
                                            handleEditSchedule(detail._id)
                                        } else {
                                            handleSaveNewSchedule()
                                        }
                                    }}
                                >
                                    {`บันทึก`}
                                </Button>
                            </Stack>
                        )
                        :
                        (
                            <IconButton
                                aria-label="Delete class"
                                icon={<DeleteIcon h='18px' w='18px' color='red.500' />}
                                position='absolute'
                                top='-20px'
                                right='10px'
                                bg='transparent'
                                onClick={() => {

                                    const newClassDetails = state.classDetails?.filter((item, i) => i !== index)

                                    setState(prev => ({
                                        ...prev,
                                        classDetails: newClassDetails
                                    }))
                                }}
                                _hover={{
                                    bg: 'transparent',
                                }}
                                _active={{
                                    bg: 'transparent',
                                }}
                            />
                        )
                }
            </VStack>
        </>
    )
}

export const OnlineCourseSchedule = ({ detail, index }: { detail: TClassDetails, index: number }) => {

    const { state, setState }: ICreateCourseContext = useCreateCourse()

    const [schedule, setSchedule] = useState<TClassDetails>({
        courseId: state.courseId, //
        classType: 'Classroom', //
        classCapacity: 0,
        classTeamsURL: '', //
        classStatus: '', //
        classNote: '', //
        classRoom: [],
    })

    const classTeamsURLRef = useRef<TCourseInputRef>()
    const classNoteRef = useRef<TCourseInputRef>()
    const classCapacityRef = useRef<TCourseInputRef>()

    useEffect(() => {
        return () => {

            if (!schedule.classType || !schedule.classCapacity || !schedule.classStatus || !schedule.classTeamsURL) return

            setState({
                ...state,
                classDetails: state.classDetails?.map((item, i) => {
                    if (i === index) {
                        return schedule
                    } else {
                        return item
                    }
                })
            })
        }
    }, [schedule])

    return (
        <>
            <Divider my='1.5rem' borderColor='exGray.500' />
            <VStack
                w='100%'
                spacing='1.5rem'
                position='relative'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text fontSize='lg' >{`รูปแบบการอบรม *`}</Text>
                        <Select
                            position='relative'
                            placeholder="เลือกรูปแบบการอบรม"
                            defaultValue={detail.classType}
                            onChange={(e) => {
                                setSchedule({
                                    ...schedule,
                                    classType: e.target.value
                                })
                            }}
                            _placeholder={{ color: 'exGray.300' }}
                        >
                            <option value='Classroom'>{`Classroom`}</option>
                            <option value='Live'>{`Live`}</option>
                            <option value='Hybrid'>{`Hybrid`}</option>
                        </Select>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classTeamsURLRef}
                            placeholder="ระบุ URL สําหรับการอบรม"
                            defaultValue={detail.classTeamsURL}
                            onBlur={() => {
                                setSchedule({
                                    ...schedule,
                                    classTeamsURL: classTeamsURLRef.current?.value
                                })
                            }}
                        >
                            {`URL สําหรับการอบรม *`}
                        </AdminInput>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text fontSize='lg' >{`สถานะการอบรม *`}</Text>
                        <Select
                            position='relative'
                            placeholder="เลือกสถานะการอบรม"
                            value={detail.classStatus}
                            onChange={(e) => {
                                setSchedule({
                                    ...schedule,
                                    classStatus: e.target.value
                                })
                            }}
                            _placeholder={{ color: 'exGray.300' }}
                        >

                        </Select>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classCapacityRef}
                            placeholder="ระบุจํานวนคนที่อบรม"
                            defaultValue={`${detail.classCapacity}`}
                            onBlur={() => {
                                setSchedule({
                                    ...schedule,
                                    classCapacity: Number(classCapacityRef.current?.value)
                                })
                            }}
                        >
                            {`จํานวนคนที่อบรม *`}
                        </AdminInput>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing='1.5rem'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <AdminInput
                            ref={classNoteRef}
                            placeholder="ระบุหมายเหตุ"
                            defaultValue={detail.classNote}
                            onBlur={() => {
                                setSchedule({
                                    ...schedule,
                                    classNote: classNoteRef.current?.value
                                })
                            }}
                        >
                            {`หมายเหตุ`}
                        </AdminInput>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='end'
                >
                    <Button
                        colorScheme="red"
                    >
                        {`ลบ`}
                    </Button>
                    <Button>
                        {`บันทึก`}
                    </Button>
                </Stack>
                {/* <IconButton
                    aria-label="Delete class"
                    icon={<DeleteIcon h='24px' w='24px' color='red.500' />}
                    position='absolute'
                    top='-20px'
                    right='10px'
                    bg='transparent'
                    onClick={() => {

                        const newClassDetails = state.classDetails?.filter((item, i) => i !== index)

                        setState(prev => ({
                            ...prev,
                            classDetails: newClassDetails
                        }))
                    }}
                    _hover={{
                        bg: 'transparent',
                    }}
                    _active={{
                        bg: 'transparent',
                    }}
                /> */}
            </VStack>
        </>
    )
}