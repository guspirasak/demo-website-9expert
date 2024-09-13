'use client'

import { TRegisterInhouseTable } from "@/app/register/interfaces/RegisterInterface";
import { getUserRegisterInhouseById, updateStatusRegisterInhouseById } from "@/libs/AdminAPI";
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useToast } from "@chakra-ui/react"
import moment from "moment";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type TDashboardCard = {
    title: string,
    number: number | string,
    icon?: JSX.Element
}

export const DashboardDetailUserInhouse = () => {

    const [registerData, setRegisterData] = useState<TRegisterInhouseTable>({
        _id: '',
        formInhouseId: '',
        courseId: '',
        numberPerson: 0,
        monthRequest: '',
        typeForTrain: '',
        trainAddressLine: '',
        trainAddress: {
            province: '',
            district: '',
            subdistrict: '',
            postcode: ''
        },
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        companyTaxId: '',
        companyAddressLine: '',
        companyName: '',
        companyEmail: '',
        companyBranchName: '',
        companyAddress: {
            province: '',
            district: '',
            subdistrict: '',
            postcode: ''
        },
        personalEmail: '',
        companyTelephone: '',
        telephone: '',
        note: '',
        createAt: '',
        isDeleted: false,
        status: ''
    } as TRegisterInhouseTable)

    const router = useRouter();

    const id = useSearchParams().get('detail')
    const toast = useToast()

    useEffect(() => {
        getUserRegisterInhouseById(id as string, (data: TRegisterInhouseTable, error: unknown) => {
            if (data) setRegisterData(data)
            if (error) console.log(error)
        })
    }, [id])

    const renderStatus = (status: string) => {
        if (status === 'Pending') {
            return 'รอการยืนยัน'
        } else if (status === 'Approved') {
            return 'ยืนยัน'
        } else if (status === 'Cancelled') {
            return 'ยกเลิก'
        } else {
            return 'รอการยืนยัน'
        }
    }

    const handleSave = async () => {
        await updateStatusRegisterInhouseById(id as string, registerData.status as string, (data: TRegisterInhouseTable, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'Update Status Failed',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            toast({
                title: 'Update Status Success',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })

            router.push('/admin?tab=dashboard&sub=inhouse')
        })
    }

    return (
        <Stack bg="white" rounded="xl" px={5} pt={2} pb={7}>
            <Stack w="100%" align="center" justify="start">
                {/* header */}
                <Stack justify="center" direction="row" w="100%">
                    <Text fontWeight="semibold" fontSize="28px">
                        รายละเอียดผู้สมัคร Inhouse
                    </Text>
                </Stack>
                <Divider />

                {/* contact and classDetail */}
                <Stack direction="row" w="100%" justify="space-between">
                    {/* text-left */}
                    <Stack direction="column" w="50%">
                        <Text fontWeight="semibold" fontSize="20px">
                            รายละเอียดข้อมูลของผู้ลงทะเบียน/ผู้ประสานงาน
                        </Text>
                        <Stack
                            pl={4}
                            direction="row"
                            w="100%"
                            justify="space-between"
                        >
                            <Stack direction="column">
                                <Text>ชื่อ - นามสกุล : </Text>
                                <Text>{registerData.firstName} {registerData.lastName}</Text>

                                <Text mt={2} >Email : </Text>
                                <Text>{registerData.personalEmail}</Text>

                                <Text mt={2} >เบอร์โทรศัพท์ : </Text>
                                <Text>{registerData.telephone}</Text>

                                <Text mt={2} >ตำแหน่ง : </Text>
                                <Text>{registerData.position}</Text>

                                <Text mt={2} >แผนก : </Text>
                                <Text mb={2} >{registerData.department}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* text-right */}
                    <Stack direction="column" w="50%">
                        <Text fontWeight="semibold" fontSize="20px">
                            รายละเอียดหลักสูตร
                        </Text>
                        <Stack direction="row" w="100%" justify="space-between">
                            <Stack direction="column">
                                <Stack direction="row" w="100%" justify="start">
                                    <Text>หลักสูตรที่ลงทะเบียน : </Text>
                                    <Text>
                                        {registerData.course?.courseName}
                                    </Text>
                                </Stack>
                                <Stack direction="row" w="100%" justify="start">
                                    <Text>เดือนที่อบรม : </Text>
                                    <Text>{moment(registerData.classDetail?.classStartDate).format('MMMM')}</Text>
                                </Stack>
                                <Stack direction="row" w="100%" justify="start">
                                    <Text>รูปแบบการอบรม : </Text>
                                    <Text color='exBlue'>{registerData.typeForTrain}</Text>
                                </Stack>
                                <br />
                            </Stack>
                        </Stack>

                        <Text fontWeight="semibold" fontSize="20px">
                            สถานะการสมัคร
                        </Text>
                        <Stack direction="row" w="100%" justify="space-between">
                            <Stack direction="column">
                                <Menu>
                                    <MenuButton
                                        px={4}
                                        py={2}
                                        transition="all 0.2s"
                                        borderRadius="md"
                                        borderWidth="1px"
                                        _hover={{ bg: "gray.100" }}
                                        _focus={{ boxShadow: "outline" }}
                                    >
                                        {
                                            renderStatus(registerData.status as string)
                                        } <ChevronDownIcon />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                setRegisterData(prev => ({
                                                    ...prev,
                                                    status: 'Approved'
                                                }))
                                            }}
                                        >
                                            ยืนยัน
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setRegisterData(prev => ({
                                                    ...prev,
                                                    status: 'Cancelled'
                                                }))
                                            }}
                                        >
                                            ยกเลิก
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                {/* payment-detail */}
                <Stack direction="row" w="100%" justify="space-between">
                    <Stack direction="column" w="50%">
                        <Text fontWeight="semibold" fontSize="20px">
                            รายละเอียดใบกำกับภาษี/ใบเสร็จรับเงิน
                        </Text>
                        <Stack
                            pl={4}
                            direction="row"
                            w="100%"
                            justify="space-between"
                        >
                            <Stack direction="column">
                                <Stack direction="row" justify="start">
                                    <Text>ประเภท : </Text>
                                    <Text>นิติบุคคล / บริษัท</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>ชื่อบริษัท : </Text>
                                    <Text>{registerData.companyName}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Stack direction="column" justify="start">
                                        <Text>ที่อยู่บริษัท : </Text>
                                        <Text>
                                            {`จังหวัด : ${registerData.companyAddress.province} เขต / อำเภอ
                                            : ${registerData.companyAddress.district} แขวง / ตำบล : ${registerData.companyAddress.subdistrict}
                                            รหัสไปรษณีย์ : ${registerData.companyAddress.postcode}`}
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>สาขา : </Text>
                                    <Text>{registerData.companyBranchName}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>เบอร์โทรศัพท์ของบริษัท : </Text>
                                    <Text>{registerData.companyTelephone}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>อีเมลบริษัท : </Text>
                                    <Text>{registerData.companyEmail}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>เลขประจำตัวผู้เสียภาษี : </Text>
                                    <Text>{registerData.companyTaxId}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>รายละเอียดสถานที่จัดอบรม : </Text>
                                    <Text>{`${registerData.trainAddressLine} แขวง / ตำบล : ${registerData.trainAddress.subdistrict} เขต / อำเภอ : ${registerData.trainAddress.district} จังหวัด : ${registerData.trainAddress.province} รหัสไปรษณีย์ : ${registerData.trainAddress.postcode}`}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text fontSize="14px" color="red">
                                        หมายเหตุ
                                    </Text>
                                    <Text color="grey">
                                        {" "}
                                        : {registerData.note}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack mt={5} direction="row" w="100%" justify="space-between">
                    <Button colorScheme="blue" onClick={router.back}>กลับ</Button>
                    <Button colorScheme="green" onClick={handleSave}>บันทึก</Button>
                </Stack>
            </Stack>
        </Stack>
    );
}