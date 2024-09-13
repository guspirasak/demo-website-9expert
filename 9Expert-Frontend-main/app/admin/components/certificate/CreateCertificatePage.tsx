'use client'

import { Button, Stack, useToast } from "@chakra-ui/react"
import { CreateCerSelectCourse } from "./components/CreateCerSelectCourse"
import { useCreateCertificate } from "../../context/CreateCertificateContext"
import { CreateCerUser } from "./components/CreateCerUser"
import { SendCer } from "./components/SendCer"
import { DownloadCer } from "./components/DownloadCer"
import Link from "next/link"
import { useState } from "react"
import { TCertificate } from "../../interface/CreateCertificate"
import { updateCertificateUser } from "@/libs/AdminAPI"
import { Loading } from "../Loading"

export const CreateCertificatePage = () => {

    const { state } = useCreateCertificate()

    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const handleSaveCertificate = async () => {
        setLoading(true)
        await updateCertificateUser(state.classDetailId, state, (data: TCertificate, error: unknown) => {
            if (error) {
                setLoading(false)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setLoading(false)

            return toast({
                title: 'บันทึกสําเร็จ',
                description: 'เพิ่มข้อมูลสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    return (
        <>
            {
                loading &&
                <Loading />
            }
            <Stack
                w='100%'
                h='100%'
                align='center'
                justify='start'
                position='relative'
            >
                <CreateCerSelectCourse />
                {
                    state.classDetailId && state.courseInstructor && <CreateCerUser />
                }
                {
                    state.user.length > 0 &&
                    <>
                        <SendCer />
                        <DownloadCer />
                    </>
                }
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
                    <Button
                        w='250px'
                        h='65px'
                        bg='#19B5FE'
                        fontSize='18px'
                        textColor='white'
                        borderRadius='10px'
                        onClick={handleSaveCertificate}
                    >
                        {`บันทึก`}
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}