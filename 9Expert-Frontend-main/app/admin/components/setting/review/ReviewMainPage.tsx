'use client'

import { TPortfolio } from "@/app/admin/interface/PortfolioInterface"
import { SortIcon, AdminVerticalMenuIcon } from "@/app/icons/AdminIcon"
import { deleteReview, getAllReview } from "@/libs/AdminAPI"
import { DeleteIcon } from "@chakra-ui/icons"
import { useToast, Container, Stack, Heading, Table, Thead, Tr, Th, HStack, Checkbox, Tbody, Td, Menu, MenuButton, IconButton, MenuList, MenuItem, Text, Image } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AdminPagination } from "../../AdminPagination"
import { ReviewEditModal } from "./ReviewEditModal"
import { ReviewModal } from "./ReviewModal"
import {  TReview } from "@/app/admin/interface/ReviewInterface"
import { AverageStars } from "@/app/components/AverageStar"

export const ReviewMainPage = () => {
    const page = useSearchParams().get('page')
    const toast = useToast()
    
    const [count, setCount] = useState(0)
    const [update, setUpdate] = useState(false)

    const [review, setReview] = useState<TReview[]>([])

    useEffect(() => {
        getAllReview(page as string, (data: { result: TReview[], count: number }, error: unknown) => {
            if (error) console.log(error)
            setReview(data.result)
            setCount(data.count)
        })
    }, [update, page])

    const handleDeleteReview = async (id: string) => {
        await deleteReview(id, (item: TPortfolio, err: unknown) => {
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
            getAllReview(page as string, (data: { result: TReview[], count: number }, error: unknown) => {
                if (error) console.log(error)
                setReview(data.result)
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
                            fontSize='1.5rem'
                            fontWeight='600'
                        >
                            {`จัดการรีวิว`}
                        </Heading>
                        <ReviewModal setUpdate={setUpdate} />
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
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ID`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='25%'
                                    >
                                        <HStack
                                            spacing='15px'
                                            w='100%'
                                            justify='start'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ชื่อลูกค้า`}
                                            </Text>
                                        </HStack>
                                    </Th>
                                    <Th
                                        w='35%'
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
                                                {`รายละเอียด`}
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
                                                {`คะแนนรีวิว`}
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
                                    review.map((r, index) => (
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
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {`${index + 1}.`}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='25%'
                                            >
                                                <HStack
                                                    w='100%'
                                                    justify='start'
                                                >
                                                    <Image
                                                        alt='image'
                                                        w='65px'
                                                        // h='63px'
                                                        fit='cover'
                                                        src={r.image}
                                                    />
                                                    <Text
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {r.name}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='35%'
                                                textAlign='start'
                                            >
                                                <Text
                                                    fontSize='md'
                                                    fontWeight='600'
                                                    textColor='#2E2E2E'
                                                    noOfLines={1}
                                                >
                                                    {r.description}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='20%'
                                                textAlign='center'
                                            >
                                                <HStack
                                                    w='100%'
                                                    justify='center'
                                                >
                                                    {AverageStars(r.rating, '22px', '#F3B411')} 
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
                                                        <ReviewEditModal review={r} setUpdate={setUpdate} />
                                                        <MenuItem
                                                            icon={<DeleteIcon w='16px' h='16px' />}
                                                            color='#F65A5A'
                                                            onClick={() => handleDeleteReview(r._id as string)}
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
                        length={review.length}
                        url="/admin?tab=setting&sub=review&page="
                    />
                </Stack>
            </Container>
        </>
    )
}