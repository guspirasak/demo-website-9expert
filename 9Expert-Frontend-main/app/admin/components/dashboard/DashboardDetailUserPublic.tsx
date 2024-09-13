'use client'

import { ChevronDownIcon, SmallAddIcon } from "@chakra-ui/icons"
import { Button, Divider, FormControl, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { TRegisterPublicTable } from "@/app/register/interfaces/RegisterInterface";
import { getUserRegisterPublicById, updateStatusRegisterPublicById } from "@/libs/AdminAPI";
import moment from "moment";

type TFormAddUser = {
    name: string,
    email: string,
    tel: string,
}

export const DashboardDetailUserPublic = () => {
    const [isShowFormAddUser, setIsShowFormAddUser] = useState<boolean>(false)
    const [formAddUser, setFormAddUser] = useState<TFormAddUser>(
        {
            name: '',
            email: '',
            tel: '',
        }
    )

    const [registerData, setRegisterData] = useState<TRegisterPublicTable>({
        _id: '',
        formId: '',
        type: '',
        firstName: '',
        lastName: '',
        email: '',
        numberPerson: 0,
        applyOnStatus: false,
        telephone: '',
        courseId: '',
        classId: '',
        requestInvoice: false,
        requestReceipt: false,
        promotionId: '',
        status: '',
        note: '',
        taxType: '',
        tax: {
            firstName: '',
            lastName: '',
            companyName: '',
            taxId: '',
            addressLine: '',
            address: {
                province: '',
                district: '',
                subdistrict: '',
                postcode: ''
            },
            telephone: '',
            note: '',
        },
        member: {
            count: 0,
            memberData: []
        },
        createAt: '',
        isDeleted: false,

    } as TRegisterPublicTable)

    const router = useRouter();

    const id = useSearchParams().get('detail')
    const toast = useToast()

    useEffect(() => {
        getUserRegisterPublicById(id as string, (data: TRegisterPublicTable, error: unknown) => {
            if (data) setRegisterData(data)
            if (error) console.log(error)
        })
    }, [id])

    const renderStatus = (status: string) => {
        if (status === 'Pending') {
            return 'รอการยืนยัน'
        } else if (status === 'Approved') {
            return 'ยืนยัน'
        } else {
            return 'ยกเลิก'
        }
    }

    const handleSave = async () => {
        await updateStatusRegisterPublicById(id as string, registerData.status, (data: TRegisterPublicTable, error: unknown) => {
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

            router.push('/admin?tab=dashboard')
        })
    }

    return (
        <Stack bg="white" rounded="xl" px={5} py={2} pb={7}>
            <Stack w="100%" align="center" justify="start">
                {/* header */}
                <Stack justify="center" direction="row" w="100%">
                    <Text fontWeight="semibold" fontSize="28px">
                        รายละเอียดผู้สมัคร Public
                    </Text>
                </Stack>
                <Divider />

                {/* contact and classDetail */}
                <Stack direction="row" w="100%" justify="space-between">
                    {/* text-left */}
                    <Stack direction="column" w="50%">
                        <Text fontWeight="semibold" fontSize="20px">
                            รายละเอียดข้อมูลติดต่อ
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
                                <br />

                                <Text>Email : </Text>
                                <Text>{registerData.email}</Text>
                                <br />

                                <Text>เบอร์โทรศัพท์ : </Text>
                                <Text>{registerData.telephone}</Text>
                                <br />
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
                                        {registerData.course?.courseName || 'ไม่พบข้อมูล'}
                                    </Text>
                                </Stack>
                                <Stack direction="row" w="100%" justify="start">
                                    <Text>รูปแบบการอบรม : </Text>
                                    <Text>{registerData.classDetail?.classType || 'ไม่พบข้อมูล'} ({registerData.type})</Text>
                                </Stack>
                                <Stack direction="row" w="100%" justify="start">
                                    <Text>วันที่อบรม : </Text>
                                    <Text>{`${moment(registerData.classDetail?.classStartDate).format('DD')} - ${moment(registerData.classDetail?.classStartDate).format('DD MMM YYYY')}`}</Text>
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
                                            renderStatus(registerData.status)
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
                                    <Text>{registerData.taxType === 'personal' ? 'บุคคลธรรมดา' : 'นิติบุคคล / บริษัท'}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>{registerData.taxType === 'personal' ? 'ชื่อ - นามสกุล : ' : 'ชื่อบริษัท : '}</Text>
                                    <Text>{registerData.taxType === 'personal' ? `${registerData.tax.firstName} ${registerData.tax.lastName}` || 'ไม่พบข้อมูล' : registerData.tax.companyName ? registerData.tax.companyName : 'ไม่พบข้อมูล'}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>เลขประจำตัวผู้เสียภาษี : </Text>
                                    <Text>{registerData.tax.taxId}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>ที่อยู่บริษัท : </Text>
                                    <Text>{registerData.tax.addressLine}</Text>
                                </Stack>
                                <Stack direction="row" justify="start">
                                    <Text>
                                        {`จังหวัด : ${registerData.tax.address.province} เขต / อำเภอ :
                                        ${registerData.tax.address.district} แขวง / ตำบล : ${registerData.tax.address.subdistrict}
                                        รหัสไปรษณีย์ : ${registerData.tax.address.postcode}`}
                                    </Text>
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
                {/* users-list */}
                <Stack direction="row" w="100%" justify="space-between">
                    <Stack direction="column" w="100%">
                        <Text fontWeight="semibold" fontSize="20px">
                            รายชื่อผู้เข้าอบรมทั้งหมด
                        </Text>
                        <Stack
                            pl={4}
                            direction="row"
                            w="100%"
                            justify="space-between"
                        >
                            <Stack direction="column" w="100%">
                                {registerData.member.memberData.map((user: any, index: number) => (
                                    <Stack
                                        direction="row"
                                        w="100%"
                                        justify="space-between"
                                        px="0.5rem"
                                        py="0.2rem"
                                        border="1px solid gray"
                                        rounded="md"
                                        key={index}
                                    >
                                        <Stack>
                                            <Text fontSize="14px">{index}</Text>
                                        </Stack>
                                        <Stack flex={1}>
                                            <Text fontSize="14px">
                                                {user.name}
                                            </Text>
                                        </Stack>
                                        <Stack flex={1}>
                                            <Text fontSize="14px">
                                                {user.email}
                                            </Text>
                                        </Stack>
                                        <Stack flex={1}>
                                            <Text fontSize="14px">
                                                {user.tel}
                                            </Text>
                                        </Stack>
                                        <Spacer />
                                    </Stack>
                                ))}
                                {isShowFormAddUser ? (
                                    <FormControl>
                                        <Stack
                                            direction="row"
                                            w="100%"
                                            justify="space-between"
                                            px="0.5rem"
                                            py="0.2rem"
                                            border="1px solid gray"
                                            rounded="md"
                                        >
                                            <Stack>
                                                <Text fontSize="14px"></Text>
                                            </Stack>
                                            <Stack flex={1}>
                                                <Input
                                                    onChange={(e) =>
                                                        setFormAddUser(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    value={formAddUser.name}
                                                />
                                            </Stack>
                                            <Stack flex={1}>
                                                <Input
                                                    onChange={(e) =>
                                                        setFormAddUser(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    value={formAddUser.email}
                                                    type="email"
                                                />
                                            </Stack>
                                            <Stack flex={1}>
                                                <Input
                                                    onChange={(e) =>
                                                        setFormAddUser(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                tel: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    value={formAddUser.tel}
                                                />
                                            </Stack>
                                            <Spacer />
                                            <Stack w="max-content">
                                                <Button
                                                    onClick={() => {
                                                        // TODO: update state
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </FormControl>
                                ) : null}

                                {/* <Stack direction="row" justify="center">
                                    <IconButton
                                        aria-label="Search database"
                                        variant="outline"
                                        colorScheme="gray"
                                        rounded="full"
                                        w="max-content"
                                        onClick={() => {
                                            setIsShowFormAddUser(true);
                                            // setIsShowFormAddUser(
                                            //     !isShowFormAddUser
                                            // );
                                        }}
                                        icon={<SmallAddIcon />}
                                    />
                                </Stack> */}
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