'use client'

import { useCreateCertificate } from "@/app/admin/context/CreateCertificateContext"
import { AdminFileIcon } from "@/app/icons/AdminIcon"
import { checkEmailStatus, sendEmailCertificate } from "@/libs/AdminAPI"
import { CloseIcon } from "@chakra-ui/icons"
import { Button, Container, Divider, HStack, Heading, IconButton, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { filesize } from "filesize"
import { useEffect } from "react"

export type TEmailStatus = {
    email: string
    status: string
}


export const SendCer = () => {

    const { state, setState } = useCreateCertificate()

    const toast = useToast()

    useEffect(() => {
        checkEmailStatus(state.user.map((usr) => usr.email), (data: { email: string, userType: string }[], error: unknown) => {
            if (error) {
                console.log(error)
                return
            }

            const newUser = state.user.map((usr) => {
                if (data.find((stat) => stat.email === usr.email)) {
                    return {
                        ...usr,
                        userType: data.find((stat) => stat.email === usr.email)?.userType
                    }
                }

                return usr
            })

            setState((prev) => ({
                ...prev,
                user: newUser
            }))
        })
    }, [])

    console.log(state.user)

    const sendCer = async () => {

        await sendEmailCertificate(state, (data: TEmailStatus[], error: unknown) => {
            console.log(data)
            const successTotal = data.filter((stat) => stat.status === 'success').length
            const failedTotal = data.filter((stat) => stat.status === 'failed').length
            if (error) {
                toast({
                    title: `ส่งอีเมลไม่สําเร็จ ${failedTotal} อีเมล`,
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                return
            }

            if (data.length === 0) {
                toast({
                    title: `ส่งอีเมลสําเร็จ`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                data.map((stat) => {
                    const sendCerUser = state.user.filter((usr) => usr.email === stat.email).map((usr) => {
                        if (stat.status === 'failed') {
                            return ({ ...usr, isSending: false })
                        } else {
                            return ({ ...usr, isSending: true })
                        }
                    })

                    setState(prev => ({
                        ...prev,
                        user: sendCerUser,
                        status: 'SENDED'
                    }))
                })
            }

            if (successTotal > 0) {
                toast({
                    title: `ส่งอีเมลสําเร็จ ${successTotal} อีเมล`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                data.map((stat) => {
                    const sendCerUser = state.user.filter((usr) => usr.email === stat.email).map((usr) => {
                        if (stat.status === 'failed') {
                            return ({ ...usr, isSending: false })
                        } else {
                            return ({ ...usr, isSending: true })
                        }
                    })

                    setState(prev => ({
                        ...prev,
                        user: sendCerUser,
                        status: 'SENDED'
                    }))
                })
            }
        })

    }

    return (
        <>
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                bg='white'
                h='fit-content'
                borderRadius='20px'
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
                    <Heading>{`Send certificate(s)`}</Heading>
                </HStack>
                <Stack
                    w='100%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='31px'
                    py='40px'
                    spacing='30px'
                >
                    <Stack
                        w='100%'
                        h='90px'
                        px='20px'
                        py='20px'
                        border='1px'
                        borderColor='#C4C4C4'
                        borderRadius='10px'
                        direction='row'
                        align='center'
                        justify='space-between'
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='center'
                            justify='start'
                            direction='row'
                            spacing='15px'
                        >
                            {
                                state.file.name &&
                                <AdminFileIcon
                                    w='30px'
                                    h='35px'
                                    color='#36B37E'
                                />
                            }
                            <Text
                                fontSize='20px'
                                fontWeight='400'
                                textColor='#717579'
                            >
                                {state.file.name}
                            </Text>
                        </Stack>
                        {
                            state.file.name &&
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='end'
                                direction='row'
                                spacing='30px'
                            >
                                <Text
                                    w='fit-content'
                                    h='50px'
                                    px='10px'
                                    display='flex'
                                    fontSize='20px'
                                    fontWeight='400'
                                    textColor='#817F7F'
                                    bg='#EDEDED80'
                                    textAlign='center'
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius='5px'
                                >
                                    {filesize(state.file.size)}
                                </Text>
                                <Divider orientation='vertical' />
                                <IconButton
                                    aria-label="delete"
                                    bg='#EDEDED80'
                                    w='50px'
                                    h='50px'
                                    borderRadius='full'
                                    icon={<CloseIcon w='15px' h='15px' color='#817F7F' />}
                                    onClick={() => {
                                        setState(prev => ({ ...prev, user: [], file: { name: '', size: 0 } }))
                                    }}
                                />
                            </Stack>
                        }
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        spacing='30px'
                    >
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th
                                        w='5%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='center'
                                        >
                                            {`No.`}
                                        </Text>
                                    </Th>
                                    <Th
                                        w='20%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='start'
                                        >
                                            {`Name`}
                                        </Text>
                                    </Th>
                                    <Th
                                        w='20%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='start'
                                        >
                                            {`Surname`}
                                        </Text>
                                    </Th>
                                    <Th
                                        w='25%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='center'
                                        >
                                            {`Email`}
                                        </Text>
                                    </Th>
                                    <Th
                                        w='15%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='center'
                                        >
                                            {`Number`}
                                        </Text>
                                    </Th>
                                    <Th
                                        w='15%'
                                        h='66px'
                                    >
                                        <Text
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#2E2E2E'
                                            textAlign='center'
                                        >
                                            {`Email Status`}
                                        </Text>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    state.user.map((user, index) => (
                                        <Tr
                                            key={index}
                                        >
                                            <Td
                                                w='5%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='center'
                                                >
                                                    {index + 1}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='20%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='start'
                                                >
                                                    {user.name}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='20%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='start'
                                                >
                                                    {user.surname}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='25%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='center'
                                                >
                                                    {user.email}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='15%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='center'
                                                >
                                                    {user.certificateNo}
                                                </Text>
                                            </Td>
                                            <Td
                                                w='15%'
                                                h='66px'
                                            >
                                                <Text
                                                    fontSize='20px'
                                                    fontWeight='400'
                                                    textColor='#2E2E2E'
                                                    textAlign='center'
                                                >
                                                    {user.userType}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                    >
                        <Button
                            w='fit-content'
                            h='65px'
                            px='32px'
                            bg='#19B5FE'
                            color='white'
                            borderRadius='10px'
                            onClick={sendCer}
                        >
                            {`Send Email certificate(s) `}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}