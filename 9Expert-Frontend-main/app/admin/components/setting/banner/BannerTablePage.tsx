'use client'

import { TBanner } from "@/app/admin/interface/CreateBanner"
import { AdminVerticalMenuIcon, FilterIcon, SortIcon } from "@/app/icons/AdminIcon"
import { deleteBanner, getAllBanner, updateBanner } from "@/libs/AdminAPI"
import { AddIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Checkbox, Container, Heading, HStack, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminPagination } from "../../AdminPagination"

export const BannerTablePage = () => {

    const [banner, setBanner] = useState<TBanner[]>([])
    const [count, setCount] = useState(0)
    const [update, setUpdate] = useState(false)
    const [sort, setSort] = useState('')

    const page = useSearchParams().get('page')

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {

        getAllBanner(page as string, sort, (data: { result: TBanner[], count: number }, error: unknown) => {
            if (error) {
                console.log(error)
                return
            }
            setBanner(data.result)
            setCount(data.count)
        })
    }, [page, update, sort])

    const handleActiveBanner = async (id: string, form: TBanner) => {
        console.log('form.isActive: ', form.isActive);
        const isSnakeBarGreen = !form.isActive;
        
        await updateBanner(id, { ...form, isActive: !form.isActive }, (item: TBanner, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'Active Banner Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            if (isSnakeBarGreen) {
                toast({
                    title: 'Active Banner Success',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            } else {
                toast({
                    title: 'Disabled Banner Success',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            getAllBanner(page as string, sort, (data: { result: TBanner[], count: number }, error: unknown) => {
                if (error) {
                    console.log(error)
                    return
                }
                setBanner(data.result)
                setCount(data.count)
            })
        })
    }

    const handleDeleteBanner = async (id: string) => {
        await deleteBanner(id, (item: TBanner, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'Delete Banner Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: 'Delete Banner Success',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    return (
        <>
            <Container
                maxW='95%'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                    mt='30px'
                    spacing='34px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='space-between'
                        direction='row'
                    >
                        <Heading
                            fontSize='1.5rem'
                            fontWeight='600'
                        >
                            {`จัดการส่วนแบนเนอร์`}
                        </Heading>
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
                                href='/admin?tab=setting&sub=banner&action=create'
                                leftIcon={<AddIcon w='14px' h='14px' color='white' />}
                                color='white'
                                bg='exBlue'
                                _hover={{
                                    bg: 'exBlue'
                                }}
                                _active={{
                                    bg: 'exBlue'
                                }}
                            >
                                {`เพิ่มแบนเบอร์`}
                            </Button>
                        </HStack>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        bg='white'
                        borderRadius='20px'
                    >
                        <Table
                            w='100%'
                        >
                            <Thead
                                w='100%'
                                h='80px'
                                bg='#C5DCFA80'
                            >
                                <Tr>
                                    <Th
                                        w='10%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            w='100%'
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ID`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='30%'
                                    >
                                        <HStack
                                            spacing='15px'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ชื่อแบนเนอร์`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='20%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            w='100%'
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`หน้าเพจ`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='15%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            w='100%'
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`วันที่สร้าง`}
                                            </Text>
                                            {
                                                sort === '' && (
                                                    <SortIcon
                                                        w='24px'
                                                        h='24px'
                                                        cursor='pointer'
                                                        onClick={() => setSort('asc')}
                                                    />
                                                )
                                            }
                                            {
                                                sort === 'asc' && (
                                                    <ArrowDownIcon
                                                        w='16px'
                                                        h='16px'
                                                        cursor='pointer'
                                                        onClick={() => setSort('desc')}
                                                    />
                                                )
                                            }
                                            {
                                                sort === 'desc' && (
                                                    <ArrowUpIcon
                                                        w='16px'
                                                        h='16px'
                                                        cursor='pointer'
                                                        onClick={() => setSort('')}
                                                    />
                                                )
                                            }
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='15%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`สถานะ`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='10%'
                                    >

                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    banner.map((b, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
                                                w='10%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                    w='100%'
                                                    justify='center'
                                                >
                                                    <Text
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {`${(index + 1) + ((Number(page || 1) - 1) * 5)}.`}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='30%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                >
                                                    {
                                                        b.type === 'image' && (
                                                            <Image
                                                                alt="Banner Image"
                                                                w='120px'
                                                                h='64px'
                                                                borderRadius='5px'
                                                                src={b.url}
                                                            />
                                                        )
                                                    }
                                                    {
                                                        b.type === 'video' && (
                                                            <Box
                                                                as='iframe'
                                                                w='120px'
                                                                h='64px'
                                                                bg='gray'
                                                                borderRadius='5px'
                                                                src={`${b.url}?showinfo=0&controls=0&autohide=1`}
                                                                title="YouTube video player"
                                                                frameBorder="0"
                                                                allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowFullScreen
                                                            >
                                                            </Box>
                                                        )
                                                    }
                                                    <Text
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                        noOfLines={2}
                                                    >
                                                        {b.name}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='20%'
                                                textAlign='center'
                                            >
                                                <Text
                                                    fontSize='md'
                                                    fontWeight='600'
                                                    textColor='#2E2E2E'
                                                >
                                                    {b.page}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='15%'
                                                textAlign='center'
                                            >
                                                <Text
                                                    fontSize='md'
                                                    fontWeight='600'
                                                    textColor='#2E2E2E'
                                                >
                                                    {moment(b.createAt).format('DD/MM/YYYY')}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='15%'
                                            >
                                                <Stack
                                                    w='100%'
                                                    h='100%'
                                                    align='center'
                                                >
                                                    <Switch
                                                        size='lg'
                                                        isChecked={b.isActive}
                                                        onChange={() => handleActiveBanner(b._id as string, b)}
                                                    />
                                                </Stack>
                                            </Td>
                                            <Td
                                                w='10%'
                                            >
                                                <Menu
                                                    closeOnSelect={false}
                                                >
                                                    <MenuButton
                                                        aria-label="options"
                                                        as={IconButton}
                                                        icon={<AdminVerticalMenuIcon w='30px' h='30px' />}
                                                        variant='ghost'
                                                    />
                                                    <MenuList>
                                                        <MenuItem
                                                            icon={<EditIcon w='16px' h='16px' />}
                                                            onClick={() => router.push(`/admin?tab=setting&sub=banner&action=edit&id=${b._id}`)}
                                                        >
                                                            {`แก้ไข`}
                                                        </MenuItem>
                                                        <MenuItem 
                                                            icon={<DeleteIcon w='16px' h='16px' />} 
                                                            color='#F65A5A'
                                                            onClick={() => handleDeleteBanner(b._id as string)}
                                                        >
                                                            {`ลบ`}
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </Stack>
                    <AdminPagination
                        page={Number(page)}
                        count={count as number}
                        length={banner.length}
                        url="/admin?tab=setting&sub=banner&page="
                    />
                </Stack>
            </Container>
        </>
    )
}