'use client'

import { SortIcon, AdminVerticalMenuIcon } from "@/app/icons/AdminIcon"
import { adminGetAllCourseGroupWithTechnologyAreaId, activeCourseGroup, adminDeleteCourseGroup } from "@/libs/AdminAPI"
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons"
import { useToast, Container, Stack, Heading, Table, Thead, Tr, Th, HStack, Checkbox, Tbody, Td, Menu, MenuButton, IconButton, MenuList, MenuItem, Text, Image, Switch, Button } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { CGModal } from "./CGModal"
import { TCreateCourseGroup, TCreateTechnologyArea } from "@/app/admin/interface/TechnologyAreaInterface"
import { AdminPagination } from "../../../AdminPagination"
import { CGEditModal } from "./CGEditPage"

export const CGMainPage = () => {
    const page = useSearchParams().get('page')
    const taId = useSearchParams().get('id')
    const toast = useToast()
    const router = useRouter()

    const [update, setUpdate] = useState(false)
    const [sort, setSort] = useState('')

    const [courseGroup, setCourseGroup] = useState<TCreateCourseGroup[]>([])

    useEffect(() => {

        if (!taId) {
            router.push('/admin?tab=setting&sub=group')
        }

        adminGetAllCourseGroupWithTechnologyAreaId(taId as string, (data: TCreateCourseGroup[], error: unknown) => {
            if (error) console.log(error)
            setCourseGroup(() => {
                if (sort === 'desc') {
                    const newData = data.sort((a, b) => b.courseGroupName.localeCompare(a.courseGroupName))
                    return newData
                } else if (sort === 'asc') {
                    return data
                } else {
                    return data
                }
            })
        })
    }, [update, page, sort])

    const handleDeleteTechnologyArea = async (id: string) => {
        await adminDeleteCourseGroup(id, (item: TCreateTechnologyArea, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: 'Delete Course Group Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: 'Delete Course Group Success',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    const handleActive = async (id: string) => {
        await activeCourseGroup(id, (item: TCreateCourseGroup, err: unknown) => {
            if (err) {
                console.log(err)
                return toast({
                    title: `${item.isActive ? 'Active' : 'Inactive'} Course Group Failed`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: `${item.isActive ? 'Active' : 'Inactive'} Course Group Success`,
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
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`จัดการ Course Group`}
                        </Heading>
                        <CGModal areaId={taId as string} setUpdate={setUpdate} />
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
                                            justify='center'
                                        >
                                            <Text
                                                fontSize='md'
                                                fontWeight='600'
                                                textColor='#2E2E2E'
                                            >
                                                {`ID`}
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
                                        w='55%'
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
                                                {`Coruse Grops`}
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
                                                {`Activate`}
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
                                    courseGroup.slice((page ? (Number(page) - 1) * 5 : 0), (page ? (Number(page) - 1) * 5 : 0) + 5).map((cg, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
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
                                                        {`${sort === 'desc' ? courseGroup.length - (index) : (index + 1) + (page ? (Number(page) - 1) * 5 : 0) }.`}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td
                                                w='55%'
                                            >
                                                <HStack
                                                    w='100%'
                                                    justify='start'
                                                >
                                                    <Image
                                                        alt="icon"
                                                        w='150px'
                                                        h='80px'
                                                        fit='contain'
                                                        src={cg.courseGroupIcon}
                                                    />
                                                    <Text
                                                        fontSize='md'
                                                        fontWeight='600'
                                                        textColor='#2E2E2E'
                                                    >
                                                        {cg.courseGroupName}
                                                    </Text>
                                                </HStack>
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
                                                        isChecked={cg.isActive}
                                                        onChange={() => handleActive(cg._id as string)}
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
                                                        <CGEditModal areaId={taId as string} courseGroup={cg} setUpdate={setUpdate} />
                                                        <MenuItem
                                                            icon={<DeleteIcon w='16px' h='16px' />}
                                                            color='#F65A5A'
                                                            onClick={() => handleDeleteTechnologyArea(cg._id as string)}
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
                    <Stack
                        my='-3rem'
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                    >
                        <AdminPagination
                            page={Number(page)}
                            count={courseGroup.length as number}
                            length={courseGroup.length as number}
                            url={`/admin?tab=setting&sub=group&action=detail&id=${taId}&page=`}
                        />
                    </Stack>
                    <Button
                        mt='-2rem'
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                </Stack>
            </Container>
        </>
    )
}