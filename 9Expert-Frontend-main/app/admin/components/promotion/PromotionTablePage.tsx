'use client'

import { FilterIcon, SortIcon } from "@/app/icons/AdminIcon"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Container, HStack, Heading, Button, IconButton, VStack, Input, TableContainer, Table, Thead, Tr, Th, Checkbox, Tbody, Text, Stack, Td, useToast, Center } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { adminDeleteMultiplePromotion, adminDeletePromotion, adminGetAllPromotion } from "@/libs/AdminAPI"
import { useSearchParams } from "next/navigation"
import { AdminPagination } from "../AdminPagination"
import { allValuesExist } from "@/libs/ArrayManage"
import { TPromotion } from "../../interface/PromotionInterface"
import moment from "moment"
import { useDebounce } from "@/utils/useDebounce"

const renderStatus = (promotion: TPromotion) => {

    if (moment().isAfter(promotion.expireAt)) {
        return (
            <Center
                w='145px'
                h='45px'
                bg='#C4C4C4'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#23262A' >{`หมดอายุ`}</Text>
            </Center>
        )
    } else if (promotion.status.toLowerCase() === 'active') {
        return (
            <Center
                w='145px'
                h='45px'
                bg='#D4F0B066'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#2BAC47' >{`กำลังใช้งาน`}</Text>
            </Center>
        )
    } else if (promotion.status.toLowerCase() === 'inactive') {
        return (
            <Center
                w='145px'
                h='45px'
                bg='#F65A5A33'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#F65A5A' >{`ไม่เปิดใช้งาน`}</Text>
            </Center>
        )
    } else if (promotion.status.toLowerCase() === 'expired') {
        return (
            <Center
                w='145px'
                h='45px'
                bg='#C4C4C4'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#23262A' >{`หมดอายุ`}</Text>
            </Center>
        )
    } else {
        return (
            <Center
                w='145px'
                h='45px'
                bg='#D4F0B066'
                borderRadius='45px'
            >
                <Text fontSize='md' fontWeight='400' textColor='#2BAC47' >{`กำลังใช้งาน`}</Text>
            </Center>
        )
    }

}


