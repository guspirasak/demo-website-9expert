'use client'

import { TBundle, TBundleCourse } from "@/app/admin/interface/BundleInterface"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { DeleteIcon, SortIcon } from "@/app/icons/AdminIcon"
import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { getAllCourseDataForBundle, getAllCourseDataForBundleByCourseGroup } from "@/libs/AdminAPI"
import { allValuesExist } from "@/libs/ArrayManage"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { AddIcon } from "@chakra-ui/icons"
import { Checkbox, HStack, Stack, Table, Th, Thead, Tr, Text, Tbody, Td, Button, useDisclosure, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Heading, Input, Select, InputGroup, InputRightElement, Center, useToast, Image } from "@chakra-ui/react"
import commaNumber from "comma-number"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"

type TBundleSelectCourse = {
    state: TBundle
    setState: Dispatch<SetStateAction<TBundle>>
}

const renderStatus = (course: TBundleCourse) => {

    if (course.courseStatus.toLowerCase() === 'active') {
        return (
            <Center
                w='150px'
                h='50px'
                bg='#D4F0B066'
                borderRadius='45px'
            >
                <Text fontSize='18px' fontWeight='400' textColor='#2BAC47' >{`เปิดใช้งาน`}</Text>
            </Center>
        )
    } else {
        return (
            <Center
                w='150px'
                h='50px'
                bg='#F65A5A33'
                borderRadius='45px'
            >
                <Text fontSize='18px' fontWeight='400' textColor='#F65A5A' >{`ปิดการใช้งาน`}</Text>
            </Center>
        )
    }

}

