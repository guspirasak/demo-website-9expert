'use client'

import { TPortfolio } from "@/app/admin/interface/PortfolioInterface"
import { SortIcon, AdminVerticalMenuIcon } from "@/app/icons/AdminIcon"
import { adminGetAllTechnologyArea, adminDeleteTechnologyArea, activeTechnologyArea, changeTechnologyAreaOrder } from "@/libs/AdminAPI"
import { DeleteIcon } from "@chakra-ui/icons"
import { useToast, Container, Stack, Heading, Table, Thead, Tr, Th, HStack, Checkbox, Tbody, Td, Menu, MenuButton, IconButton, MenuList, MenuItem, Text, Image, Switch, Select } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AdminPagination } from "../../AdminPagination"
import { AreaModal } from "./AreaModal"
import { TCreateTechnologyArea } from "@/app/admin/interface/TechnologyAreaInterface"
import { AreaEditModal } from "./AreaEditPage"
import { ArticleEyeIcon } from "@/app/icons/ArticleIcon"
import Link from "next/link"

export const AreaTablePage = () => {
    const page = useSearchParams().get('page')
    const toast = useToast()

    const [count, setCount] = useState(0)
    const [update, setUpdate] = useState(false)

    const [technologyArea, setTechnologyArea] = useState<TCreateTechnologyArea[]>([])

    useEffect(() => {
        adminGetAllTechnologyArea(page as string, (data: { result: TCreateTechnologyArea[], count: number }, error: unknown) => {
            if (error) console.log(error)
            setTechnologyArea(data.result)
            setCount(data.count)
        })
    }, [update, page])

    const handleDeleteTechnologyArea = async (id: string) => {
        await adminDeleteTechnologyArea(id, (item: TPortfolio, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'ลบ Technology Area ไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'ลบ Technology Area สําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            adminGetAllTechnologyArea(page as string, (data: { result: TCreateTechnologyArea[], count: number }, error: unknown) => {
                if (error) console.log(error)
                setTechnologyArea(data.result)
                setCount(data.count)
            })
        })
    }
    
    const handleActivateTechnologyArea = async (id: string) => {
        await activeTechnologyArea(id, (item: TCreateTechnologyArea, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: `${item.isActive ? 'Active' : 'Inactive'} Technology Area Failed`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: `${item.isActive ? 'Active' : 'Inactive'} Technology Area Success`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    const handleChangeOrder = async (id: string, order: number) => {
        await changeTechnologyAreaOrder(id, order, (item: TCreateTechnologyArea[], err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'Change Technology Area Order Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            toast({
                title: 'Change Technology Area Order Success',
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
                            fontSize='1.5rem'
                            fontWeight='600'
                        >
                            {`จัดการ Technology Area`}
                        </Heading>
                        <AreaModal setUpdate={setUpdate} />
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
                                        w='15%'
                                    >
                                        <HStack
                                            spacing='15px'
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
                                        w='55%'
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
                                                {`Technology Area`}
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
                                                {`Course Group`}
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
                                    technologyArea.map((t, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
                                                w='15%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                >
                                                    <Select
                                                        w='100%'
                                                        value={t.order}
                                                        onChange={e => handleChangeOrder(t._id as string, e.target.value as unknown as number)}
                                                    >
                                                        {
                                                            [...Array(count)].map((_, i) => (
                                                                <option
                                                                    key={i}
                                                                    value={i + 1}
                                                                    selected={t.order === i + 1}
                                                                >
                                                                    {i + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Select>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='55%'
                                            >
                                                <HStack
                                                    w='100%'
                                                    justify='start'
                                                    pl='50px'
                                                >
                                                    <Image
                                                        alt="icon"
                                                        w='150px'
                                                        h='80px'
                                                        fit='contain'
                                                        src={t.icon}
                                                    />
                                                    <Link href={`/admin?tab=setting&sub=group&action=detail&id=${t._id}`}>
                                                        <Text
                                                            fontSize='md'
                                                            fontWeight='600'
                                                            textColor='#2E2E2E'
                                                        >
                                                            {t.technologyName}
                                                        </Text>
                                                    </Link>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='10%'
                                            >
                                                <Stack
                                                    w='100%'
                                                    h='100%'
                                                    align='center'
                                                >
                                                    <Text
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {t.courseGroup.length}
                                                    </Text>
                                                </Stack>
                                            </Td>
                                            <Td
                                                w='20%'
                                                textAlign='center'
                                            >
                                                <Stack
                                                    w='100%'
                                                    h='100%'
                                                    align='center'
                                                >
                                                    <Switch
                                                        size='lg'
                                                        isChecked={t.isActive}
                                                        onChange={() => handleActivateTechnologyArea(t._id as string)}
                                                    />
                                                </Stack>
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
                                                            icon={<ArticleEyeIcon w='16px' h='16px' />}
                                                            href={`/admin?tab=setting&sub=group&action=detail&id=${t._id}`}
                                                        >
                                                            {`ดูรายละเอียด`}
                                                        </MenuItem>
                                                        <AreaEditModal area={t} setUpdate={setUpdate} />
                                                        <MenuItem
                                                            icon={<DeleteIcon w='16px' h='16px' />}
                                                            color='#F65A5A'
                                                            onClick={() => handleDeleteTechnologyArea(t._id as string)}
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
                        length={technologyArea.length}
                        url="/admin?tab=setting&sub=group&page="
                    />
                </Stack>
            </Container>
        </>
    )
}