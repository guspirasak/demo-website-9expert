'use client'

import { Heading, Stack } from "@chakra-ui/react"
import { RegisterInput, RegisterSelect, RegisterTextarea } from "../../components/RegisterInput"
import { MonthList } from "@/libs/GlobalData"
import { useEffect, useState } from "react"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { getAllCourse } from "@/libs/AdminAPI"
import { IRegisterInhouseContext, useRegisterInhouse } from "../../context/RegisterInouseContext"
import { IValidateRegisterInhouseContext, useValidateRegisterInhouse } from "../../context/RegisterInhouseValidateContext"
import { useSearchParams } from "next/navigation"
import { isNumeric } from "validator"


export const RegisterForm = () => {

    const { state, setState }: IRegisterInhouseContext = useRegisterInhouse()
    const { validate }: IValidateRegisterInhouseContext = useValidateRegisterInhouse()

    const [course, setCourse] = useState<TCourseCard[]>()

    const id = useSearchParams()?.get('course')

    useEffect(() => {
        getAllCourse((data: TCourseCard[], error: unknown) => {
            if (error) {
                return console.log(error)
            }

            if (id) {
                setState(prev => ({ ...prev, courseId: id }))
            }

            setCourse(data)
        })
    }, [id])

    return (
        <Stack w='100%'
            spacing='4rem'>
            <Stack
                w='100%'
                h='100%'
                spacing='1rem'

            >
                <Heading
                    w='100%'
                    fontSize={{ base: '1.25rem', lg: '2rem' }}
                    borderBottom='1px'
                    borderColor='#B6B6B6'
                >
                    ข้อมูลติดต่อเบื้องต้น
                </Heading>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}

                >
                    <RegisterSelect
                        heading='หลักสูตรที่น่าสนใจ'
                        placeholder='เลือกหลักสูตร'
                        isRequired
                        isInvalid={validate.isCourseId}
                        value={course?.filter(value => value._id === id)[0]?._id}
                        isDisabled={id ? true : false}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setState(prev => ({ ...prev, courseId: e.target.value }))
                        }}
                    >
                        {
                            course?.map((value, index) => (
                                <option
                                    key={index}
                                    value={value._id}
                                >
                                    {value.courseName}
                                </option>
                            ))
                        }
                    </RegisterSelect>
                    <RegisterInput
                        placeholder='1'
                        isRequired
                        type='number'
                        value={`${state?.numberPerson}`}
                        isInvalid={validate.isNumberPerson}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let newValue = Number(e.target.value)
                            
                            if(newValue < 1) newValue = 1

                            setState(prev => ({ ...prev, numberPerson: newValue }))
                        }}
                    >
                        {`จำนวนผู้สมัคร`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}

                >
                    <RegisterSelect
                        heading="เดือนที่ต้องการอบรม"
                        isRequired
                        placeholder="เลือกเดือนที่ต้องการอบรม"
                        value={`${state?.monthRequest}`}
                        isInvalid={validate.isMonthRequest}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setState(prev => ({ ...prev, monthRequest: e.target.value }))
                        }}
                    >
                        {
                            MonthList.map((value, index) => (
                                <option
                                    key={index}
                                    value={value}
                                >
                                    {value}
                                </option>
                            ))
                        }
                    </RegisterSelect>
                    <RegisterSelect
                        heading="รูปแบบการอบรม"
                        isRequired
                        placeholder="เลือกรูปแบบการอบรม"
                        value={`${state?.typeForTrain}`}
                        isInvalid={validate.isTypeForTrain}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setState(prev => ({ ...prev, typeForTrain: e.target.value }))
                        }}
                    >
                        <option value='Onsite'>{`Onsite`}</option>
                        <option value='Online'>{`Live ผ่าน Microsoft Team`}</option>
                    </RegisterSelect>
                </Stack>
                {
                    state.typeForTrain === 'Onsite' && (
                        <>
                            <Stack
                                direction={{ base: 'column', lg: 'row' }}
                                w='100%'
                                h='100%'
                                spacing={{ base: '1rem', lg: '2rem' }}

                            >
                                <RegisterTextarea
                                    placeholder='รายละเอียดสถานที่จัดอบรม'
                                    isRequired
                                    value={state.trainAddressLine}
                                    isInvalid={validate.isTrainAddressLine}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setState(prev => ({ ...prev, trainAddressLine: e.target.value }));
                                    }}
                                >
                                    {`รายละเอียดสถานที่จัดอบรม`}
                                </RegisterTextarea>
                            </Stack>
                            <Stack
                                direction={{ base: 'column', lg: 'row' }}
                                w='100%'
                                h='100%'
                                spacing={{ base: '1rem', lg: '2rem' }}
                            >
                                <RegisterInput
                                    placeholder='ระบุจังหวัด'
                                    isRequired
                                    value={`${state?.trainAddress.province}`}
                                    isInvalid={validate.isTrainAddress.isProvince}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setState(prev => ({ ...prev, trainAddress: { ...prev.trainAddress, province: e.target.value } }))
                                    }}
                                >
                                    {`จังหวัด`}
                                </RegisterInput>
                                <RegisterInput
                                    placeholder='ระบุเขต / อำเภอ'
                                    isRequired
                                    value={`${state?.trainAddress.district}`}
                                    isInvalid={validate.isTrainAddress.isDistrict}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setState(prev => ({ ...prev, trainAddress: { ...prev.trainAddress, district: e.target.value } }))
                                    }}
                                >
                                    {`เขต / อำเภอ`}
                                </RegisterInput>
                            </Stack>
                            <Stack
                                direction={{ base: 'column', lg: 'row' }}
                                w='100%'
                                h='100%'
                                spacing={{ base: '1rem', lg: '2rem' }}

                            >
                                <RegisterInput
                                    placeholder='ระบุแขวง / ตำบล'
                                    isRequired
                                    value={`${state?.trainAddress.subdistrict}`}
                                    isInvalid={validate.isTrainAddress.isSubdistrict}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setState(prev => ({ ...prev, trainAddress: { ...prev.trainAddress, subdistrict: e.target.value } }))
                                    }}
                                >
                                    {`แขวง / ตำบล`}
                                </RegisterInput>
                                <RegisterInput
                                    placeholder='ระบุรหัสไปรษณีย์'
                                    isRequired
                                    value={`${state?.trainAddress.postcode}`}
                                    isInvalid={validate.isTrainAddress.isPostcode}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const newValue = e.target.value;
                                        if (/^\d{0,5}$/.test(newValue)) {
                                            setState(prev => ({ ...prev, trainAddress: { ...prev.trainAddress, postcode: e.target.value } }))
                                        }
                                    }}
                                >
                                    {`รหัสไปรษณีย์`}
                                </RegisterInput>
                            </Stack>
                        </>
                    )
                }
            </Stack>
            <Stack
                w='100%'
                h='100%'
                spacing={{ base: '1rem', lg: '2rem' }}
            >
                <Heading
                    w='100%'
                    pb='1rem'
                    fontSize={{ base: '1.25rem', lg: '2rem' }}
                    borderBottom='1px'
                    borderColor='#B6B6B6'
                >
                    {`ข้อมูลผู้ลงทะเบียน/ผู้ประสานงาน`}
                </Heading>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}

                >
                    <RegisterInput
                        placeholder='ชื่อ'
                        isRequired
                        value={state.firstName}
                        isInvalid={validate.isFirstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, firstName: e.target.value }));
                        }}
                    >
                        {`ชื่อ`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='นามสกุล'
                        isRequired
                        value={state.lastName}
                        isInvalid={validate.isLastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, lastName: e.target.value }));
                        }}
                    >
                        {`นามสกุล`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}

                >
                    <RegisterInput
                        placeholder='Email'
                        isRequired
                        value={state.personalEmail}
                        isInvalid={validate.isPersonalEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, personalEmail: e.target.value }));
                        }}
                    >
                        {`Email`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='ระบุเบอร์โทรศัพท์'
                        isRequired
                        value={state.telephone}
                        isInvalid={validate.isTelephone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // only is number
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                if (value.length > 0) {
                                    // check first-digit is 0
                                    if (value[0] !== '0') {
                                        // setError('เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0');
                                        return;
                                    }
                                }

                                setState(prev => ({ ...prev, telephone: e.target.value }));
                            }
                        }}
                    >
                        {`เบอร์โทรศัพท์`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}

                >
                    <RegisterInput
                        placeholder='ตำแหน่ง'
                        isRequired
                        value={state.position}
                        isInvalid={validate.isPosition}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, position: e.target.value }));
                        }}
                    >
                        {`ตำแหน่ง`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='แผนก'
                        isRequired
                        value={state.department}
                        isInvalid={validate.isDepartment}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, department: e.target.value }));
                        }}
                    >
                        {`แผนก`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterInput
                        placeholder='ชื่อเต็มบริษัท'
                        isRequired
                        value={state.companyName}
                        isInvalid={validate.isCompanyName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyName: e.target.value }));
                        }}
                    >
                        {`ชื่อบริษัทที่ใช้การใบออกกำกับภาษี`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='สำนักงานใหญ่'
                        isRequired
                        value={state.companyBranchName}
                        isInvalid={validate.isCompanyBranchName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyBranchName: e.target.value }));
                        }}
                    >
                        {`สาขา`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterInput
                        placeholder='ระบุ Email บริษัท'
                        isRequired
                        value={state.companyEmail}
                        isInvalid={validate.isCompanyEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyEmail: e.target.value }));
                        }}
                    >
                        {`Email บริษัท`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='ระบุเบอร์โทรศัพท์ของบริษัท'
                        isRequired
                        value={state.companyTelephone}
                        isInvalid={validate.isCompanyTelephone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // only is number
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                if (value.length > 0) {
                                    // check first-digit is 0
                                    if (value[0] !== '0') {
                                        // setError('เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0');
                                        return;
                                    }
                                }

                                setState(prev => ({ ...prev, companyTelephone: e.target.value }));
                            }
                        }}
                    >
                        {`เบอร์โทรศัพท์ของบริษัท`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterInput
                        placeholder='เลขประจำตัวผู้เสียภาษี'
                        isRequired
                        value={state.companyTaxId}
                        isInvalid={validate.isCompanyTaxId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // only is number
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setState(prev => ({ ...prev, companyTaxId: e.target.value }));
                            }
                        }}
                    >
                        {`เลขประจำตัวผู้เสียภาษี`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterTextarea
                        placeholder='ที่อยู่สำหรับออกใบกำกับภาษี'
                        isRequired
                        value={state.companyAddressLine}
                        isInvalid={validate.isCompanyAddressLine}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setState(prev => ({ ...prev, companyAddressLine: e.target.value }));
                        }}
                    >
                        {`ที่อยู่สำหรับออกใบกำกับภาษี`}
                    </RegisterTextarea>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterInput
                        placeholder='จังหวัด'
                        isRequired
                        value={state.companyAddress.province}
                        isInvalid={validate.isCompanyAddress.isProvince}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyAddress: { ...prev.companyAddress, province: e.target.value } }));
                        }}
                    >
                        {`จังหวัด`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='เขต / อำเภอ'
                        isRequired
                        value={state.companyAddress.district}
                        isInvalid={validate.isCompanyAddress.isDistrict}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyAddress: { ...prev.companyAddress, district: e.target.value } }));
                        }}
                    >
                        {`เขต / อำเภอ`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterInput
                        placeholder='แขวง / ตำบล'
                        isRequired
                        value={state.companyAddress.subdistrict}
                        isInvalid={validate.isCompanyAddress.isSubdistrict}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState(prev => ({ ...prev, companyAddress: { ...prev.companyAddress, subdistrict: e.target.value } }));
                        }}
                    >
                        {`แขวง / ตำบล`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='รหัสไปรษณีย์'
                        isRequired
                        value={state.companyAddress.postcode}
                        isInvalid={validate.isCompanyAddress.isPostcode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = e.target.value;
                            if (/^\d{0,5}$/.test(newValue)) {
                                setState(prev => ({ ...prev, companyAddress: { ...prev.companyAddress, postcode: newValue } }));
                            }
                            // setState(prev => ({ ...prev, companyAddress: { ...prev.companyAddress, postcode: e.target.value } }));
                        }}
                    >
                        {`รหัสไปรษณีย์`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <RegisterTextarea
                        placeholder='หมายเหตุ'
                        value={state.note}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setState(prev => ({ ...prev, note: e.target.value }));
                        }}
                    >
                        หมายเหตุ
                    </RegisterTextarea>
                </Stack>
            </Stack>
        </Stack>
    )
}