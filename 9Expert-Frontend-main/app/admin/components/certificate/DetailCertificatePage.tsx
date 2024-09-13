'use client'

import { AdminMenuIcon, DeleteIcon, EditIcon } from "@/app/icons/AdminIcon"
import { Button, Container, HStack, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { deleteUserCertificate, getCertificateWithClassDetailId, sendEmailCertificate } from "@/libs/AdminAPI"
import moment from "moment"
import { TCertificate, TCertificateUser } from "@/app/admin/interface/CreateCertificate"
import { AdminPagination } from "../AdminPagination"
import { TEmailStatus } from "./components/SendCer"
import { useDebounce } from "@/utils/useDebounce"
export const DetailCertificatePage = () => {

    const [certificates, setCertificates] = useState<TCertificate>({
        _id: '',
        classDetailId: '',
        courseName: '',
        courseInstructor: '',
        qrcode: '',
        validId: '',
        courseId: '',
        user: [],
        createDate: '',
        status: ''
    })
    const [count, setCount] = useState(0)
    const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [cacheUser, setCacheUser] = useState<TCertificateUser[]>([])

    const page = useSearchParams().get('page') || 1
    const id = useSearchParams().get('id')

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {

        if (!id) router.push('/admin?tab=certificate')

        getCertificateWithClassDetailId(id as string, (data: TCertificate, error: unknown) => {
            if (error) {
                return console.log(error)
            }
            console.log(data)
            setCertificates(data)
            setCount(data.user.length)
        }, search)
    }, [page, update])

    useEffect(() => {
        if (!search) setCacheUser(certificates.user)
        
        if (search) {
            setCacheUser(certificates.user.filter((user: TCertificateUser) => user.name.includes(search) || user.surname.includes(search)))
        }
    }, [search])

    const handleEditCertificate = (no: string) => {
        router.push(`/admin?tab=certificate&action=edit&id=${id}&no=${no}`)
    }

    const handleSendCertificate = async (user: TCertificateUser) => {
        await sendEmailCertificate({ ...certificates, user: [user] }, (data: TEmailStatus[], error: unknown) => {
            if (error) {
                return toast({
                    title: `ส่ง Email ไม่สําเร็จ`,
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: `ส่ง Email สําเร็จ`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            
        })
    }

    const handleDeleteUserCertificate = async (name: string, surname: string) => {
        await deleteUserCertificate(id as string, name, surname, (data: TCertificate, error: unknown) => {
            if (error) {
                return toast({
                    title: 'ลบผู้ใช้งานไม่สําเร็จ',
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setUpdate(!update)
            toast({
                title: 'ลบผู้ใช้งานสําเร็จ',
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
                mt='2rem'
                p='0'
                maxW='95%'
                h='max-content'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        bg='white'
                    >
                        <HStack
                            borderBottom='1px'
                            borderColor='exGray.100'
                            w='100%'
                            h='130px'
                            align='center'
                            justify='space-between'
                            px={{ base: '1.5rem', lg: '3rem' }}
                            m='0'
                        >
                            <Heading>{`Certificate System`}</Heading>
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
                                    placeholder='ค้นหา'
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
                                            <Th w='25%' >
                                                <Text as='b' >{`Name`}</Text>
                                            </Th>
                                            <Th
                                                display={{ base: 'none', lg: 'table-cell' }}
                                                w='30%'
                                                textAlign='start'
                                            >
                                                <Text as='b' >{`Course`}</Text>
                                            </Th>
                                            <Th
                                                w='10%'
                                                textAlign='center'
                                                display={{ base: 'none', lg: 'table-cell' }}
                                            >
                                                <Text as='b' >{`วันที่เริ่มเรียน`}</Text>
                                            </Th>
                                            <Th
                                                w='15%'
                                                textAlign='center'
                                                display={{ base: 'none', lg: 'table-cell' }}
                                            >
                                                <Text as='b' >{`email`}</Text>
                                            </Th>
                                            <Th
                                                w='20%'
                                                textAlign='center'
                                                display={{ base: 'none', lg: 'table-cell' }}
                                            >
                                                <Text as='b' >{`Status`}</Text>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            (cacheUser.length > 0 ? cacheUser : certificates.user).slice((Number(page) - 1) * 5, Number(page) * 5).map((certificate, index) => (
                                                <Tr key={index}>
                                                    <Td
                                                        w='25%'
                                                    >
                                                        <Text>{certificate.name}</Text>
                                                    </Td>
                                                    <Td
                                                        w='30%'
                                                        display={{ base: 'none', lg: 'table-cell' }}
                                                    >
                                                        <Text>{certificates.courseName}</Text>
                                                    </Td>
                                                    <Td
                                                        w='10%'
                                                        display={{ base: 'none', lg: 'table-cell' }}
                                                        textAlign='center'
                                                    >
                                                        <Text>{moment(new Date(certificate.startDate)).format('DD/MM/YYYY')}</Text>
                                                    </Td>
                                                    <Td
                                                        w='15%'
                                                        display={{ base: 'none', lg: 'table-cell' }}
                                                        textAlign='center'
                                                    >
                                                        <Text>{certificate.email}</Text>
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
                                                                !certificate.isSending ?
                                                                    (
                                                                        <Button
                                                                            w='120px'
                                                                            h='40px'
                                                                            variant='outline'
                                                                            borderColor='#36B37E'
                                                                            fontSize='20px'
                                                                            fontWeight='500'
                                                                            textColor='#36B37E'
                                                                            borderRadius='20px'
                                                                            onClick={() => handleSendCertificate(certificate)}
                                                                        >
                                                                            {`Send`}
                                                                        </Button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <Button
                                                                            w='120px'
                                                                            h='40px'
                                                                            variant='outline'
                                                                            borderColor='#3A86FF'
                                                                            fontSize='20px'
                                                                            fontWeight='500'
                                                                            textColor='#1CA7EC'
                                                                            borderRadius='20px'
                                                                            onClick={() => handleSendCertificate(certificate)}
                                                                        >
                                                                            {`Resend`}
                                                                        </Button>
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
                                                                <MenuList>
                                                                    <MenuItem
                                                                        icon={<EditIcon w='16px' h='16px' />}
                                                                        onClick={() => handleEditCertificate(certificate.certificateNo as string)}
                                                                    >
                                                                        {`แก้ไข`}
                                                                    </MenuItem>
                                                                    <MenuItem 
                                                                        icon={<DeleteIcon w='16px' h='16px' />} 
                                                                        color='#F65A5A'
                                                                        onClick={() => handleDeleteUserCertificate(certificate.name as string, certificate.surname as string)}
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
                        count={(cacheUser.length > 0 ? cacheUser.length : count)}
                        url={`/admin?tab=certificate&action=detail&id=${id}&page=`}
                        length={(cacheUser.length > 0 ? cacheUser : certificates.user).length}
                    />
                    <Stack
                        w='95%'
                        h='100%'
                        mt='140px'
                        mb='60px'
                        direction='row'
                        align='center'
                        justify='space-between'
                    >
                        <Button
                            as={Link}
                            href='/admin?tab=certificate'
                            w='250px'
                            h='65px'
                            variant='outline'
                            bg='white'
                            fontSize='18px'
                            textColor='#717579'
                            borderColor='#E9EAF0'
                            borderRadius='10px'
                        >
                            {`ย้อนกลับ`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}