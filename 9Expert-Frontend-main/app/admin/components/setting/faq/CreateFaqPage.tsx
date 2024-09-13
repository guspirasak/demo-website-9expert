'use client'

import { ICreateFaqContext, useCreateFaq } from "@/app/admin/context/CreateFaqContext"
import { TFaq } from "@/app/admin/interface/CreateFaqInterface"
import { DeleteIcon } from "@/app/icons/AdminIcon"
import { createFaq, getFaqById, updateFaq } from "@/libs/AdminAPI"
import { icons } from "@/libs/GlobalData"
import { AddIcon } from "@chakra-ui/icons"
import { Button, Container, Divider, Heading, Input, Stack, Wrap, WrapItem, Image, Text, Textarea, IconButton, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useEffect } from "react"

export const CreateFaqPage = () => {

    const { state, setState }: ICreateFaqContext = useCreateFaq()
    
    const id = useSearchParams().get('id')
    const action = useSearchParams().get('action')

    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        if (action === 'edit' && !id) {
            router.push('/admin?tab=setting&sub=faq')
        }
        
        if (action === 'edit' && id) {
            getFaqById(id, (data: TFaq, error: unknown) => {
                if (error) {
                    console.log(error)
                    return
                }
                setState(data)
            })
        }
    }, [id])

    const handleSave = async (form: TFaq) => {
        if (!form.title || !form.icon) {
            return toast({
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        }

        if (form.question.length === 0) {
            return toast({
                title: 'กรุณาเพิ่มคำถาม',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        }

        const newData = form.question.filter((q) => q.title && q)

        const filterEmptyQuestion = newData.filter((q) => {
            const newDes = q.description.filter((d) => d && d)
            q.description = newDes
            return q
        })

        form.question = filterEmptyQuestion

        if (action === 'create') {
            await createFaq(form, (data: TFaq, error: unknown) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'สร้างคำถามไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }

                toast({
                    title: 'สร้างคำถามสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                router.push('/admin?tab=setting&sub=faq')
            })
        }

        if (action === 'edit') {
            updateFaq(id as string, form, (data: TFaq, error: unknown) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'แก้ไขคำถามไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }

                toast({
                    title: 'แก้ไขคำถามสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=setting&sub=faq')
            })
        }
        
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            <Container
                maxW='95%'
                h='100%'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                    mt='30px'
                    spacing='34px'
                    bg='white'
                    borderRadius='20px'
                >
                    <Stack
                        w='100%'
                        align='center'
                        justify='space-between'
                        direction='row'
                        px='30px'
                        pt='30px'
                    >
                        <Heading
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`คำถามหลัก`}
                        </Heading>
                        <Heading
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`( ${state.question.length} / 4)`}
                        </Heading>
                    </Stack>
                    <Divider w='100%' />
                    <Stack
                        w='100%'
                        h='100%'
                        p='30px'
                        spacing='20px'
                    >
                        <Stack
                            w='100%'
                            spacing='20px'
                        >
                            <Heading
                                fontSize='24px'
                                fontWeight='600'
                                color='#2E2E2E'
                            >
                                {`อิโมจิ`}
                            </Heading>
                            <Wrap
                                spacing='40px'
                            >
                                {
                                    icons.map((item, i) => (
                                        <WrapItem
                                            key={i}
                                        >
                                            <Button
                                                w='60px'
                                                h='60px'
                                                p='0'
                                                bg='white'
                                                border='1px'
                                                borderColor='#00000033'
                                                borderRadius='5px'
                                                cursor='pointer'
                                                isActive={state.icon === item}
                                                onClick={() => setState({ ...state, icon: item })}
                                                _active={{
                                                    bg: '#EEEEEE',
                                                    border: '0'
                                                }}
                                                _hover={{
                                                    bg: '#EEEEEE',
                                                    border: '0'
                                                }}
                                            >
                                                <Image
                                                    w='30px'
                                                    h='30px'
                                                    src={item}
                                                />
                                            </Button>
                                        </WrapItem>
                                    ))
                                }
                            </Wrap>
                        </Stack>
                        <Stack
                            w='100%'
                            spacing='20px'
                            mb='40px'
                        >
                            <Heading
                                fontSize='24px'
                                fontWeight='600'
                                color='#2E2E2E'
                            >
                                {`หัวข้อคำถาม`}
                            </Heading>
                            <Input
                                w='100%'
                                h='60px'
                                placeholder="ระบุหัวข้อคำถาม..."
                                value={state.title}
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='start'
                    justify='center'
                    mt='30px'
                    spacing='34px'
                    bg='white'
                    borderRadius='20px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='space-between'
                        direction='row'
                        px='30px'
                        pt='30px'
                    >
                        <Heading
                            fontSize='36px'
                            fontWeight='600'
                        >
                            {`คำถามย่อย`}
                        </Heading>
                    </Stack>
                    <Divider w='100%' />
                    <Stack
                        w='100%'
                        h='100%'
                        p='30px'
                        spacing='20px'
                        pb='50px'
                    >
                        {
                            state.question.map((item, i) => (
                                <Fragment key={i}>
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        spacing='20px'
                                        position='relative'
                                    >
                                        <IconButton 
                                            aria-label="delete"
                                            variant='ghost'
                                            position='absolute'
                                            top='-20px'
                                            right='0px'
                                            icon={<DeleteIcon 
                                                w='20px' 
                                                h='20px' 
                                                color='red' 
                                            />}
                                            onClick={() => setState({ ...state, question: state.question.filter((_, index) => index !== i) })}
                                        />
                                        <Heading
                                            fontSize='24px'
                                            fontWeight='600'
                                            color='#2E2E2E'
                                        >
                                            {`${i + 1}.หัวข้อย่อย`}
                                        </Heading>
                                        <Input
                                            w='100%'
                                            h='60px'
                                            placeholder="ระบุหัวข้อคำถาม..."
                                            value={item.title}
                                            onChange={(e) => {
                                                const newQuestion = [...state.question]
                                                newQuestion[i].title = e.target.value
                                                setState({ ...state, question: newQuestion })
                                            }}
                                        />
                                        <Text
                                            fontSize='24px'
                                            fontWeight='600'
                                            color='#2E2E2E'
                                        >
                                            {`รายละเอียดคำตอบ`}
                                        </Text>
                                        <Textarea
                                            minH='150px'
                                            value={item.description.join('\n')}
                                            onChange={(e) => {
                                                const newQuestion = [...state.question]
                                                newQuestion[i].description = e.target.value.split('\n')
                                                setState({ ...state, question: newQuestion })
                                            }}
                                        />
                                    </Stack>
                                    <Divider w='100%' my='20px' />
                                </Fragment>
                            ))
                        }
                        {
                            state.question.length < 4 && (
                                <Button
                                    w='fit-content'
                                    h='70px'
                                    mt='70px'
                                    colorScheme='blue'
                                    variant='outline'
                                    leftIcon={<AddIcon />}
                                    fontSize='24px'
                                    fontWeight='500'
                                    onClick={() => {
                                        if (state.question.length < 4) {
                                            setState({ ...state, question: [...state.question, { title: '', description: [] }] })
                                        }
                                    }}
                                >
                                    {`เพิ่มหัวข้อย่อย`}
                                </Button>
                            )
                        }
                    </Stack>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction='row'
                    mb='30px'
                    mt='60px'
                >
                    <Button
                        as={Link}
                        href='/admin?tab=setting&sub=faq'
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
                        onClick={() => handleSave(state)}
                    >
                        {`บันทึก`}
                    </Button>
                </Stack>
            </Container>
        </Stack>
    )
}