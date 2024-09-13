'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Box, Button, Center, Container, Heading, Stack, Text, useToast } from "@chakra-ui/react"
import { RegisterSteper } from "../../components/RegisterSteper"
import { useEffect, useState } from "react"
import { RegisterResult } from "./RegisterResult"
import { RegisterForm } from "./RegisterForm"
import { RegisterComplete } from "../../components/RegisterComplete"
import { useRegisterInhouse } from "../../context/RegisterInouseContext"
import { registerInhouseCourse } from "@/libs/AdminAPI"
import { TClassDetailWithCourse, TValidateRegisterInhouse } from "../../interfaces/RegisterInterface"
import { Validation } from "@/libs/Validation"
import { useValidateRegisterInhouse } from "../../context/RegisterInhouseValidateContext"
import { containerBreakpoints } from "@/config/theme"
import { useRouter } from 'next/navigation'

export const RegisterInhouseContent = () => {
    const router = useRouter()

    const { state } = useRegisterInhouse()
    const { setValidate } = useValidateRegisterInhouse()
    const [step, setStep] = useState(1)
    const toast = useToast()

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])


    const onNextStep = () => {
        let validateData = {}

        if (state.typeForTrain === 'Onsite') {
            validateData = {

                courseId: state.courseId,
                monthRequest: state.monthRequest,
                numberPerson: state.numberPerson,
                typeForTrain: state.typeForTrain,

                trainAddressLine : state.trainAddressLine,
                trainAddress : {
                    province: state.trainAddress.province,
                    district: state.trainAddress.district,
                    subdistrict: state.trainAddress.subdistrict,
                    postcode: state.trainAddress.postcode
                },

                firstName: state.firstName,
                lastName: state.lastName,
                personalEmail: state.personalEmail,
                telephone: state.telephone,
                position: state.position,
                department: state.department,
                companyName: state.companyName,
                companyBranchName: state.companyBranchName,
                companyEmail: state.companyEmail,
                companyTelephone: state.companyTelephone,
                companyTaxId: state.companyTaxId,
                companyAddressLine: state.companyAddressLine,
                companyAddress: {
                    province: state.companyAddress.province,
                    district: state.companyAddress.district,
                    subdistrict: state.companyAddress.subdistrict,
                    postcode: state.companyAddress.postcode,

                }
            }
        } else {
            validateData = {
                courseId: state.courseId,
                monthRequest: state.monthRequest,
                numberPerson: state.numberPerson,
                typeForTrain: state.typeForTrain,

                firstName: state.firstName,
                lastName: state.lastName,
                personalEmail: state.personalEmail,
                telephone: state.telephone,
                position: state.position,
                department: state.department,
                companyName: state.companyName,
                companyBranchName: state.companyBranchName,
                companyEmail: state.companyEmail,
                companyTelephone: state.companyTelephone,
                companyTaxId: state.companyTaxId,
                companyAddressLine: state.companyAddressLine,
                companyAddress: {
                    province: state.companyAddress.province,
                    district: state.companyAddress.district,
                    subdistrict: state.companyAddress.subdistrict,
                    postcode: state.companyAddress.postcode,

                },
            }
        }

        Validation(validateData, async (val: TValidateRegisterInhouse, empty: boolean) => {
            if (empty) {
                setValidate(val)
                return toast({
                    title: 'Error',
                    description: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setStep(2)

            topFunction()
        })
    }

    const onRegister = async () => {
        await registerInhouseCourse(state, (data: TClassDetailWithCourse, error: unknown) => {
            if (error) {
                return console.error(error)
            }
            setStep(3)
        })
        
        await new Promise(f => setTimeout(f, 3000));
        // console.log('redirecting... to Home Page')
        router.push('/')
    }

    return (
        <Stack
            w='100%'
            align='center'
            justify='center'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bg='#0B345D'
        >
            <Container p={0} maxW={containerBreakpoints}>
                <RegisterSteper step={step} />
                <Stack
                    w='100%'
                    p={{ base: '1rem', lg: '2rem' }}
                    align='center'
                    justify='center'
                    bg='white'
                    borderRadius='20px'
                    boxShadow='lg'
                    color='#2E2E2E'
                >
                    {
                        step === 3 ?
                            <RegisterComplete />
                            :
                            <>
                                <Stack
                                    w='100%'
                                    flexDirection='column'
                                    textAlign="center"
                                    py="1rem"
                                >
                                    <Heading
                                        as='h1'
                                        fontSize={{ base: '1.75rem', lg: '3rem' }}
                                    >
                                        ลงทะเบียนสำหรับองค์กร
                                    </Heading>
                                    <Text
                                        fontSize={{ base: '1.25rem', lg: '2rem' }}
                                        textColor='#817F7F'
                                    >
                                        กรอกข้อมูลเพื่อลงทะเบียนเรียน
                                    </Text>
                                </Stack>
                                {/* Content */}
                                {step === 1 && <RegisterForm />}
                                {step === 2 && <RegisterResult />}
                                <Stack
                                    w='100%'
                                    h='100%'
                                    mt='2rem'
                                    direction='row'
                                    justify='space-between'
                                    align='center'
                                >
                                    <Button
                                        w='130px'
                                        h='56px'
                                        borderRadius='10px'
                                        color='#6E7485'
                                        bg='gray.100'
                                        onClick={() => step === 1 ? history.back() : setStep(step - 1)}
                                    >
                                        {
                                            step === 1 ? `ย้อนกลับ` : `แก้ไขข้อมูล`
                                        }
                                    </Button>
                                    <Button
                                        bg='#19B5FE'
                                        color='white'
                                        w='130px'
                                        h='56px'
                                        borderRadius='10px'
                                        onClick={step === 1 ? onNextStep : step === 2 ? onRegister : () => setStep(step + 1)}
                                        _hover={{ bg: '#19B5FE' }}
                                        _active={{ bg: '#19B5FE' }}
                                    >
                                        {
                                            step === 1 ? `บันทึก` : `ยืนยันข้อมูล`
                                        }
                                    </Button>
                                </Stack>
                            </>
                    }
                </Stack>
                {
                    step === 3 &&
                    <Box
                        w='100%'
                        h='100%'
                        mb='240px'
                        display='flex'
                        justifyContent='end'
                        alignItems='center'
                        color='white'
                        dangerouslySetInnerHTML={{
                            __html: `
                            <span>ระบบจะพาท่านกลับไป<a href="/" style="color: #19B5FE; font-weight: bold; text-decoration: underline;">หน้าหลัก</a>ภายใน 5 วินาที</span>
                        ` }}
                    >

                    </Box>
                }
            </Container>
        </Stack >
    )
}