export const PromotionTablePage = () => {

    const page = useSearchParams().get('page')
    const toast = useToast()

    const [promotions, setPromotions] = useState<TPromotion[]>([])
    const [count, setCount] = useState(0)
    const [selected, setSelected] = useState<string[]>([])
    const [update, setUpdate] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const debounceSearch = useDebounce(search, 1000)

    useEffect(() => {
        adminGetAllPromotion(page as string, (data: { result: TPromotion[], count: number }, error: unknown) => {
            if (error) console.log(error)

            setPromotions(data.result)
            setCount(data.count)
        }, search)
    }, [page, update, debounceSearch])

    const deletePromotion = async (id: string) => {
        await adminDeletePromotion(id, (item: TPromotion, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบโปรโมชั่นไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setUpdate(!update)
            toast({
                title: 'ลบโปรโมชั่นสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setSelected([])
        })
    }

    const deleteMultiPromotion = async (id: string[]) => {
        await adminDeleteMultiplePromotion(id, (item: TPromotion, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: `ลบ ${id.length} โปรโมชั่นไม่สําเร็จ`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setUpdate(!update)
            toast({
                title: `ลบ ${id.length} โปรโมชั่นสําเร็จ`,
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
                        <Heading fontSize='1.5rem'>{`โปรโมชั่นหลักสูตร`}</Heading>
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
                                href='/admin?tab=promotion&sub=promotion&action=create'
                                color='white'
                                bg='exBlue'
                                _hover={{
                                    bg: 'exBlue'
                                }}
                                _active={{
                                    bg: 'exBlue'
                                }}
                            >
                                {`สร้างโปรโมชั่น`}
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
                                id='search' w={{ base: '10rem', lg: '20rem' }}
                                borderColor='#817F7F'
                                placeholder='ค้นหา...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {
                                selected.length > 0 &&
                                <HStack
                                    spacing='1rem'
                                >
                                    <Text fontSize='sm' textColor='exGray.300' >{`เลือก ${selected.length} โปรโมชั่น`}</Text>
                                    <Button
                                        display={{ base: 'none', lg: 'block' }}
                                        variant='outline'
                                        colorScheme="red"
                                        size='sm'
                                        onClick={() => deleteMultiPromotion(selected)}
                                    >{`ลบหลักสูตร`}</Button>
                                    <IconButton
                                        display={{ base: 'block', lg: 'none' }}
                                        variant='ghost'
                                        colorScheme="red"
                                        size='sm'
                                        aria-label="Delete"
                                        icon={<DeleteIcon w='20px' h='20px' />}
                                        onClick={() => deleteMultiPromotion(selected)}
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
                                                    isChecked={allValuesExist(promotions.map(p => p._id as string), selected)}
                                                    onChange={() => {
                                                        if (selected.length > 0) {
                                                            return setSelected([])
                                                        }

                                                        setSelected(promotions.map(c => c._id as string))
                                                    }}
                                                />
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ชื่อโปรโมชั่น`}</Text>
                                            </HStack>
                                        </Th>
                                        <Th
                                            display={{ base: 'none', lg: 'table-cell' }}
                                            w='10%'
                                            textAlign='center'
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ส่วนลด`}</Text>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`วันเริ่ม`}</Text>
                                                <SortIcon w='24px' h='24px' />
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <HStack justify='center'>
                                                <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`วันสิ้นสุด`}</Text>
                                                <SortIcon w='24px' h='24px' />
                                            </HStack>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`สถานะ`}</Text>
                                        </Th>
                                        <Th
                                            w='10%'
                                            textAlign='center'
                                        >
                                            <Text fontSize='md' fontWeight='600' textColor='#2E2E2E' >{`ตั้งค่า`}</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        promotions.map((promotion: TPromotion, index: number) => (
                                            <Tr key={index}>
                                                <Td
                                                    w={{ base: '50%', lg: '25%' }}
                                                >
                                                    <HStack>
                                                        <Checkbox
                                                            mr='0.5rem'
                                                            isChecked={selected.includes(promotion._id as string)}
                                                            onChange={() => {
                                                                if (selected.includes(promotion._id as string)) {
                                                                    return setSelected(selected.filter(c => c !== promotion._id as string))
                                                                }

                                                                setSelected(prev => [...prev, promotion._id as string])
                                                            }}
                                                        />
                                                        <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{promotion.name}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{promotion.type.toLowerCase() === 'percentage' ? `${promotion.value}%` : `฿${promotion.value}`}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{promotion.startAt ? moment(promotion.startAt).format('DD/MM/YYYY') : ''}</Text>
                                                </Td>
                                                <Td
                                                    w='10%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md' fontWeight='400' textColor='#2E2E2E' >{promotion.expireAt ? moment(promotion.expireAt).format('DD/MM/YYYY') : ''}</Text>
                                                </Td>
                                                <Td
                                                    w='10%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    {renderStatus(promotion)}
                                                </Td>
                                                <Td
                                                    w='10%'
                                                    textAlign='center'
                                                >
                                                    <HStack
                                                        w='100%'
                                                        justify='end'
                                                        align='center'
                                                    >
                                                        <IconButton
                                                            as={Link}
                                                            href={`/admin?tab=promotion&sub=promotion&action=edit&id=${promotion._id}`}
                                                            aria-label="Edit"
                                                            colorScheme='purple'
                                                            size='sm'
                                                            icon={<EditIcon w='18px' h='18px' />}
                                                            variant='ghost'
                                                            _hover={{ bg: 'transparent' }}
                                                            _active={{ bg: 'transparent' }}
                                                        />
                                                        <IconButton
                                                            aria-label="Delete"
                                                            colorScheme='red'
                                                            size='sm'
                                                            icon={<DeleteIcon w='18px' h='18px' />}
                                                            variant='ghost'
                                                            onClick={() => deletePromotion(promotion._id as string)}
                                                            _hover={{ bg: 'transparent' }}
                                                            _active={{ bg: 'transparent' }}
                                                        />
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
                    url={`/admin?tab=promotion&sub=pm&page=`}
                    length={promotions.length}
                />
            </Stack>
        </>
    )
}