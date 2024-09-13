'use client'

import { GreenRightWithCircleIcon } from "@/app/icons/RegisterIcons"
import { Stack, Heading, HStack, Text } from "@chakra-ui/react"
import { useRegisterPublic } from "../../context/RegisterPublicContext"
import { TClassDetailWithCourse } from "../../interfaces/RegisterInterface"

export const RegisterResult = ({ classDetail }: { classDetail: TClassDetailWithCourse }) => {

    const { state } = useRegisterPublic()
    
    return (
        <Stack
            w='100%'
            h='100%'
            spacing='60px'
        >
            <HStack
                h='100%'
                borderBottom='1px'
                borderColor='#B6B6B6'
                pb='15px'
                align='center'
                justify='center'
            >
                <GreenRightWithCircleIcon w='33px' h='33px' />
                <Heading
                    w='100%'
                    fontSize='32px'
                >
                    {`โปรดตรวจสอบความถูกต้องของข้อมูล ก่อนกดลงทะเบียน`}
                </Heading>
            </HStack>
            <Stack
                w='100%'
                h='100%'
                spacing='40px'
            >
                <Heading
                    w='100%'
                    fontSize='32px'
                >
                    {`รายละเอียดหลักสูตร`}
                </Heading>
                <Stack
                    w='100%'
                    h='100%'
                    direction='row'
                    align='center'
                    justify='space-between'
                >
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`หลักสูตรที่ลงทะเบียน :`}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {classDetail.course.courseName}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`รูปแบบการอบรม : `}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {state.type}
                        </Text>
                    </HStack>
                </Stack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`วันที่อบรม : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {`${classDetail.classDetail.classStartDate} - ${classDetail.classDetail.classEndDate}`}
                    </Text>
                </HStack>
            </Stack>
            <Stack
                w='100%'
                h='100%'
                spacing='40px'
            >
                <Heading
                    w='100%'
                    fontSize='32px'
                >
                    {`รายละเอียดข้อมูลติดต่อ`}
                </Heading>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`ชื่อ - นามสกุล :`}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {`${state.firstName} ${state.lastName}`}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`Email : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.email}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`เบอร์โทรศัพท์ : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.telephone}
                    </Text>
                </HStack>
            </Stack>
            <Stack
                w='100%'
                h='100%'
                spacing='40px'
            >
                <Heading
                    w='100%'
                    fontSize='32px'
                >
                    {`รายละเอียดใบกำกับภาษี/ใบเสร็จรับเงิน`}
                </Heading>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`ประเภท :`}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {
                            state.taxType === "company" ? "นิติบุคคล / บริษัท" : "บุคคลทั่วไป"
                        }
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {
                            state.taxType === "company" ? `ชื่อบริษัท : ` : "ชื่อ - นามสกุล : "
                        }
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {
                            state.taxType === "company" ? state.tax.companyName : `${state.firstName} ${state.lastName}`
                        }
                    </Text>
                </HStack>
                {/* <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`สาขา : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {`สำนักงานใหญ่`}
                    </Text>
                </HStack> */}
                <Stack
                    w='100%'
                    h='100%'
                    direction='row'
                    align='center'
                    spacing='40px'
                >
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`จังหวัด : `}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {state.tax.address.province}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`เขต / อำเภอ : `}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {state.tax.address.district}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`แขวง / ตำบล : `}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {state.tax.address.subdistrict}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text
                            textColor='#2E2E2E'
                            fontSize='24px'
                        >
                            {`รหัสไปรษณีย์ : `}
                        </Text>
                        <Text
                            textColor='#19B5FE'
                            fontSize='24px'
                            fontWeight='bold'
                        >
                            {state.tax.address.postcode}
                        </Text>
                    </HStack>
                </Stack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`เลขประจำตัวผู้เสียภาษี : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.tax.taxId}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`ที่อยู่บริษัท : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.tax.addressLine}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`หมายเหตุ : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.note}
                    </Text>
                </HStack>
            </Stack>
        </Stack>
    )
}