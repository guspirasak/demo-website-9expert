'use client'

import { SortIcon, AdminVerticalMenuIcon } from "@/app/icons/AdminIcon"
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons"
import { Container, Stack, Heading, HStack, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Menu, MenuButton, IconButton, MenuList, MenuItem, Text, Image, useToast } from "@chakra-ui/react"
import { AdminPagination } from "../../AdminPagination"
import { PortfolioModal } from "./PortfolioModal"
import { TCreatePortfolio, TPortfolio } from "@/app/admin/interface/PortfolioInterface"
import { useEffect, useState } from "react"
import { deletePortfolio, getAllPortfolio } from "@/libs/AdminAPI"
import { useSearchParams } from "next/navigation"
import moment from "moment"
import { PortfolioEditModal } from "./PortfolioEditModal"

export const PortfolioMainpage = () => {

    const page = useSearchParams().get('page')
    const toast = useToast()

    const [state, setState] = useState<TCreatePortfolio>({
        imageUrl: '',
        file: {
            name: '',
            size: 0
        }
    })

    const [count, setCount] = useState(0)
    const [update, setUpdate] = useState(false)
    const [sort, setSort] = useState('')

    const [portfolios, setPortfolios] = useState<TPortfolio[]>([])

    useEffect(() => {
        getAllPortfolio(page as string, sort, (data: { result: TPortfolio[], count: number }, error: unknown) => {
            if (error) console.log(error)
            setPortfolios(data.result)
            setCount(data.count)
        })
    }, [update, page, sort])

    const handleDeletePortfolio = async (id: string) => {
        await deletePortfolio(id, (item: TPortfolio, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'Delete Portfolio Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'Delete Portfolio Success',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            getAllPortfolio(page as string, sort, (data: { result: TPortfolio[], count: number }, error: unknown) => {
                if (error) console.log(error)
                setPortfolios(data.result)
                setCount(data.count)
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
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`ผลงานด้านการฝึกอบรม`}
                        </Heading>
                        <PortfolioModal state={state} setState={setState} />
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
                                            justify='center'
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
                                        w='60%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            w='100%'
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='xl'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`รูปภาพ`}
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
                                                fontSize='xl'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`วันที่อัปโหลด`}
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
                                        w='10%'
                                    >

                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    portfolios.map((p, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
                                                w='10%'
                                            >
                                                <HStack
                                                    spacing='15px'
                                                    justify='center'
                                                >
                                                    <Text
                                                        fontSize='xl'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {`${index + 1}.`}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='60%'
                                            >
                                                <HStack
                                                    w='100%'
                                                    justify='center'
                                                >
                                                    <Image
                                                        w='175px'
                                                        h='117px'
                                                        fit='cover'
                                                        src={p.imageUrl}
                                                        alt='portfolio'
                                                    />
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='20%'
                                                textAlign='center'
                                            >
                                                <Text
                                                    fontSize='xl'
                                                    fontWeight='600'
                                                    textColor='#2E2E2E'
                                                >
                                                    {moment(p.createAt).format('DD/MM/YYYY')}
                                                </Text>
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
                                                        <PortfolioEditModal portfolio={p} setUpdate={setUpdate} />
                                                        <MenuItem 
                                                            icon={<DeleteIcon w='16px' h='16px' />} 
                                                            color='#F65A5A'
                                                            onClick={() => handleDeletePortfolio(p._id as string)}
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
                        length={portfolios.length}
                        url="/admin?tab=setting&sub=portfolio&page="
                    />
                </Stack>
            </Container>
        </>
    )
}