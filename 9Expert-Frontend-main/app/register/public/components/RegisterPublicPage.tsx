'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Box, Button, Center, Container, Heading, Stack, Text, useToast } from "@chakra-ui/react"
import { RegisterSteper } from "../../components/RegisterSteper"
import { useEffect, useState } from "react"
import { RegisterResult } from "./RegisterResult"
import { RegisterForm } from "./RegisterForm"
import { RegisterComplete } from "../../components/RegisterComplete"
import { useRegisterPublic } from "../../context/RegisterPublicContext"
import { useSearchParams } from "next/navigation"
import { TClassDetailWithCourse, TValidateRegisterPublic } from "../../interfaces/RegisterInterface"
import { getCourseDataForRegister, registerPublicCourse } from "@/libs/AdminAPI"
import { Footer } from "@/app/components/layout/Footer"
import { useValidateRegisterPublic } from "../../context/RegisterPublicValidateContext"
import { Validation } from "@/libs/Validation"
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

export const RegisterPublicPage = () => {
    const router = useRouter()

    const { state, setState } = useRegisterPublic()
    const { setValidate } = useValidateRegisterPublic()

    const [isInvalidTaxFirstName, setIsInvalidTaxFirstName] = useState(false)
    const [isInvalidTaxLastName, setIsInvalidTaxLastName] = useState(false)

    const [isInvalidTaxCompanyName, setIsInvalidTaxCompanyName] = useState(false)

    const [step, setStep] = useState(1)

    const [selectedClass, setSelectedClass] = useState<TClassDetailWithCourse>({
        course: {
            _id: '',
            courseId: '',
            courseName: '',
            courseNameAbbr: '',
            courseType: '',
        },
        classDetail: {
            courseId: '',
            classType: '',
            classStartDate: '',
            classEndDate: '',
            classStartTime: '',
            classEndTime: '',
            classCapacity: 0,
            classLocation: [],
            classTeamsURL: '',
            classStatus: '',
            classNote: '',
            classRoom: [],
        }
    })

    const id = useSearchParams().get('class')
    const toast = useToast()

    useEffect(() => {
        if (id) {
            getCourseDataForRegister(id, (data: TClassDetailWithCourse, error: unknown) => {
                if (error) {
                    return console.log(error)
                }

                setSelectedClass(data)
                setState(prev => ({
                    ...prev,
                    courseId: data.course._id as string,
                    classId: data.classDetail._id as string,
                    type: data.classDetail.classType,
                    formId: uuidv4().slice(0, 8),
                }))
            })
        }
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])

    const onNextStep = () => {

        const validateData = {
            type: state.type,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            numberPerson: state.numberPerson,
            // applyOnStatus: state.applyOnStatus,
            telephone: state.telephone,
            courseId: selectedClass.course._id,
            classId: selectedClass.classDetail._id,
            taxType: state.taxType,
            tax: {
                taxId: state.tax.taxId,
                addressLine: state.tax.addressLine,
                address: {
                    province: state.tax.address.province,
                    district: state.tax.address.district,
                    subdistrict: state.tax.address.subdistrict,
                    postcode: state.tax.address.postcode
                }
            },
        }

        const isTaxTypeCompany = state.taxType == 'company'
        if (isTaxTypeCompany) {
            // validate state.tax.companyName
            if (state.tax.companyName == '' || state.tax?.companyName?.trim() == '') {
                setIsInvalidTaxCompanyName(true)
                if (state.tax.companyName != state.tax.companyName.trim()) {
                    setState(prev => ({
                        ...prev,
                        tax: {
                            ...prev.tax,
                            companyName: state.tax.companyName?.trim()
                        }
                    }))
                }
            }else{
                setIsInvalidTaxCompanyName(false)
            }
        } else {
            // validate state.tax.firstName
            if (state.tax.firstName == '' || state.tax?.firstName?.trim() == '') {
                setIsInvalidTaxFirstName(true)
            }else{
                setIsInvalidTaxFirstName(false)
            }

            // validate state.tax.lastName
            if (state.tax.lastName == '' || state.tax?.lastName?.trim() == '') {
                setIsInvalidTaxLastName(true)
            }else{
                setIsInvalidTaxLastName(false)
            }
        }

        Validation(validateData, (val: TValidateRegisterPublic, empty: boolean) => {
            if (empty) {
                setValidate(val)
                console.log('empty', val);
                
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
        await registerPublicCourse(state, (data: TClassDetailWithCourse, error: unknown) => {
            if (error) {
                return console.log(error)
            }
            
            setStep(3)
        })
        
        await new Promise(f => setTimeout(f, 3000));
        // console.log('redirecting... to Home Page')
        router.push('/')
    }

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h='100%'
                minH='100vh'
                bg='#F6F9FC'
            >
                <Container
                    maxW={{ base: '100%', lg: '80%' }}
                >
                    <Center
                        w='100%'
                        h='60px'
                        mt='118px'
                        mb='87px'
                    >
                        <RegisterSteper step={step} />
                    </Center>
                    <Stack
                        w='100%'
                        h='100%'
                        p={{ base: '25px', lg: '55px' }}
                        mb='111px'
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
                                    <Center
                                        w='100%'
                                        gap='24px'
                                        flexDirection='column'
                                        mt='108px'
                                        mb='73px'
                                    >
                                        <Heading
                                            as='h1'
                                            fontSize='48px'
                                        >
                                            {`ลงทะเบียนเรียน`}
                                        </Heading>
                                        <Heading
                                            as='p'
                                            fontSize='32px'
                                        >
                                            {selectedClass.course.courseName}
                                        </Heading>
                                        <Text
                                            fontSize='24px'
                                            textColor='#817F7F'
                                        >
                                            {`กรุณากรอกข้อมูลเพื่อลงทะเบียนเรียน`}
                                        </Text>
                                    </Center>
                                    {/* Content */}
                                    {step === 1 && <RegisterForm isInvalidTaxFirstName={isInvalidTaxFirstName} isInvalidTaxLastName={isInvalidTaxLastName} isInvalidTaxCompanyName={isInvalidTaxCompanyName} setIsInvalidTaxFirstName={setIsInvalidTaxFirstName} setIsInvalidTaxLastName={setIsInvalidTaxLastName} setIsInvalidTaxCompanyName={setIsInvalidTaxCompanyName}  />}
                                    {step === 2 && <RegisterResult classDetail={selectedClass} />}
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        mt='260px'
                                        mb='76px'
                                        direction='row'
                                        justify='space-between'
                                        align='center'
                                    >
                                        <Button
                                            bg='gray.100'
                                            w='130px'
                                            h='56px'
                                            borderRadius='10px'
                                            color='#6E7485'
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
                            color='black'
                            dangerouslySetInnerHTML={{
                                __html: `
                            <span>ระบบจะพาท่านกลับไป<a href="/" style="color: #19B5FE; font-weight: bold; text-decoration: underline;">หน้าหลัก</a>ภายใน 5 วินาที</span>
                        ` }}
                        >

                        </Box>
                    }
                </Container>
            </Stack>
            <Footer />
        </>
    )
}