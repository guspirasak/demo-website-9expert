'use client'

import { useCreateBanner } from "@/app/admin/context/CreateBannerContext"
import { TBanner } from "@/app/admin/interface/CreateBanner"
import { AdminImageIcon } from "@/app/icons/AdminIcon"
import { createBanner, getBannerById, updateBanner } from "@/libs/AdminAPI"
import { imageToBase64 } from "@/libs/ImageToBase64"
import { CloseIcon } from "@chakra-ui/icons"
import { Container, Stack, Heading, Select, Button, Image, Text, IconButton, Input, useToast, Box } from "@chakra-ui/react"
import { filesize } from "filesize"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Loading } from "../../Loading"
import { ConvertYoutubeLinkToEmbed } from "@/libs/ConvertYoutubeLinkToEmbed"
import { useRouter, useSearchParams } from "next/navigation"

export const CreateBannerPage = () => {

    const { state, setState } = useCreateBanner()

    const [loading, setLoading] = useState(false)

    const action = useSearchParams().get('action')
    const id = useSearchParams().get('id')

    const inpurRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        if (!state.file.name || !state.file.size) {
            inpurRef.current!.value = ''
        }
    }, [state.file.name, state.file.size])

    useEffect(() => {

        if (action === 'edit' && !id) router.push('/admin?tab=setting&sub=banner')

        if (action === 'edit' && id) {
            getBannerById(id, (data: TBanner, error: unknown) => {
                if (error) {
                    console.log(error)
                    return
                }
                setState({ ...data, file: { name: data.name, size: 0 } })
            })
        }
    }, [action, id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files
        imageToBase64(file?.[0], (result: { file: string, image_url: string, error?: string }) => {

            if (result.error) {
                console.log(result.error)
            }

            setState({
                ...state,
                name: file?.[0].name as string,
                url: result.file,
                file: {
                    name: file?.[0].name as string,
                    size: file?.[0].size as number
                }
            })
        })
    }

    const handleSaveBanner = async () => {
        setLoading(true)
        if (action === 'create') {
            await createBanner(state, (data: TBanner, error: unknown) => {
                if (error) {
                    console.log(error)
                    setLoading(false)
                    return toast({
                        title: 'Upload แบนเนอร์ไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                setLoading(false)
                toast({
                    title: 'Upload แบนเนอร์สําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                router.push('/admin?tab=setting&sub=banner')
            })
        }

        if (action === 'edit') {
            await updateBanner(id as string, state, (data: TBanner, error: unknown) => {
                if (error) {
                    console.log(error)
                    setLoading(false)
                    return toast({
                        title: 'Upload แบนเนอร์ไม่สําเร็จ',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
                setLoading(false)
                toast({
                    title: 'Upload แบนเนอร์สําเร็จ',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })

                router.push('/admin?tab=setting&sub=banner')
            })
        }
    }

    return (
        <Stack
            w='100%'
            align='center'
            justify='center'
            spacing='0'
            position='relative'
        >
            {
                loading && (
                    <Loading />
                )
            }
            <Container
                maxW='95%'
            >
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Stack
                        w='100%'
                        h='fit-content'
                        align='start'
                        justify='center'
                        mt='30px'
                        spacing='34px'
                    >
                        <Stack
                            w='100%'
                            align='center'
                            justify='space-between'
                            direction='row'
                        >
                            <Heading
                                fontSize='36px'
                                fontWeight='600'
                            >
                                {`เพิ่มแบนเนอร์`}
                            </Heading>
                        </Stack>
                        <Stack
                            w='100%'
                            h='450px'
                            align='center'
                            justify='start'
                            borderRadius='20px'
                            bg='white'
                            py='24px'
                            px='28px'
                        >
                            <Stack
                                w='100%'
                                h='64px'
                                align='start'
                                justify='space-between'
                                direction='row'
                                borderBottom='1px'
                                borderColor='#C4C4C4'
                                pb='16px'
                            >
                                <Heading
                                    fontSize='32px'
                                    fontWeight='600'
                                    textColor='#2E2E2E'
                                >
                                    {`files`}
                                </Heading>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='start'
                                    justify='end'
                                    direction='row'
                                    spacing='10px'
                                >
                                    <Select
                                        w='368px'
                                        h='48px'
                                        value={state.type}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setState({
                                            type: e.target.value,
                                            url: '',
                                            name: '',
                                            page: 'homepage',
                                            file: {
                                                name: '',
                                                size: 0
                                            }
                                        })}
                                    >
                                        <option value="image">{`รูปภาพ`}</option>
                                        <option value="video">{`วิดีโอ`}</option>
                                    </Select>
                                    {
                                        state.type === 'image' &&
                                        <Button
                                            w='245px'
                                            h='48px'
                                            color='white'
                                            bg='exBlue'
                                            textDecoration='underline'
                                            onClick={() => inpurRef.current?.click()}
                                            _hover={{
                                                bg: 'exBlue'
                                            }}
                                            _active={{
                                                bg: 'exBlue'
                                            }}
                                        >
                                            {`choose file`}
                                        </Button>
                                    }
                                </Stack>
                            </Stack>
                            <Stack
                                w='100%'
                                h='100%'
                                align='start'
                                justify='center'
                            >
                                {
                                    state.type === 'image' &&
                                    <Stack
                                        direction='row'
                                        spacing='30px'
                                    >
                                        <Image
                                            w='300px'
                                            h='188px'
                                            borderRadius='20px'
                                            alt='upload banner'
                                            src={state.url || '/image_placholder.png'}
                                        />
                                        <Text
                                            noOfLines={3}
                                            maxW='30ch'
                                            textColor='exGray.500'
                                        >
                                            อัพโหลดภาพ Banner ของคุณที่นี่ <br/>
                                            ขนาดภาพที่แนะนำ : 530x300 px <br />
                                            รูปแบบที่รองรับ: .jpg, .jpeg หรือ .png
                                        </Text>
                                    </Stack>
                                }
                                {
                                    state.type === 'video' &&
                                    <Box
                                        as='iframe'
                                        w='300px'
                                        h='188px'
                                        bg='gray'
                                        borderRadius='26px'
                                        src={state.url}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    >
                                    </Box>
                                }
                                <Input
                                    ref={inpurRef}
                                    onChange={handleChange}
                                    type='file'
                                    hidden
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                />
                            </Stack>
                            {
                                state.type === 'video' &&
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='start'
                                    justify='start'
                                    spacing='20px'
                                    mt='20px'
                                >
                                    <Text
                                        fontSize='24px'
                                        fontWeight='600'
                                        textColor='#2E2E2E'
                                    >
                                        {`URL วิดีโอ`}
                                    </Text>
                                    <Input
                                        w='100%'
                                        h='60px'
                                        px='20px'
                                        py='20px'
                                        border='1px'
                                        borderColor='#C4C4C4'
                                        borderRadius='10px'
                                        value={state.url}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setState(prev => {
                                            return {
                                                ...prev,
                                                url: e.target.value
                                            }
                                        }
                                        )}
                                    />
                                </Stack>
                            }
                            {
                                state.type === 'image' &&
                                <Stack
                                    w='100%'
                                    h='90px'
                                    px='20px'
                                    py='20px'
                                    border='1px'
                                    borderColor='#C4C4C4'
                                    borderRadius='10px'
                                    direction='row'
                                    align='center'
                                    justify='space-between'
                                >
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                        spacing='15px'
                                    >
                                        {
                                            state.file.name &&
                                            <AdminImageIcon
                                                w='40px'
                                                h='40px'
                                                color='#19B5FE'
                                            />
                                        }
                                        <Text
                                            fontSize='20px'
                                            fontWeight='400'
                                            textColor='#717579'
                                        >
                                            {state.file.name}
                                        </Text>
                                    </Stack>
                                    {
                                        state.file.name &&
                                        <Stack
                                            w='100%'
                                            h='100%'
                                            align='center'
                                            justify='end'
                                            direction='row'
                                            spacing='30px'
                                        >
                                            <Text
                                                w='fit-content'
                                                h='50px'
                                                px='10px'
                                                display='flex'
                                                fontSize='20px'
                                                fontWeight='400'
                                                textColor='#817F7F'
                                                bg='#EDEDED80'
                                                textAlign='center'
                                                alignItems='center'
                                                justifyContent='center'
                                                borderRadius='5px'
                                            >
                                                {filesize(state.file.size)}
                                            </Text>
                                            <IconButton
                                                aria-label="delete"
                                                bg='#EDEDED80'
                                                w='50px'
                                                h='50px'
                                                borderRadius='full'
                                                icon={<CloseIcon w='15px' h='15px' color='#817F7F' />}
                                                onClick={() => {
                                                    setState(prev => ({ ...prev, name: '', url: '', file: { name: '', size: 0 } }))
                                                }}
                                            />
                                        </Stack>
                                    }
                                </Stack>
                            }
                        </Stack>
                    </Stack>
                    <Stack
                        w='100%'
                        h='450px'
                        align='center'
                        justify='start'
                        borderRadius='20px'
                        bg='white'
                        py='24px'
                        px='28px'
                        mt='30px'
                        spacing='30px'
                    >
                        <Stack
                            w='100%'
                            h='64px'
                            align='start'
                            justify='space-between'
                            direction='row'
                            borderBottom='1px'
                            borderColor='#C4C4C4'
                            pb='16px'
                        >
                            <Heading
                                fontSize='32px'
                                fontWeight='600'
                                textColor='#2E2E2E'
                            >
                                {`ข้อมูลแบนเนอร์`}
                            </Heading>
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            align='start'
                            justify='start'
                            spacing='20px'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#2E2E2E'
                            >
                                {`ชื่อแบนเนอร์`}
                            </Text>
                            <Input
                                w='100%'
                                h='80px'
                                value={state.name}
                                fontSize='20px'
                                fontWeight='500'
                                textColor='#2E2E2E'
                                borderColor='#C1C1C1'
                                onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            align='start'
                            justify='start'
                            spacing='20px'
                        >
                            <Text
                                fontSize='24px'
                                fontWeight='600'
                                textColor='#2E2E2E'
                            >
                                {`หน้าเพจ`}
                            </Text>
                            <Select
                                w='100%'
                                h='80px'
                                value={state.name}
                                fontSize='20px'
                                fontWeight='500'
                                textColor='#2E2E2E'
                                borderColor='#C1C1C1'
                                onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                            >
                                <option value='homepage'>{`Homepage`}</option>
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack
                        w='95%'
                        h='100%'
                        mt='140px'
                        mb='60px'
                        direction='row'
                        align='center'
                        justify='space-between'
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
                            onClick={() => window.history.back()}
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
                            onClick={handleSaveBanner}
                        >
                            {`บันทึก`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}