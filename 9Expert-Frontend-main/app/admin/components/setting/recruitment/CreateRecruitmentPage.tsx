'use client'

import { TRecruitment } from "@/app/admin/interface/RecruitmentInterface"
import { createRecruitment, getRecruitmentById, updateRecruitmentById } from "@/libs/AdminAPI"
import { icons } from "@/libs/GlobalData"
import { Button, Container, Divider, Heading, Image, Input, Stack, Textarea, useToast, Wrap, WrapItem } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const CreateRecruitmentPage = () => {

    const [ state, setState ] = useState<TRecruitment>({
        icon: '',
        role: '',
        description: '',
        requirement: '',
    })

    const toast = useToast()
    const router = useRouter()

    const id = useSearchParams().get('id')
    const action = useSearchParams().get('action')

    useEffect(() => {
        if (action === 'edit' && !id) router.push('/admin?tab=setting&sub=recruitment')
        if (action === 'edit' && id) {
            getRecruitmentById(id, (data: TRecruitment, error: unknown) => {
                console.log(data)
                if (error) {
                    console.log(error)
                    return
                }
                setState(data)
            })
        }
    }, [id, action])

    const onHandleSave = async () => {
        if (action === 'create') {
            await createRecruitment(state, (data: TRecruitment, error: unknown) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'สร้างข้อมูลไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }

                toast({
                    title: 'สร้างข้อมูลสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=setting&sub=recruitment')
            })
        } else if (action === 'edit' && id) {
            await updateRecruitmentById(id, state, (data: TRecruitment, error: unknown) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'สร้างข้อมูลไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }

                toast({
                    title: 'สร้างข้อมูลสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                router.push('/admin?tab=setting&sub=recruitment')
            })
        } else {
            await createRecruitment(state, (data: TRecruitment, error: unknown) => {
                if (error) {
                    console.log(error)
                    return toast({
                        title: 'สร้างข้อมูลไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }

                toast({
                    title: 'สร้างข้อมูลสําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=setting&sub=recruitment')
            })
        }
    }

    return (
        <Stack
            w='100%'
            h='100%'
            position='relative'
        >
            <Container
                maxW='95%'
                h='100%'
            >
                <Stack
                    w='100%'
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
                                {`รับสมัครพนักงาน`}
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
                                h='100%'
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
                                h='100%'
                                spacing='20px'
                            >
                                <Heading
                                    fontSize='24px'
                                    fontWeight='600'
                                    color='#2E2E2E'
                                >
                                    {`ตำแหน่งงาน`}
                                </Heading>
                                <Input
                                    w='100%'
                                    h='60px'
                                    value={state.role}
                                    onChange={(e) => setState({ ...state, role: e.target.value })}
                                />
                            </Stack>
                            <Stack
                                w='100%'
                                h='100%'
                                spacing='20px'
                            >
                                <Heading
                                    fontSize='24px'
                                    fontWeight='600'
                                    color='#2E2E2E'
                                >
                                    {`บทบาทและความรับผิดชอบ`}
                                </Heading>
                                <Textarea
                                    minH='150px'
                                    value={state.description}
                                    onChange={(e) => setState({ ...state, description: e.target.value })}
                                />
                            </Stack>
                            <Stack
                                w='100%'
                                h='100%'
                                spacing='20px'
                            >
                                <Heading
                                    fontSize='24px'
                                    fontWeight='600'
                                    color='#2E2E2E'
                                >
                                    {`คุณสมบัติ`}
                                </Heading>
                                <Textarea
                                    minH='150px'
                                    value={state.requirement}
                                    onChange={(e) => setState({ ...state, requirement: e.target.value })}
                                />
                            </Stack>
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
                            onClick={onHandleSave}
                        >
                            {`บันทึก`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}