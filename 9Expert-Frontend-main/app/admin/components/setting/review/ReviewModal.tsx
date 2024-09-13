'use client'

import { AdminUploadImageIcon } from "@/app/icons/AdminIcon"
import { createReview } from "@/libs/AdminAPI"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { AddIcon } from "@chakra-ui/icons"
import { Button, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { Loading } from "../../Loading"
import { TCreateReview } from "@/app/admin/interface/ReviewInterface"
import { SetAverageStars } from "@/app/components/AverageStar"

export const ReviewModal = ({ setUpdate }: { setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [state, setState] = useState<TCreateReview>({
        name: '',
        rating: 0,
        description: '',
        image: '',
        file: {
            name: '',
            size: 0
        }
    })

    const [loading, setLoading] = useState(false)

    const inpurRef = useRef<HTMLInputElement>(null)

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        imageToBase64(file, (result: TImageToBase64Result) => {

            if (result.error) {
                return toast({
                    title: 'กรุณาเลือกรูปภาพ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setState(prev => ({
                ...prev,
                image: result.file as string,
                file: {
                    name: file?.name as string,
                    size: file?.size as number
                }
            }))
        })
    }

    const onHandleSave = async () => {
        setLoading(true)
        await createReview(state, (data: TCreateReview, error: string) => {

            if (error) {
                setLoading(false)
                return toast({
                    title: 'อัปโหลดรูปภาพไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setLoading(false)
            setUpdate(prev => !prev)
            toast({
                title: 'อัปโหลดรูปภาพสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setState({
                name: '',
                rating: 0,
                description: '',
                image: '',
                file: {
                    name: '',
                    size: 0
                }
            })
            onClose()
        })
    }

    const handleSetRating = (value: number) => {
        setState(prev => ({
            ...prev,
            rating: value
        }))
    }

    return (
        <>
            <HStack>
                <Button
                    leftIcon={<AddIcon w='14px' h='14px' color='white' />}
                    color='white'
                    bg='exBlue'
                    onClick={onOpen}
                    _hover={{
                        bg: 'exBlue'
                    }}
                    _active={{
                        bg: 'exBlue'
                    }}
                >
                    {`สร้างรีวิว`}
                </Button>
            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size='6xl'
            >
                <ModalOverlay />
                <ModalContent>
                    {
                        loading &&
                        <Loading />
                    }
                    <ModalHeader
                        fontSize='36px'
                        textColor='#2E2E2E'
                        fontWeight='500'
                    >
                        {`เพิ่มรีวิว`}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack
                            w='100%'
                            h='100%'
                            spacing='30px'
                        >
                            <Stack
                                w='100%'
                                h='100%'
                                align='start'
                                justify='center'
                                py='30px'
                                direction='row'
                                spacing='30px'
                            >
                                <Stack
                                    minW='25ch'
                                    spacing='20px'
                                >
                                    <Input
                                        type='file'
                                        ref={inpurRef}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        onChange={handleUploadImage}
                                        hidden
                                    />
                                    {
                                        state.image ?
                                            <Image
                                                w='200px'
                                                h='200px'
                                                minW='200px'
                                                src={state.image}
                                                cursor='pointer'
                                                onClick={() => inpurRef.current?.click()}
                                            />
                                            :
                                            <Stack
                                                w='200px'
                                                h='200px'
                                                minW='200px'
                                                align='center'
                                                justify='center'
                                                bg='#F5F5F5'
                                                border='1px'
                                                borderStyle='dashed'
                                                borderColor='#D6D6D6'
                                                borderRadius='20px'
                                                cursor='pointer'
                                                onClick={() => inpurRef.current?.click()}
                                            >
                                                <AdminUploadImageIcon
                                                    w='82px'
                                                    h='82px'
                                                    color='#817F7F'
                                                />
                                                <Text
                                                    fontSize='24px'
                                                    fontWeight='600'
                                                    textColor='#19B5FE'
                                                    textDecoration='underline'
                                                >
                                                    {`อัปโหลดรูปภาพ`}
                                                </Text>
                                            </Stack>
                                    }
                                    <Text
                                        textColor='exGray.500'
                                        fontSize='14px'
                                    >
                                        อัพโหลดภาพ Banner ของคุณที่นี่ <br />
                                        ขนาดภาพที่แนะนำ : 200x200 px <br />
                                        รูปแบบที่รองรับ: <br /> .jpg, .jpeg .png หรือ .webp
                                    </Text>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='center'
                                    py='30px'
                                >
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='start'
                                        justify='center'
                                        spacing='15px'
                                    >
                                        <Text
                                            fontSize='24px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ชื่อ - นามสกุล :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='71px'
                                            fontSize='20px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.name}
                                            placeholder="ระบุชื่อ-นามสกุล..."
                                            onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                                            _placeholder={{
                                                color: '#817F7F',
                                                fontSize: '20px'
                                            }}
                                        />
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='start'
                                        justify='center'
                                        spacing='15px'
                                    >
                                        <Text
                                            fontSize='24px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`เรตติ้งการให้คะแนน :`}
                                        </Text>
                                        <SetAverageStars setRating={handleSetRating} />
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        h='100%'
                                        align='start'
                                        justify='center'
                                        spacing='15px'
                                    >
                                        <Text
                                            fontSize='24px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`รายละเอียดรีวิว :`}
                                        </Text>
                                        <Textarea
                                            w='100%'
                                            h='180px'
                                            fontSize='20px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.description}
                                            placeholder="รายละเอียดรีวิว"
                                            onChange={(e) => setState(prev => ({ ...prev, description: e.target.value }))}
                                            _placeholder={{
                                                color: '#817F7F',
                                                fontSize: '20px'
                                            }}
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
                                pb='30px'
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
                                    onClick={() => {
                                        setState({
                                            name: '',
                                            description: '',
                                            rating: 0,
                                            image: '',
                                            file: {
                                                name: '',
                                                size: 0
                                            }
                                        })
                                        inpurRef.current!.value = ''
                                        onClose()
                                    }}
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
                                    onClick={() => onHandleSave()}
                                >
                                    {`บันทึก`}
                                </Button>
                            </Stack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}