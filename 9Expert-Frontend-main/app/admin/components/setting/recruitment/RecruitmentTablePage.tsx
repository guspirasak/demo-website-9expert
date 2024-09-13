'use client'

import { TRecruit } from "@/app/admin/interface/CreateRegister"
import { AdminVerticalMenuIcon, FilterIcon, SortIcon } from "@/app/icons/AdminIcon"
import { deleteRecruitmentById, getAllRecruitment } from "@/libs/AdminAPI"
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Button, Checkbox, Container, Heading, HStack, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AdminPagination } from "../../AdminPagination"
import { useSearchParams } from "next/navigation"

export const RecruitmentTablePage = () => {

    const [ recruitments, setRecruitments ] = useState<TRecruit[]>([])
    const [ count, setCount ] = useState(0)
    const [update, setUpdate] = useState(false)

    const page = useSearchParams().get('page')
    const toast = useToast()

    useEffect(() => {
        getAllRecruitment(page as string, (data: { result: TRecruit[], count: number }, error: unknown) => {
            if (error) {
                console.log(error)
            }

            console.log(data)

            setRecruitments(data.result)
            setCount(data.count)
        })
    }, [page, update])

    const handleDeleteRecruitment = async (id: string) => {
        await deleteRecruitmentById(id, (item: TRecruit, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบตําแหน่งงานไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'ลบตําแหน่งงานสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setUpdate(!update)
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
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`จัดการตำแหน่งงาน`}
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
                                href='/admin?tab=setting&sub=recruitment&action=create'
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
                                {`เพิ่มตำแหน่งงาน`}
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
                                        >
                                            <Text
                                                fontSize='xl'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ID`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='80%'
                                    >
                                        <HStack
                                            spacing='15px'
                                        >
                                            <Text
                                                fontSize='xl'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ตำแหน่งงาน`}
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
                                    recruitments.map((recruitment, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
                                                w='10%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                >
                                                    <Text
                                                        fontSize='xl'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {(index + 1) + ((Number(page || 1) - 1) * 5)}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='80%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                >
                                                    <Text
                                                        fontSize='xl'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {recruitment.role}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='10%'
                                            >
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
                                                            href={`/admin?tab=setting&sub=recruitment&action=edit&id=${recruitment._id}`}
                                                        >
                                                            {`แก้ไข`}
                                                        </MenuItem>
                                                        <MenuItem
                                                            icon={<DeleteIcon w='16px' h='16px' />}
                                                            color='#F65A5A'
                                                            onClick={() => handleDeleteRecruitment(recruitment._id as string)}
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
                        length={recruitments.length}
                        url="/admin?tab=setting&sub=recruitment&page="
                    />
                </Stack>
            </Container>
        </>
    )
}