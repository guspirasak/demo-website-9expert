'use client'

import { AdminVerticalMenuIcon, FilterIcon, SortIcon } from "@/app/icons/AdminIcon"
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Container, HStack, Heading, Button, IconButton, VStack, Input, TableContainer, Table, Thead, Tr, Th, Checkbox, Tbody, Text, Stack, Td, Center, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TCourseTable } from "../../interface/CreateCourseInterface"
import { adminDeleteCourse, adminDeleteMultipleCourse, getAllOfflineCourseTable } from "@/libs/AdminAPI"
import { useSearchParams } from "next/navigation"
import { AdminPagination } from "../AdminPagination"
import { allValuesExist } from "@/libs/ArrayManage"
import commaNumber from "comma-number"
import { useDebounce } from "@/utils/useDebounce"

export const OfflineCoursePage = () => {

    const page = useSearchParams().get('page')
    const toast = useToast()

    const [courses, setCourses] = useState<TCourseTable[]>([])
    const [count, setCount] = useState(0)
    const [selected, setSelected] = useState<string[]>([])
    const [update, setUpdate] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<{price: string, amount: string}>({
        price: '',
        amount: ''
    })

    const debounceSearch = useDebounce(search, 1000)

    useEffect(() => {
        getAllOfflineCourseTable(page as string, (data: { result: TCourseTable[], count: number }, error: unknown) => {
            if (error) console.log(error)

            setCourses(data.result)
            setCount(data.count)
        }, search, sort)
    }, [page, update, debounceSearch, sort])

    const deleteCourse = async (id: string) => {
        await adminDeleteCourse(id, (item: TCourseTable, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบหลักสูตรไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            
            setUpdate(!update)
            toast({
                title: 'ลบหลักสูตรสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setSelected([])
        })
    }

    const deleteMultiCourse = async (id: string[]) => {
        await adminDeleteMultipleCourse(id, (item: TCourseTable, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: `ลบ ${id.length} หลักสูตรไม่สําเร็จ`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setUpdate(!update)
            toast({
                title: `ลบ ${id.length} หลักสูตรสําเร็จ`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setSelected([])
        })
    }

    return (
        <>
            <Stack
                w='100%'
                h='100%'
            >
                <Container
                    mt='2rem'
                    p='0'
                    maxW='95%'
                    bg='white'
                    h='max-content'
                    borderRadius='20px'
                >
                    <HStack
                        borderBottom='1px'
                        borderColor='exGray.100'
                        w='100%'
                        // h='130px'
                        py='1.688rem'
                        align='center'
                        justify='space-between'
                        px={{ base: '1.5rem', lg: '3rem' }}
                        m='0'
                    >
                        <Heading fontSize='1.5rem'>{`หลักสูตรธรรมดา`}</Heading>
                        <HStack>
                            {/* <Button
                                display={{ base: 'none', lg: 'block' }}
                                color='exGray.300'
                                leftIcon={<FilterIcon w='20px' h='20px' />}
                                variant='ghost'
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            >
                                {`Filter`}
                            </Button>
                            <IconButton
                                display={{ base: 'block', lg: 'none' }}
                                color='exGray.300'
                                aria-label="Filter"
                                icon={<FilterIcon w='20px' h='20px' />}
                                variant='ghost'
                                _hover={{
                                    bg: 'transparent'
                                }}
                                _active={{
                                    bg: 'transparent'
                                }}
                            /> */}
                            <Button
                                as={Link}
                                href='/admin?tab=normal-course&action=create'
                                color='white'
                                bg='exBlue'
                                _hover={{
                                    bg: 'exBlue'
                                }}
                                _active={{
                                    bg: 'exBlue'
                                }}
                            >
                                {`สร้างหลักสูตร`}
                            </Button>
                        </HStack>
                    </HStack>
                    <VStack
                        p='1rem'
                    >
                        <HStack
                            align='center'
                            justify='space-between'
                            w='100%'
                            h='100px'
                            px={{ base: '0.75rem', lg: '2rem' }}
                            py='0'
                        >
                            <Input
                                id='search' 
                                w={{ base: '10rem', lg: '20rem' }}
                                borderColor='#817F7F'
                                placeholder='ค้นหา...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {
                                selected.length > 0 &&
                                <HStack
                                    spacing='1rem'
                                >
                                    <Text fontSize='sm' textColor='exGray.300' >{`เลือก ${selected.length} หลักสูตร`}</Text>
                                    <Button
                                        display={{ base: 'none', lg: 'block' }}
                                        variant='outline'
                                        colorScheme="red"
                                        size='sm'
                                        onClick={() => deleteMultiCourse(selected)}
                                    >{`ลบหลักสูตร`}</Button>
                                    <IconButton
                                        display={{ base: 'block', lg: 'none' }}
                                        variant='ghost'
                                        colorScheme="red"
                                        size='sm'
                                        aria-label="Delete"
                                        icon={<DeleteIcon w='20px' h='20px' />}
                                        onClick={() => deleteMultiCourse(selected)}
                                    />
                                </HStack>
                            }
                        </HStack>
                        <TableContainer
                            w='100%'
                            px={{ base: '0', lg: '0.5rem' }}
                        >
                            <Table
                                w='100%'
                            >
                                <Thead>
                                    <Tr>
                                        <Th w={{ base: '50%', lg: '25%' }} >
                                            <HStack>
                                                <Checkbox 
                                                    mr='0.5rem'
                                                    isChecked={allValuesExist(courses.map(c => c._id as string), selected)}
                                                    onChange={() => {
                                                        if (selected.length > 0) {
                                                            return setSelected([])
                                                        }

                                                        setSelected(courses.map(c => c._id as string))
                                                    }}
                                                />
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ชื่อหลักสูตร`}</Text>
                                            </HStack>
                                        </Th>
                                        <Th
                                            display={{ base: 'none', lg: 'table-cell' }}
                                            w='15%'
                                            textAlign='center'
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`รหัสหลักสูตร`}</Text>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`จำนวนวันอบรม`}</Text>
                                                {
                                                    sort.amount === '' && (
                                                        <SortIcon
                                                            w='24px'
                                                            h='24px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: 'asc', price: '' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.amount === 'asc' && (
                                                        <ArrowDownIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: 'desc', price: '' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.amount === 'desc' && (
                                                        <ArrowUpIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: '', price: '' })}
                                                        />
                                                    )
                                                }
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ราคา`}</Text>
                                                {
                                                    sort.price === '' && (
                                                        <SortIcon
                                                            w='24px'
                                                            h='24px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: '', price: 'asc' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.price === 'asc' && (
                                                        <ArrowDownIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: '', price: 'desc' })}
                                                        />
                                                    )
                                                }
                                                {
                                                    sort.price === 'desc' && (
                                                        <ArrowUpIcon
                                                            w='16px'
                                                            h='16px'
                                                            cursor='pointer'
                                                            onClick={() => setSort({ amount: '', price: '' })}
                                                        />
                                                    )
                                                }
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`สถานะ`}</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        courses.map((course: TCourseTable, index: number) => (
                                            <Tr key={index}>
                                                <Td
                                                    w={{ base: '50%', lg: '25%' }}
                                                    whiteSpace='normal'
                                                >
                                                    <HStack>
                                                        <Checkbox 
                                                            mr='0.5rem'
                                                            isChecked={selected.includes(course._id as string)}
                                                            onChange={() => {
                                                                if (selected.includes(course._id as string)) {
                                                                    return setSelected(selected.filter(c => c !== course._id as string))
                                                                }

                                                                setSelected(prev => [...prev, course._id as string])
                                                            }}
                                                        />
                                                        <Link
                                                            href={`/admin?tab=normal-course&action=edit&course=${course._id}`}
                                                        >
                                                            <Text
                                                                noOfLines={1}
                                                                fontSize="md"
                                                                fontWeight="400"
                                                                textColor="#2E2E2E"
                                                            >
                                                                {
                                                                    course.courseName
                                                                }{" "}
                                                            </Text>
                                                        </Link>
                                                    </HStack>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{course.courseId}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{course.days}</Text>
                                                </Td>
                                                <Td
                                                    w='10%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{commaNumber(course.price)}</Text>
                                                </Td>
                                                <Td
                                                    w='10%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <HStack
                                                        w='100%'
                                                        justify='center'
                                                    >
                                                        {
                                                            course.courseStatus.toLowerCase() === 'active' ? 
                                                                (
                                                                    <Center
                                                                        w='150px'
                                                                        h='50px'
                                                                        bg='#D4F0B066'
                                                                        borderRadius='45px'
                                                                    >
                                                                        <Text fontSize='md' fontWeight='400' textColor='#2BAC47' >{`กำลังใช้งาน`}</Text>
                                                                    </Center>
                                                                )
                                                                :
                                                                (
                                                                    <Center
                                                                        w='150px'
                                                                        h='50px'
                                                                        bg='#F65A5A33'
                                                                        borderRadius='45px'
                                                                    >
                                                                        <Text fontSize='md' fontWeight='400' textColor='#F65A5A' >{`ไม่เปิดใช้งาน`}</Text>
                                                                    </Center>
                                                                )
                                                        }
                                                        <Menu
                                                            closeOnSelect={true}
                                                        >
                                                            <MenuButton
                                                                aria-label="options"
                                                                as={IconButton}
                                                                icon={<AdminVerticalMenuIcon w='30px' h='30px' />}
                                                                variant='ghost'
                                                            />
                                                            <MenuList>
                                                                <MenuItem
                                                                    as={Link}
                                                                    icon={<EditIcon w='16px' h='16px' />}
                                                                    href={`/admin?tab=normal-course&action=edit&course=${course._id}`}
                                                                >
                                                                    {`แก้ไข`}
                                                                </MenuItem>
                                                                <MenuItem
                                                                    icon={<DeleteIcon w='16px' h='16px' />}
                                                                    color='#F65A5A'
                                                                    onClick={() => deleteCourse(course._id as string)}
                                                                >
                                                                    {`ลบ`}
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </Container>
                <AdminPagination 
                    page={Number(page)}
                    count={count}
                    url={`/admin?tab=normal-course&page=`}
                    length={courses.length}
                />
            </Stack>
        </>
    )
}