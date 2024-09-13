'use client'

import { TRegisterInhouseTable, TRegisterPublic } from "@/app/register/interfaces/RegisterInterface"
import { getAllUserRegisterPublicData, deleteRegisterPublic, deleteRegisterInhouse, getAllUserRegisterInhouseData, getRegisterInhouseWithFilter } from "@/libs/AdminAPI"
import { ArrowForwardIcon, ArrowUpDownIcon, CalendarIcon, DeleteIcon, DragHandleIcon, ViewIcon } from "@chakra-ui/icons"
import { Button, Divider, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { renderTableStatus } from "./DashboardTablePublic"
import moment from "moment"
import { AdminPagination } from "../AdminPagination"

export const DashboardTableInhouse = () => {

    const [tableData, setTableData] = useState<TRegisterInhouseTable[]>([])
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
    const oldQuery: any ={}
    queryParams.forEach((value, key) => {
        oldQuery[key] = value
    })

    const isViewDetail = queryParams.has('detail')

    useEffect(() => {
        if (filter.endDate || filter.startDate) {
            getRegisterInhouseWithFilter(filter, (data: { result: TRegisterInhouseTable[], count: number }, error: unknown) => {

                if (error) console.log(error)
                if (data) {
                    if(data.result) {
                        setTableData(data.result)
                        setTableCount(data.count)
                    }
                }
            }, search, page, 10)
        } else {
            getAllUserRegisterInhouseData((data: { result: TRegisterInhouseTable[], count: number }, error: unknown) => {
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
        if (queryParams.get('page')){
            setPage(Number(queryParams.get('page')))
        } else {
            setPage(1)
        }
    }, [queryParams.get('page')])

    const handleSearch = async () => {
        if (search) {
            await getRegisterInhouseWithFilter(filter, (data: { result: TRegisterInhouseTable[], count: number }, error: unknown) => {
                if (error) console.log(error)
                if (data) {
                    if (data.result) {
                        setTableData(data.result)
                        setTableCount(data.count)
                    }
                }
            }, search)
        }
    }

    const handleDeleteRegisterInhouse = async (id: string) => {
        await deleteRegisterInhouse(id as string, (data: TRegisterPublic, error: unknown) => {
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
                    ข้อมูลผู้ลงทะเบียนหลักสูตร Inhouse
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
                                    textAlign="center"
                                >
                                    <Text as="b">{`บริษัท`}</Text>
                                </Th>
                                <Th
                                    textAlign="center"
                                >
                                    <Text as="b">{`อีเมล`}</Text>
                                </Th>
                                <Th
                                    textAlign="center"
                                >
                                    <Text as="b">{`หลักสูตร`}</Text>
                                </Th>
                                <Th
                                    textAlign="center"
                                >
                                    <Text as="b">{`วันที่แจ้ง`}</Text>
                                </Th>
                                <Th
                                    textAlign="center"
                                >
                                    <Text as="b">{`เบอร์ติดต่อ`}</Text>
                                </Th>
                                <Th
                                    textAlign="center"
                                >
                                    <Text as="b">{`จำนวน`}</Text>
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
                            {tableData && tableData.map((dataItem, index) => {

                                return (
                                    <Tr key={index}>
                                        <Td >
                                            <Text>{(index + 1 + (page - 1) * 10)}</Text>
                                        </Td>
                                        <Td >
                                            <Text>{dataItem.firstName} {dataItem.lastName}</Text>
                                        </Td>
                                        <Td >
                                            <Text>{dataItem.companyName}</Text>
                                        </Td>
                                        <Td >
                                            <Text>{dataItem.companyEmail}</Text>
                                        </Td>
                                        <Td >
                                            <Text textAlign='center'>{dataItem.course?.courseName ? dataItem.course?.courseName : 'ไม่มีคลาส'}</Text>
                                        </Td>
                                        <Td >
                                            <Text>{moment(dataItem.createAt).format("DD MMM YYYY - HH:mm")}</Text>
                                        </Td>
                                        <Td >
                                            <Text>
                                                {dataItem.telephone}
                                            </Text>
                                        </Td>
                                        <Td >
                                            <Text>{dataItem.numberPerson.toString()}</Text>
                                        </Td>
                                        <Td  textAlign="center">
                                            {renderTableStatus(dataItem.status as string)}
                                        </Td>
                                        <Td  textAlign="center">
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
                                                    <Link href={{  query: {...oldQuery, detail: dataItem._id} }}>
                                                        <MenuItem
                                                            icon={<ViewIcon />}
                                                        >
                                                            ดูรายละเอียด
                                                        </MenuItem>
                                                    </Link>
                                                    <MenuItem
                                                        color='red.300'
                                                        icon={<DeleteIcon color='red.300' />}
                                                        onClick={() => handleDeleteRegisterInhouse(dataItem._id as string)}
                                                    >
                                                        ลบ
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr>
                                );
                            }
                            
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
                    url={`/admin?tab=dashboard&sub=inhouse&page=`}
                />
            </Stack>
        </Stack>
    );

}