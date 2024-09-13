'use client'

import { TRegisterPublic, TRegisterPublicTable } from "@/app/register/interfaces/RegisterInterface"
import { deleteRegisterPublic, getAllUserRegisterPublicData, getRegisterPublicWithFilter } from "@/libs/AdminAPI"
import { ArrowForwardIcon, ArrowUpDownIcon, CalendarIcon, ChevronDownIcon, DeleteIcon, DragHandleIcon, ViewIcon } from "@chakra-ui/icons"
import { Button, Divider, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import moment from "moment"
import Link from "next/link"

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { AdminPagination } from "../AdminPagination"

type TDashboardCard = {
    title: string,
    number: number | string,
    icon?: JSX.Element
}

export const renderTableStatus = (status: string) => {
    if (status == "Pending") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' bg='#F8F1A5' color="#7D8006">รอการยืนยัน</Text>;
    } else if (status == "Approved") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' bg='#D4F0B0' color="#2BAC47">ยืนยัน</Text>;
    } else if (status == "Cancelled") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' bg='#F4D8DD' color="#F65A5A">ยกเลิก</Text>;
    } else {
        return <Text px='1rem' py='0.5rem' rounded='2xl' bg='#F8F1A5' color="#7D8006">รอการยืนยัน</Text>;
    }
}

export const renderClassType = (classType: string) => {
    if (classType == "Classroom") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' >{classType}</Text>;
    } else if (classType == "Hybrid") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' color="#535FE8">{classType}</Text>;
    } else if (classType == "Live") {
        return <Text px='1rem' py='0.5rem' rounded='2xl' color="#E85353">{classType}</Text>;
    } else {
        return <Text px='1rem' py='0.5rem' rounded='2xl' >{classType}</Text>;
    }
}

