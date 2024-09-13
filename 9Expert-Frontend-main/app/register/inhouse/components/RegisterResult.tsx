'use client'

import { GreenRightWithCircleIcon } from "@/app/icons/RegisterIcons"
import { Stack, Heading, HStack, Text } from "@chakra-ui/react"
import { IRegisterInhouseContext, useRegisterInhouse } from "../../context/RegisterInouseContext"
import { useMemo, useState } from "react"
import { getCourseById } from "@/libs/AdminAPI"
import { TCourseCard } from "@/app/components/ContentCard/Card"

export const RegisterResult = () => {
    const { state }: IRegisterInhouseContext = useRegisterInhouse()
    const [course, setCourse] = useState<TCourseCard>()

    useMemo(async () => {
        await getCourseById(state.courseId, (data: TCourseCard, error: unknown) => {

            if (error) {
                return console.log(error)
            }
            setCourse(data)
        })
    }, [])

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='2rem'
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
                spacing='2rem'
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
                            {course?.courseName}
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
                            {
                                state.typeForTrain === 'Online' ? 'Live ผ่าน Microsoft Team' : 'Onsite'
                            }
                        </Text>
                    </HStack>
                </Stack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`เดือนที่อบรม : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {`${state.monthRequest}`}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`สถานที่จัดอบรม : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {`${state.trainAddressLine}`}
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
                        {state.personalEmail}
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
                spacing='2rem'
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
                        {`นิติบุคคล / บริษัท`}
                    </Text>
                </HStack>
                <HStack>
                    <Text
                        textColor='#2E2E2E'
                        fontSize='24px'
                    >
                        {`ชื่อบริษัท : `}
                    </Text>
                    <Text
                        textColor='#19B5FE'
                        fontSize='24px'
                        fontWeight='bold'
                    >
                        {state.companyName}
                    </Text>
                </HStack>
                <HStack>
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
                        {state.companyBranchName}
                    </Text>
                </HStack>
                <Stack
                    w='100%'
                    h='100%'
                    direction='row'
                    align='center'
                    spacing='2rem'
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
                            {state.companyAddress.province}
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
                            {state.companyAddress.district}
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
                            {state.companyAddress.subdistrict}
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
                            {state.companyAddress.postcode}
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
                        {state.companyTaxId}
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
                        {state.companyAddressLine}
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