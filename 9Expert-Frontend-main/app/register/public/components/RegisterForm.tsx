'use client'

import { Checkbox, HStack, Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { RegisterInput, RegisterSelect, RegisterTextarea } from "../../components/RegisterInput"
import { useRegisterPublic } from "../../context/RegisterPublicContext"
import { IValidateRegisterPublicContext, useValidateRegisterPublic } from "../../context/RegisterPublicValidateContext"


export const RegisterForm = ({isInvalidTaxFirstName,isInvalidTaxLastName,isInvalidTaxCompanyName, setIsInvalidTaxFirstName,setIsInvalidTaxLastName,setIsInvalidTaxCompanyName}: {isInvalidTaxFirstName: boolean,isInvalidTaxLastName: boolean,isInvalidTaxCompanyName: boolean, setIsInvalidTaxFirstName:Function,setIsInvalidTaxLastName:Function,setIsInvalidTaxCompanyName:Function}) => {

    const { state, setState } = useRegisterPublic()
    const { validate }: IValidateRegisterPublicContext = useValidateRegisterPublic()
    
    return (
        <>
            <Stack
                w='100%'
                h='100%'
                spacing='60px'
            >
                <Heading
                    w='100%'
                    pb='15px'
                    fontSize='32px'
                    borderBottom='1px'
                    borderColor='#B6B6B6'
                >
                    {`ข้อมูลติดต่อเบื้องต้น`}
                </Heading>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterInput
                        placeholder='ชื่อ'
                        isRequired
                        value={state.firstName}
                        isInvalid={validate.isFirstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                firstName: e.target.value
                            }))
                        }
                    >
                        {`ชื่อ`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='นามสกุล'
                        isRequired
                        value={state.lastName}
                        isInvalid={validate.isLastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                lastName: e.target.value
                            }))
                        }
                    >
                        {`นามสกุล`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterInput
                        placeholder='examples@email.com'
                        isRequired
                        type='email'
                        value={state.email}
                        isInvalid={validate.isEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }
                    >
                        {`E-mail`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='08x-xxx-xxxx'
                        isRequired
                        type='tel'
                        value={state.telephone}
                        isInvalid={validate.isTelephone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
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

                                // setError('');
    
                                setState(prev => ({
                                    ...prev,
                                    telephone: e.target.value
                                }))
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
                    spacing='57px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        spacing='30px'
                    >
                        <RegisterSelect
                            value={String(state.numberPerson)}
                            heading="จำนวนผู้สมัคร"
                            isRequired
                            isInvalid={validate.isNumberPerson}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setState(prev => ({
                                    ...prev,
                                    numberPerson: Number(e.target.value)
                                }))
                            }
                        >
                            {
                                [...Array(20)].map((_, index) => (
                                    <option
                                        key={index}
                                        value={index + 1}
                                    >
                                        {index + 1}
                                    </option>
                                ))
                            }
                        </RegisterSelect>
                        <Checkbox
                            borderColor='gray.400'
                            isChecked={state.applyOnStatus}
                            size='lg'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setState(prev => ({
                                    ...prev,
                                    applyOnStatus: e.target.checked
                                }))
                            }
                        >
                            {`ผู้ติดต่อเป็นท่านเดียวกับผู้อบรม`}
                        </Checkbox>
                    </Stack>
                    <Stack w='100%'></Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    spacing='30px'
                >
                    <HStack
                        w='100%'
                    >
                        <Text
                            as='h2'
                            textColor='#2E2E2E'
                            fontSize='24px'
                            fontWeight='semibold'
                        >
                            {`ใบเสนอราคา / ใบแจ้งหนี้`}
                        </Text>
                    </HStack>
                    <HStack
                        spacing='63px'
                    >
                        <Checkbox
                            borderColor='gray.400'
                            fontSize='24px'
                            textColor='black'
                            size='lg'
                            isChecked={state.requestReceipt}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setState(prev => ({
                                    ...prev,
                                    requestReceipt: e.target.checked
                                }))
                            }
                        >
                            {`ต้องการใบเสนอราคา`}
                        </Checkbox>
                        <Checkbox
                            borderColor='gray.400'
                            fontSize='24px'
                            textColor='black'
                            size='lg'
                            isChecked={state.requestInvoice}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setState(prev => ({
                                    ...prev,
                                    requestInvoice: e.target.checked
                                }))
                            }
                        >
                            {`ต้องการใบแจ้งหนี้`}
                        </Checkbox>
                    </HStack>
                </Stack>
            </Stack>
            {/* ใบกำกับภาษี / ใบเสร็จรับเงิน */}

            <Stack
                w='100%'
                h='100%'
                spacing='60px'
            >
                <Heading
                    w='100%'
                    pb='15px'
                    mt='160px'
                    fontSize='32px'
                    borderBottom='1px'
                    borderColor='#B6B6B6'
                >
                    {`ใบกำกับภาษี / ใบเสร็จรับเงิน`}
                </Heading>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        spacing='30px'
                        mt='59px'
                    >
                        <HStack
                            w='100%'
                        >
                            <Text
                                textColor='#2E2E2E'
                                fontSize='24px'
                                fontWeight='semibold'
                            >
                                {`ประเภท`}
                            </Text>
                            <Text
                                fontSize='24px'
                                fontWeight='semibold'
                                textColor='#FF4040'
                            >
                                {`*`}
                            </Text>
                        </HStack>
                        <RadioGroup
                        
                            value={state.taxType}
                            size='lg'
                            onChange={(e: string) =>
                                setState(prev => ({
                                    ...prev,
                                    taxType: e
                                }))
                            }
                        >
                            <HStack
                                spacing='63px'
                            >
                                <Radio
                                    borderColor='gray.400'
                                    fontSize='24px'
                                    textColor='black'
                                    value="personal"
                                >
                                    {`บุคคลทั่วไป`}
                                </Radio>
                                <Radio
                                    borderColor='gray.400'
                                    fontSize='24px'
                                    textColor='black'
                                    value="company"
                                >
                                    {`นิติบุลคล / บริษัท`}
                                </Radio>
                            </HStack>
                        </RadioGroup>
                    </Stack>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    {
                        state.taxType === "personal" ?
                            (
                                <>
                                    <RegisterInput
                                        placeholder='ชื่อ'
                                        isInvalid={isInvalidTaxFirstName}
                                        isRequired
                                        value={state.tax.firstName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            if(isInvalidTaxFirstName)
                                                setIsInvalidTaxFirstName(false)

                                            setState(prev => ({
                                                ...prev,
                                                tax: {
                                                    ...prev.tax,
                                                    firstName: e.target.value.trim()
                                                }
                                            }))
                                        }}
                                    >
                                        {`ชื่อ`}
                                    </RegisterInput>
                                    <RegisterInput
                                        placeholder='นามสกุล'
                                        isInvalid={isInvalidTaxLastName}
                                        isRequired
                                        value={state.tax.lastName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            if(isInvalidTaxLastName)
                                                setIsInvalidTaxLastName(false)

                                            setState(prev => ({
                                                ...prev,
                                                tax: {
                                                    ...prev.tax,
                                                    lastName: e.target.value.trim()
                                                }
                                            }))
                                        }}
                                    >
                                        {`นามสกุล`}
                                    </RegisterInput>
                                </>
                            )
                            :
                            (
                                <RegisterInput
                                    placeholder='ชื่อบริษัทที่ใช้การใบออกกำกับภาษี'
                                    isRequired
                                    isInvalid={isInvalidTaxCompanyName}
                                    value={state.tax.companyName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if(isInvalidTaxCompanyName)
                                            setIsInvalidTaxCompanyName(false)

                                        setState(prev => ({
                                            ...prev,
                                            tax: {
                                                ...prev.tax,
                                                companyName: e.target.value
                                            }
                                        }))
                                    }}
                                >
                                    {`ชื่อบริษัทที่ใช้การใบออกกำกับภาษี`}
                                </RegisterInput>
                            )
                    }
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterInput
                        placeholder='เลขประจำตัวผู้เสียภาษี'
                        isRequired
                        value={state.tax.taxId}
                        isInvalid={validate.isTax.isTaxId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // only is number
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                // setError('');
                                setState(prev => ({
                                    ...prev,
                                    tax: {
                                        ...prev.tax,
                                        taxId: e.target.value
                                    }
                                }))
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
                    spacing='57px'
                >
                    <RegisterTextarea
                        placeholder='ที่อยู่สำหรับออกใบกำกับภาษี'
                        isRequired
                        value={state.tax.addressLine}
                        isInvalid={validate.isTax.isAddressLine}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setState(prev => ({
                                ...prev,
                                tax: {
                                    ...prev.tax,
                                    addressLine: e.target.value
                                }
                            }))
                        }
                    >
                        {`ที่อยู่สำหรับออกใบกำกับภาษี`}
                    </RegisterTextarea>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterInput
                        placeholder='จังหวัด'
                        isRequired
                        value={state.tax.address.province}
                        isInvalid={validate.isTax.isAddress.isProvince}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                tax: {
                                    ...prev.tax,
                                    address: {
                                        ...prev.tax.address,
                                        province: e.target.value
                                    }
                                }
                            }))
                        }
                    >
                        {`จังหวัด`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='เขต / อำเภอ'
                        isRequired
                        value={state.tax.address.district}
                        isInvalid={validate.isTax.isAddress.isDistrict}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                tax: {
                                    ...prev.tax,
                                    address: {
                                        ...prev.tax.address,
                                        district: e.target.value
                                    }
                                }
                            }))
                        }
                    >
                        {`เขต / อำเภอ`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterInput
                        placeholder='แขวง / ตำบล'
                        isRequired
                        value={state.tax.address.subdistrict}
                        isInvalid={validate.isTax.isAddress.isSubdistrict}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setState(prev => ({
                                ...prev,
                                tax: {
                                    ...prev.tax,
                                    address: {
                                        ...prev.tax.address,
                                        subdistrict: e.target.value
                                    }
                                }
                            }))
                        }
                    >
                        {`แขวง / ตำบล`}
                    </RegisterInput>
                    <RegisterInput
                        placeholder='รหัสไปรษณีย์'
                        isRequired
                        value={state.tax.address.postcode}
                        isInvalid={validate.isTax.isAddress.isPostcode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // only is number
                            const value = e.target.value;
                            if (/^\d{0,5}$/.test(value)) {
                                // setError('');

                                setState(prev => ({
                                    ...prev,
                                    tax: {
                                        ...prev.tax,
                                        address: {
                                            ...prev.tax.address,
                                            postcode: e.target.value
                                        }
                                    }
                                }))
                            }
                        }}
                    >
                        {`รหัสไปรษณีย์`}
                    </RegisterInput>
                </Stack>
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    w='100%'
                    h='100%'
                    spacing='57px'
                >
                    <RegisterTextarea
                        placeholder='หมายเหตุ'
                        value={state.note}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setState(prev => ({
                                ...prev,
                                note: e.target.value
                            }))
                        }
                    >
                        {`หมายเหตุ`}
                    </RegisterTextarea>
                </Stack>
            </Stack>
        </>
    )
}