export const BundleSelectCourse = ({ state, setState }: TBundleSelectCourse) => {

    const courseGroup = useSelector(getCourseGroup)

    const { onOpen, isOpen, onClose } = useDisclosure()
    const  toast = useToast()

    const [ selected, setSelected ] = useState<TBundleCourse[]>(state.course)

    const [ search, setSearch ] = useState<string>('')
    const [ selectCg, setSelectCg ] = useState<string>('')
    const [ courses, setCourses ] = useState<TBundleCourse[]>([])
    const [ cache, setCache ] = useState<TBundleCourse[]>([])

    useEffect(() => {
        if (selectCg) {
            getAllCourseDataForBundleByCourseGroup(selectCg, (data: TBundleCourse[], error: unknown) => {
                if (error) console.log(error)
                setCourses(data)
                setCache(data)
            })
        }

        if (!selectCg) {
            getAllCourseDataForBundle((data: TBundleCourse[], error: unknown) => {
                if (error) console.log(error)
                setCourses(data)
                setCache(data)
            })
        }
    }, [selectCg])

    useEffect(() => {
        if (search) {
            setCourses(cache.filter(c => c.courseName.toLowerCase().includes(search.toLowerCase())))
        }

        if (!search) {
            setCourses(cache)
        }
    }, [search])

    const handleSaveBundle = () => {

        const newBundleCourse = new Set<string>()

        state.course.forEach(c => newBundleCourse.add(c.courseId))
        selected.forEach(s => newBundleCourse.add(s.courseId))

        const newCourse: TBundleCourse[] = Array.from(newBundleCourse).map((c) => courses.find((course) => course.courseId === c)) as TBundleCourse[]

        setState(prev => ({
            ...prev,
            course: newCourse,
            totalPrice: newCourse.reduce((a, b) => a + Number(b.price), 0)
        }))

        onClose()
    }

    const handleRemoveCourseSelected = (course: TBundleCourse) => {
        setSelected(prev => prev.filter(p => p._id !== course._id))
        setState(prev => ({
            ...prev,
            course: prev.course.filter(p => p._id !== course._id),
            totalPrice: prev.totalPrice - Number(course.price)
        }))
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <Table
                w='100%'
            >
                <Thead
                    bg='#C5DCFA80'
                    h='60px'
                >
                    <Tr>
                        <Th w={{ base: '60%', lg: '25%' }} >
                            <HStack>
                                <Checkbox
                                    mr='0.5rem'
                                    isChecked={allValuesExist(state.course, selected)}
                                    onChange={() => {
                                        if (selected.length > 0) {
                                            return setSelected([])
                                        }

                                        setSelected(state.course)
                                    }}
                                />
                                <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`ชื่อหลักสูตร*`}</Text>
                            </HStack>
                        </Th>
                        <Th
                            display={{ base: 'none', lg: 'table-cell' }}
                            w='20%'
                            textAlign='center'
                        >
                            <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`รหัสหลักสูตร`}</Text>
                        </Th>
                        <Th
                            w='15%'
                            textAlign='center'
                            display={{ base: 'none', lg: 'table-cell' }}
                        >
                            <HStack justify='center'>
                                <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`ราคาสินค้า`}</Text>
                            </HStack>
                        </Th>
                        <Th
                            w='5%'
                            textAlign='center'
                        >
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        state.course.map((course, index) => (
                            <Tr
                                key={index}
                            >
                                <Td
                                    w='50%'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                    >
                                        <Checkbox
                                            mr='0.5rem'
                                            isChecked={selected.includes(course)}
                                            onChange={() => {
                                                if (selected.includes(course)) {
                                                    return setSelected(selected.filter(c => c !== course))
                                                }

                                                setSelected(prev => [...prev, course])
                                            }}
                                        />
                                        <Image 
                                            w='90px'
                                            h='60px'
                                            borderRadius='5px'
                                            src={course.courseImage}
                                        />
                                        <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{course.courseName}</Text>
                                    </HStack>
                                </Td>
                                <Td
                                    w='20%'
                                    textAlign='center'
                                >
                                    <Text fontSize='18px' fontWeight='400' textColor='#4091F4' >{course.courseId}</Text>
                                </Td>
                                <Td
                                    w='20%'
                                    textAlign='center'
                                >
                                    <Text fontSize='18px' fontWeight='400' textColor='#4091F4' >{commaNumber(course.price)}</Text>
                                </Td>
                                <Td
                                    w='10%'
                                >
                                    <DeleteIcon 
                                        w='18px' 
                                        h='18px' 
                                        color='#F65A5A'
                                        cursor='pointer'
                                        onClick={() => handleRemoveCourseSelected(course)} 
                                    />
                                </Td>
                            </Tr>
                        ))
                    }
                    <Tr>
                        <Td
                            w='50%'
                        >
                        </Td>
                        <Td
                            w='20%'
                            textAlign='end'
                        >
                        </Td>
                        <Td
                            w='20%'
                            textAlign='center'
                        >
                            <Stack
                                direction='row'
                                w='100%'
                                align='center'
                                justify='start'
                                p='0'
                            >
                                <Text w='37%' textAlign='start' fontSize='18px' fontWeight='400' textColor='#4091F4' >ราคารวม :</Text>
                                <Text w='50%' textAlign='start' fontSize='18px' fontWeight='400' textColor='#4091F4' >{commaNumber(state.totalPrice)}</Text>
                            </Stack>
                        </Td>
                        <Td
                            w='10%'
                        >
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Stack
                w='100%'
                h='100%'
                mt='60px'
                align='start'
            >
                <Button
                    variant='ghost'
                    color='#4091F4'
                    leftIcon={<AddIcon w='18px' h='18px' />}
                    fontSize='24px'
                    fontWeight='400'
                    onClick={onOpen}
                >
                    {`เพิ่มสินค้า`}
                </Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size='6xl'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Heading
                                mt='50px'
                                fontSize='36px'
                                fontWeight='500'
                                textColor='#2E2E2E'
                            >
                                {`เพิ่มสินค้า`}
                            </Heading>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack
                                w='100%'
                                h='100%'
                                spacing='24px'
                            >
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='space-between'
                                    direction='row'
                                >
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='200'
                                            textColor='#2E2E2E'
                                        >
                                            {`เลือกหมวดหมู่ :`}
                                        </Text>
                                        <Select
                                            w='100%'
                                            maxW='250px'
                                            h='50px'
                                            placeholder="หมวดหมู่ทั้งหมด"
                                            borderColor='#817F7F'
                                            onChange={(e) => setSelectCg(e.target.value)}
                                        >
                                            {
                                                courseGroup.map((group: TCourseGroup, index: number) => (
                                                    <option
                                                        key={index}
                                                        value={group._id}
                                                    >
                                                        {group.courseGroupName}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='end'
                                        direction='row'
                                    >
                                        <InputGroup
                                            w='100%'
                                            maxW='500px'
                                            h='50px'
                                        >
                                            <Input 
                                                w='100%'
                                                h='50px'
                                                borderColor='#817F7F'
                                                placeholder="ค้นหาหลักสูตร..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <InputRightElement
                                                h='50px'
                                            >
                                                <Stack
                                                    w='100%'
                                                    h='100%'
                                                    align='center'
                                                    justify='center'
                                                >
                                                    <MagnifyingGlassIcon w='24px' h='24px' color='#2E2E2E' />
                                                </Stack>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Button
                                            w='120px'
                                            h='50px'
                                            bg='exBlue'
                                            fontSize='18px'
                                            fontWeight='600'
                                            textColor='white'
                                        >
                                            {`ค้นหา`}
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack
                                    w='100%'
                                >
                                    <Table
                                        w='100%'
                                    >
                                        <Thead
                                            bg='#C5DCFA80'
                                            h='60px'
                                        >
                                            <Tr>
                                                <Th w={{ base: '40%', lg: '25%' }} >
                                                    <HStack>
                                                        <Checkbox
                                                            mr='0.5rem'
                                                            isChecked={allValuesExist(courses, selected)}
                                                            onChange={() => {
                                                                if (selected.length > 0) {
                                                                    return setSelected([])
                                                                }

                                                                setSelected(courses)
                                                            }}
                                                        />
                                                        <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`ชื่อหลักสูตร*`}</Text>
                                                    </HStack>
                                                </Th>
                                                <Th
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    w='10%'
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`รหัสหลักสูตร`}</Text>
                                                </Th>
                                                <Th
                                                    w='25%'
                                                    textAlign='center'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                >
                                                    <HStack justify='center'>
                                                        <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`จำนวนวันอบรม`}</Text>
                                                        <SortIcon w='24px' h='24px' />
                                                    </HStack>
                                                </Th>
                                                <Th
                                                    w='15%'
                                                    textAlign='center'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                >
                                                    <HStack justify='center'>
                                                        <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`ราคา`}</Text>
                                                        <SortIcon w='24px' h='24px' />
                                                    </HStack>
                                                </Th>
                                                <Th
                                                    w='15%'
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{`สถานะ`}</Text>
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                courses.map((course, index) => (
                                                    <Tr
                                                        key={index}
                                                    >
                                                        <Td
                                                            w='40%'
                                                        >
                                                            <HStack
                                                                w='100%'
                                                                align='center'
                                                                justify='start'
                                                            >
                                                                <Checkbox
                                                                    mr='0.5rem'
                                                                    isChecked={selected.includes(course)}
                                                                    onChange={() => {
                                                                        if (selected.includes(course)) {
                                                                            return setSelected(selected.filter(c => c !== course))
                                                                        }

                                                                        setSelected(prev => [...prev, course])
                                                                    }}
                                                                />
                                                                <Text fontSize='18px' fontWeight='600' textColor='#2E2E2E' >{course.courseName}</Text>
                                                            </HStack>
                                                        </Td>
                                                        <Td
                                                            w='15%'
                                                            textAlign='center'
                                                        >
                                                            <Text fontSize='18px' fontWeight='400' textColor='#4091F4' >{course.courseId}</Text>
                                                        </Td>
                                                        <Td
                                                            w='25%'
                                                            textAlign='center'
                                                        >
                                                            <Text fontSize='18px' fontWeight='400' textColor='#4091F4' >{course.days}</Text>
                                                        </Td>
                                                        <Td
                                                            w='15%'
                                                            textAlign='center'
                                                        >
                                                            <Text fontSize='18px' fontWeight='400' textColor='#4091F4' >{course.price}</Text>
                                                        </Td>
                                                        <Td
                                                            w='10%'
                                                        >
                                                            {renderStatus(course)}
                                                        </Td>
                                                    </Tr>
                                                ))
                                            }
                                        </Tbody>
                                    </Table>
                                </Stack>
                                <HStack
                                    mt='100px'
                                    mb='3rem'
                                    align='center'
                                    justify='space-between'
                                    w='100%'
                                    px='2.5rem'
                                >
                                    <Button
                                        w='250px'
                                        h='50px'
                                        variant='outline'
                                        border='1px'
                                        borderColor='#E9EAF0'
                                        bg='#FFFFFF'
                                        fontSize='18px'
                                        textColor='#717579'
                                        onClick={() => onClose()}
                                    >
                                        {`ย้อนกลับ`}
                                    </Button>
                                    <Button
                                        w='250px'
                                        h='50px'
                                        fontSize='18px'
                                        bg='exBlue'
                                        color='white'
                                        onClick={() => {
                                            if (selected.length === 0) {
                                                return toast({
                                                    title: 'เกิดข้อผิดพลาด',
                                                    description: 'กรุณาเลือกหลักสูตร',
                                                    status: 'error',
                                                    duration: 5000,
                                                    isClosable: true,
                                                })
                                            }

                                            handleSaveBundle()
                                        }}
                                    >
                                        {`บันทึก`}
                                    </Button>
                                </HStack>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Stack>
        </Stack>
    )
}