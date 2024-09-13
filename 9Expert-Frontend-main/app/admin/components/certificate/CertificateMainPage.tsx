'use client'

import { AdminMenuIcon, DeleteIcon } from "@/app/icons/AdminIcon"
import { Button,  Container, HStack, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { deleteCertificate, getAllCertificate } from "@/libs/AdminAPI"
import { TCertificate } from "../../interface/CreateCertificate"
import moment from "moment"
import { ArticleEyeIcon } from "@/app/icons/ArticleIcon"
import { AdminPagination } from "../AdminPagination"
import { useDebounce } from "@/utils/useDebounce"


export const CertificateMainPage = () => {

    const [certificates, setCertificates] = useState<TCertificate[]>([])
    const [ count, setCount ] = useState(0)
    const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState<string>('')

    const debouncedSearch = useDebounce(search, 500)

    const page = useSearchParams().get('page')

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        getAllCertificate(page as string, (data: { result: TCertificate[], count: number }, error: unknown) => {
            if (error) {
                return console.log(error)
            }
            setCertificates(data.result)
            setCount(data.count)
        }, search)
    }, [page, update, debouncedSearch])

    const handleWatchDetail = (id: string) => {
        router.push(`/admin?tab=certificate&action=detail&id=${id}`)
    }

    const handleDeleteCertificate = async (id: string) => {
        await deleteCertificate(id as string, (data: TCertificate, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'Delete Certificate Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: 'Delete Certificate Success',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }


    return (
        <Stack
            w='100%'
            h='100%'
        >
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                h='max-content'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='max-content'
                    bg='white'
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
                        <Heading fontSize='1.5rem'>{`Certificate System`}</Heading>
                        <Button
                            as={Link}
                            href='/admin?tab=certificate&action=create'
                            color='white'
                            bg='exBlue'
                            _hover={{
                                bg: 'exBlue'
                            }}
                            _active={{
                                bg: 'exBlue'
                            }}
                        >
                            {`สร้างเกียรติบัตร`}
                        </Button>
                    </HStack>
                    <VStack
                        p='1rem'
                    >
                        <HStack
                            align='center'
                            justify='space-between'
                            borderBottom='1px'
                            borderColor='exGray.100'
                            w='100%'
                            h='100px'
                            px={{ base: '0.75rem', lg: '2rem' }}
                            py='0'
                        >
                            <Input 
                                id='search' 
                                w={{ base: '10rem', lg: '20rem' }} 
                                placeholder='ค้นหา...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
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
                                        <Th w='5%' >
                                            <Text as='b' fontSize='md' >{`No.`}</Text>
                                        </Th>
                                        <Th
                                            display={{ base: 'none', lg: 'table-cell' }}
                                            w='20%'
                                            textAlign='start'
                                        >
                                            <Text as='b' fontSize='md' >{`ID Class`}</Text>
                                        </Th>
                                        <Th
                                            w='40%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`Course`}</Text>
                                        </Th>
                                        <Th
                                            w='15%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`วันที่สร้าง Certificate`}</Text>
                                        </Th>
                                        <Th
                                            w='20%'
                                            textAlign='center'
                                            display={{ base: 'none', lg: 'table-cell' }}
                                        >
                                            <Text as='b' fontSize='md' >{`Status`}</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        certificates.map((certificate, index) => (
                                            <Tr key={index}>
                                                <Td
                                                    w='5%'
                                                >
                                                    <Text fontSize='md'>{`${(index + 1) + (5 * (Number(page || 1) - 1))}.`}</Text>
                                                </Td>
                                                <Td
                                                    w='20%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                >
                                                    <Text fontSize='md'>{certificate.courseId}</Text>
                                                </Td>
                                                <Td
                                                    w='40%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md'>{certificate.courseName}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                    textAlign='center'
                                                >
                                                    <Text fontSize='md'>{moment(new Date(certificate.createDate)).format('DD/MM/YYYY')}</Text>
                                                </Td>
                                                <Td
                                                    w='15%'
                                                    display={{ base: 'none', lg: 'table-cell' }}
                                                >
                                                    <HStack
                                                        w='100%'
                                                        h='100%'
                                                        align='center'
                                                        justify='center'
                                                    >
                                                        {
                                                            certificate.status?.toLowerCase() === 'sended' ?
                                                                (
                                                                    <Text
                                                                        fontSize='lg'
                                                                        fontWeight='500'
                                                                        textColor='#36B37E'
                                                                    >
                                                                        {certificate.status}
                                                                    </Text>
                                                                )
                                                                :
                                                                (
                                                                    <Text
                                                                        fontSize='lg'
                                                                        fontWeight='500'
                                                                        textColor='#1CA7EC'
                                                                    >
                                                                        {certificate.status}
                                                                    </Text>
                                                                )
                                                        }
                                                        <Menu
                                                            closeOnSelect={false}
                                                        >
                                                            <MenuButton
                                                                aria-label="options"
                                                                as={IconButton}
                                                                icon={<AdminMenuIcon w='24px' h='24px' />}
                                                                variant='ghost'
                                                            />
                                                            <MenuList
                                                            >
                                                                <MenuItem
                                                                    icon={<ArticleEyeIcon w='16px' h='16px' />}
                                                                    onClick={() => handleWatchDetail(certificate._id as string)}
                                                                >{`ดูรายละเอียด`}</MenuItem>
                                                                {/* <MenuItem 
                                                                icon={<EditIcon w='16px' h='16px' />}
                                                            >
                                                                {`แก้ไข`}
                                                            </MenuItem> */}
                                                                <MenuItem 
                                                                    icon={<DeleteIcon w='16px' h='16px' />} 
                                                                    color='#F65A5A'
                                                                    onClick={() => handleDeleteCertificate(certificate._id as string)}
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
                </Stack>
                <AdminPagination
                    page={Number(page)}
                    count={count}
                    url='/admin?tab=certificate&page='
                    length={certificates.length}
                />
            </Container>
        </Stack>
    )
}