export const DashboardTablePublic = () => {

    const [tableData, setTableData] = useState<TRegisterPublicTable[]>([])
    const [update, setUpdate] = useState(false)
    const [filter, setFilter] = useState({
        startDate: '',
        endDate: '',
    })
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [tableCount, setTableCount] = useState(0)

    const toast = useToast()
    
    const pathname = usePathname()
    const queryParams = useSearchParams()
    const oldQuery: any = {}
    queryParams.forEach((value, key) => {
        oldQuery[key] = value
    })

    const isViewDetail = queryParams.has('detail')

    useEffect(() => {
        if(filter.endDate || filter.startDate) {
            getRegisterPublicWithFilter(filter, (data: { result: TRegisterPublicTable[], count: number }, error: unknown) => {
                if (error) console.log(error)
                if (data) {
                    if(data.result) {
                        setTableData(data.result)
                        setTableCount(data.count)
                    }
                }
            }, search, page, 10)
        } else {
            getAllUserRegisterPublicData((data: { result: TRegisterPublicTable[], count: number }, error: unknown) => {
                if (error) console.log(error)
                if (data) {
                    if(data.result) {
                        setTableData(data.result)
                        setTableCount(data.count)
                    }
                }
            }, page, 10)
        }
    }, [update, filter.endDate, filter.startDate, page])

    useEffect(() => {
        if (queryParams.get('page')) {
            setPage(Number(queryParams.get('page')))
        } else {
            setPage(1)
        }
    }, [queryParams.get('page')])

    const handleSearch = async () => {
        if (search) {
            await getRegisterPublicWithFilter(filter, (data: { result: TRegisterPublicTable[], count: number }, error: unknown) => {
                console.log(data)
                if (error) console.log(error)
                if (data) {
                    if(data.result) {
                        setTableData(data.result)
                        setTableCount(data.count)
                    }
                }
            }, search)
        }
    }

    const handleDeleteRegisterPublic = async (id: string) => {
        await deleteRegisterPublic(id as string, (data: TRegisterPublic, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'ลบข้อมูลไม่สำเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            
            toast({
                title: 'ลบข้อมูลสำเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setUpdate(!update)
        })
    }

    return (
        <Stack w="100%" align="center" justify="space-between">
            {/* export */}
            <Stack justify="space-between" direction="row" w="100%">
                <Text fontWeight="semibold" fontSize="24px">
                    ข้อมูลผู้ลงทะเบียนหลักสูตร Public
                </Text>
            </Stack>

            <Divider />

            {/* search */}
            <Stack justify="space-between" direction="row" w="100%">
                <Stack direction='row' justify='start'>
                    <Input
                        placeholder="ค้นหา... ชื่อผู้สมัคร ,คลาส"
                        maxW="500px"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button colorScheme='blue' onClick={handleSearch} >ค้นหา</Button>
                </Stack>
                <Stack direction="row" spacing="1rem" alignItems="center">
                    <Text>ช่วงเวลา :</Text>
                    <Text fontSize="md">{moment(filter.startDate || new Date()).format('DD MMM YYYY')}</Text>
                    <ArrowForwardIcon color="exBlue" />
                    <Text fontSize="md">{moment(filter.endDate || new Date()).format('DD MMM YYYY')}</Text>
                    <Popover>
                        <PopoverTrigger>
                            <Button colorScheme="gray">
                                <CalendarIcon />
                                <Text paddingLeft="10px">Filter</Text>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            bg="white"
                            color="#616161"
                            mr={30}
                            w="max-content"
                        >
                            <PopoverHeader fontWeight="semibold">
                                ช่วงเวลา : เริ่ม
                                <ArrowForwardIcon color="exBlue" />
                                สิ้นสุด
                            </PopoverHeader>
                            <PopoverArrow bg="white" />
                            <PopoverBody>
                                <Stack direction="row" w="max-content">
                                    {/* TODO: validate date */}
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        type="date"
                                        onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        type="date"
                                        onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
                                    />
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Stack>
            </Stack>

            {/* table */}
            <Stack w="100%" align="center" justify="space-between">
                <TableContainer w="100%" px={{ base: "0", lg: "0.5rem" }}>
                    <Table w="100%">
                        <Thead>
                            <Tr>
                                <Th w="25%">
                                    <Text as="b">{`ลำดับ`}</Text>
                                </Th>
                                <Th w="25%" textAlign="start">
                                    <Text as="b">{`ชื่อ - สกุล`}</Text>
                                </Th>
                                <Th
                                    // w="10%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`อีเมล`}</Text>
                                </Th>
                                <Th
                                    // w="15%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`คลาส`}</Text>
                                </Th>
                                <Th
                                    // w="15%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`วันที่ลงทะเบียน`}</Text>
                                </Th>
                                <Th
                                    // w="15%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`จำนวน`}</Text>
                                </Th>
                                <Th
                                    // w="15%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`รูปแบบ`} <ChevronDownIcon w="12px" h="12px" /></Text>
                                </Th>
                                <Th
                                    // w="15%"
                                    textAlign="center"
                                >
                                    <Text as="b">{`สถานะ`}</Text>
                                </Th>
                                <Th textAlign="center"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tableData && tableData.map((dataItem, index) => (
                                <Tr key={index}>
                                    <Td >
                                        <Text>{index + 1}</Text>
                                    </Td>
                                    <Td >
                                        <Text>{dataItem.firstName} {dataItem.lastName}</Text>
                                    </Td>
                                    <Td >
                                        <Text>{dataItem.email}</Text>
                                    </Td>
                                    <Td >
                                        <Text textAlign='center'>{dataItem.course?.courseName ? dataItem.course?.courseName : 'ไม่มีคลาส'}</Text>
                                    </Td>
                                    <Td >
                                        <Text>{moment(dataItem.createAt).format("DD MMM YYYY - HH:mm")}</Text>
                                    </Td>
                                    <Td >
                                        <Text>
                                            {dataItem.numberPerson.toString()}
                                        </Text>
                                    </Td>
                                    <Td >{renderClassType(dataItem.classDetail?.classType as string)}</Td>
                                    <Td textAlign="center">
                                        {renderTableStatus(dataItem.status)}
                                    </Td>
                                    <Td textAlign="center">
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Options"
                                                // border="unset"
                                                icon={
                                                    <DragHandleIcon />
                                                }
                                                variant="unset"
                                            />
                                            <MenuList>
                                                {/* <Link href={{ pathname, query: newQuery }}> */}
                                                <Link href={{ query: { ...oldQuery, detail: dataItem._id } }}>
                                                    <MenuItem
                                                        icon={<ViewIcon />}
                                                    >
                                                        ดูรายละเอียด
                                                    </MenuItem>
                                                </Link>
                                                <MenuItem
                                                    color='red.300'
                                                    icon={<DeleteIcon color='red.300' />}
                                                    onClick={() => handleDeleteRegisterPublic(dataItem._id as string)}
                                                >
                                                    ลบ
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            )

                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                {
                    !tableData || tableData.length === 0 &&
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        my='2rem'
                    >
                        <Text fontSize='lg'>ไม่พบข้อมูลผู้ลงทะเบียนในวันนี้</Text>
                    </Stack>
                }
                {/* header */}
                {/* content */}
                <AdminPagination
                    page={page}
                    count={tableCount}
                    itemsPerPage={10}
                    length={tableData.length}
                    url={`/admin?tab=dashboard&sub=public&page=`}
                />
            </Stack>
        </Stack>
    );
}