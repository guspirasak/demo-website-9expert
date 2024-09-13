'use client'

import { Button, Container, Heading, HStack, Input, InputGroup, InputRightAddon, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TPromotion } from "../../interface/PromotionInterface"
import { createPromotion, getPromotionById, updatePromotion } from "@/libs/AdminAPI"
import { useRouter, useSearchParams } from "next/navigation"
import moment from "moment"

export const CreatePromotionPage = () => {

    const action = useSearchParams().get('action')
    const id = useSearchParams().get('id')
    const toast = useToast()
    const router = useRouter()

    const [ state, setState ] = useState<TPromotion>({
        name: '',
        code: '',
        type: 'AMOUNT',
        value: 0,
        usage: 0,
        maxUsage: '-1',
        minPrice: 0,
        status: 'Inactive',
        startAt: '',
        expireAt: '',
    })

    const [radioState, setRadioState] = useState({
        promotionAmount: 'INFINITE',
        promotionCondition: 'FALSE',
        promotionExpire: 'INFINITE'
    })

    useEffect(() => {
        if (radioState.promotionAmount === 'INFINITE') {
            setState({ ...state, maxUsage: '-1' })
        }

        if (radioState.promotionCondition === 'FALSE') {
            setState({ ...state, minPrice: 0 })
        }

        if (radioState.promotionExpire === 'INFINITE') {
            setState({ ...state, expireAt: '', startAt: '' })
        }
    }, [radioState])
    
    useEffect(() => {
        if (action === 'edit' && !id) router.push('/admin?tab=promotion&sub=promotion')

        if (action === 'edit' && id) {
            getPromotionById(id, (data: TPromotion, error: unknown) => {
                if (error) {
                    console.log(error)
                    return
                }
                setState(data)
                setRadioState({
                    promotionAmount: data.maxUsage === '-1' ? 'INFINITE' : 'AMOUNT',
                    promotionCondition: data.minPrice === 0 ? 'FALSE' : 'TRUE',
                    promotionExpire: data.expireAt === '' ? 'INFINITE' : 'EXPIRE',
                })
            })
        }
    }, [action, id])

    const CreatePromotion = async () => {
        await createPromotion(state, (data: TPromotion, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถสร้างโปรโมชั่นได้ กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            router.push('/admin?tab=promotion&sub=pm&action=result')
            
        })
    }

    const handleUpdatePromotion = async () => {
        await updatePromotion( id as string, state, (data: TPromotion, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถแก้ไขโปรโมชั่นได้ กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            router.push('/admin?tab=promotion&sub=pm&action=result&id=' + id)
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
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
                    <Heading>{`โปรโมชั่นหลักสูตร`}</Heading>
                </HStack>
                <Stack
                    w='80%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='50px'
                    py='40px'
                    spacing='50px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`ชื่อโปรโมชั่น :`}
                        </Text>
                        <Input 
                            w='80%'
                            h='60px'
                            borderColor='#C1C1C1'
                            value={state.name}
                            onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`รหัสโปรโมชั่น : `}
                        </Text>
                        <Input
                            w='80%'
                            h='60px'
                            borderColor='#C1C1C1'
                            value={state.code}
                            onChange={(e) => setState(prev => ({ ...prev, code: e.target.value }))}
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`ประเภทส่วนลด : `}
                        </Text>
                        <RadioGroup
                            defaultValue={state.type}
                            onChange={(e) => setState(prev => ({ ...prev, type: e }))}
                        >
                            <Stack
                                w='100%'
                                h='70px'
                                direction='row'
                                px='20px'
                                spacing='16px'
                            >
                                <Radio 
                                    size='lg' 
                                    name='AMOUNT'
                                    value="AMOUNT"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ลดแบบจำนวนเงิน`}
                                </Radio>
                                <Radio 
                                    size='lg' 
                                    name='PERCENTAGE'
                                    value="PERCENTAGE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ลดแบบเปอร์เซ็น`}
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`จำนวนส่วนลด : `}
                        </Text>
                        <InputGroup
                            w='80%'
                            h='60px'
                        >
                            <Input
                                h='60px'
                                borderColor='#C1C1C1'
                                value={state.value}
                                onChange={(e) => setState(prev => ({ ...prev, value: Number(e.target.value) }))}
                            />
                            <InputRightAddon
                                w='70px'
                                h='60px'
                            >
                                <Text
                                    w='100%'
                                    fontSize='20px'
                                    textColor='#000000'
                                    textAlign='center'
                                >
                                    {state.type.toLowerCase() === 'amount' ? '฿' : '%'} 
                                </Text>
                            </InputRightAddon>
                        </InputGroup>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`จำนวนโปรโมชั่น : `}
                        </Text>
                        <RadioGroup
                            value={radioState.promotionAmount}
                            w='40%'
                            onChange={(e) => setRadioState(prev => ({ ...prev, promotionAmount: e }))}
                        >
                            <Stack
                                w='100%'
                                h='70px'
                                direction='row'
                                px='20px'
                                spacing='16px'
                            >
                                <Radio
                                    size='lg'
                                    name='INFINITE'
                                    value="INFINITE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ไม่ระบุจำนวน`}
                                </Radio>
                                <Radio
                                    size='lg'
                                    name='AMOUNT'
                                    value="AMOUNT"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ระบุจำกัดจำนวน`}
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        {
                            radioState.promotionAmount === 'AMOUNT' &&
                            <Input
                                w='40%'
                                h='60px'
                                borderColor='#C1C1C1'
                                value={state.maxUsage}
                                onChange={(e) => setState(prev => ({ ...prev, maxUsage: e.target.value }))}
                            />
                        }
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`เงื่อนไขโปรโมชั่น : `}
                        </Text>
                        <RadioGroup
                            value={radioState.promotionCondition}
                            w='40%'
                            onChange={(e) => setRadioState(prev => ({ ...prev, promotionCondition: e }))}
                        >
                            <Stack
                                w='100%'
                                h='70px'
                                direction='row'
                                px='20px'
                                spacing='16px'
                            >
                                <Radio
                                    size='lg'
                                    name='FALSE'
                                    value="FALSE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ไม่มีขั้นต่ำ`}
                                </Radio>
                                <Radio
                                    size='lg'
                                    name='TRUE'
                                    value="TRUE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`มีขั้นต่ำ`}
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        {
                            radioState.promotionCondition === 'TRUE' &&
                            <InputGroup
                                w='40%'
                                h='60px'
                            >
                                <Input
                                    h='60px'
                                    borderColor='#C1C1C1'
                                    value={state.minPrice}
                                    onChange={(e) => setState(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                                />
                                <InputRightAddon
                                    w='70px'
                                    h='60px'
                                >
                                    <Text
                                        w='100%'
                                        fontSize='20px'
                                        textColor='#000000'
                                        textAlign='center'
                                    >
                                        {`฿`}
                                    </Text>
                                </InputRightAddon>
                            </InputGroup>
                        }
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='start'
                        direction='row'
                    >
                        <Text
                            w='20%'
                            fontSize='24px'
                            textColor='#1D2026'
                        >
                            {`กำหนดเวลา :`}
                        </Text>
                        <RadioGroup
                            value={radioState.promotionExpire}
                            w='40%'
                            onChange={(e) => setRadioState(prev => ({ ...prev, promotionExpire: e }))}
                        >
                            <Stack
                                w='100%'
                                h='70px'
                                direction='row'
                                px='20px'
                                spacing='16px'
                            >
                                <Radio
                                    size='lg'
                                    name='INFINITE'
                                    value="INFINITE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`ไม่กำหนดเวลา`}
                                </Radio>
                                <Radio
                                    size='lg'
                                    name='EXPIRE'
                                    value="EXPIRE"
                                    fontSize='24px'
                                    textColor='#2E2E2E'
                                >
                                    {`กำหนดเวลา`}
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        {
                            radioState.promotionExpire === 'EXPIRE' &&
                            <Stack
                                spacing='0'
                                w='40%'
                                direction='row'
                            >
                                <Input
                                    w='100%'
                                    h='60px'
                                    type='date'
                                    borderRadius='0'
                                    borderLeftRadius='15px'
                                    value={moment(state.startAt).format('YYYY-MM-DD')}
                                    onChange={(e) => setState(prev => ({ ...prev, startAt: e.target.value }))}
                                />
                                <Text
                                    display='flex'
                                    textAlign='center'
                                    alignItems='center'
                                    justifyContent='center'
                                    h='60px'
                                    minW='40px'
                                    border='1px'
                                    borderColor='exGray.100'
                                >{`ถึง`}</Text>
                                <Input
                                    w='100%'
                                    h='60px'
                                    type='date'
                                    borderRadius='0'
                                    borderRightRadius='15px'
                                    value={moment(state.expireAt).format('YYYY-MM-DD')}
                                    onChange={(e) => setState(prev => ({ ...prev, expireAt: e.target.value }))}
                                />
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Container>
            <HStack
                my='3rem'
                align='center'
                justify='space-between'
                w='100%'
                px='2.5rem'
            >
                <Button
                    w='250px'
                    h='50px'
                    fontSize='18px'
                    onClick={() => window.history.back()}
                >
                    {`ย้อนกลับ`}
                </Button>
                <Button
                    w='250px'
                    h='50px'
                    fontSize='18px'
                    bg='exBlue'
                    color='white'
                    onClick={action === 'create' ? CreatePromotion : handleUpdatePromotion}
                >
                    {`บันทึก`}
                </Button>
            </HStack>
        </Stack>
    )
}