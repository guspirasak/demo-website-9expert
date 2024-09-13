'use client'

import { TCreatePortfolio } from "@/app/admin/interface/PortfolioInterface"
import { AdminImageIcon, AdminUploadImageIcon } from "@/app/icons/AdminIcon"
import { createPortfolio } from "@/libs/AdminAPI"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { Button, Divider, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { filesize } from "filesize"
import React, { useRef, useState } from "react"
import { Loading } from "../../Loading"

type TPortfolioModal = {
    state: TCreatePortfolio
    setState: React.Dispatch<React.SetStateAction<TCreatePortfolio>>
}

export const PortfolioModal = ({ state, setState }: TPortfolioModal) => {

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
                imageUrl: result.file as string,
                file: {
                    name: file?.name as string,
                    size: file?.size as number
                }
            }))
        })
    }

    const onHandleSave = async () => {
        setLoading(true)
        await createPortfolio(state, (data: TCreatePortfolio, error: string) => {

            if (error) {
                console.log(error)
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
            toast({
                title: 'อัปโหลดรูปภาพสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            setState({
                imageUrl: '',
                file: {
                    name: '',
                    size: 0
                }
            })
            onClose()
        })
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
                    {`อัปโหลกรูปภาพ`}
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
                        {`อัปโหลดรูปภาพ`}
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
                                <Input
                                    type='file'
                                    ref={inpurRef}
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={handleUploadImage}
                                    hidden
                                />
                                {
                                    state.imageUrl ?
                                        <Image
                                            w='626px'
                                            h='386px'
                                            src={state.imageUrl}
                                            cursor='pointer'
                                            onClick={() => inpurRef.current?.click()}
                                            alt="upload image"
                                        />
                                        :
                                        <Stack
                                            w='626px'
                                            h='386px'
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
                                    noOfLines={3}
                                    maxW='30ch'
                                    textColor='exGray.500'
                                >
                                    อัพโหลดภาพ Banner ของคุณที่นี่ <br />
                                    ขนาดภาพที่แนะนำ : 626x386 px <br />
                                    รูปแบบที่รองรับ: .jpg, .jpeg หรือ .png
                                </Text>
                            </Stack>
                            <Stack
                                w='100%'
                                h='100%'
                                spacing='30px'
                            >
                                <Heading
                                    fontSize='32px'
                                    fontWeight='600'
                                    textColor='#2E2E2E'
                                    pb='30px'
                                    borderBottom='1px'
                                    borderColor='#817F7FB2'
                                >
                                    {`รูปภาพ`}
                                </Heading>
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
                                                w='30px'
                                                h='35px'
                                                color='#36B37E'
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
                                            <Divider orientation='vertical' />
                                            <IconButton
                                                aria-label="delete"
                                                bg='#EDEDED80'
                                                w='50px'
                                                h='50px'
                                                borderRadius='full'
                                                icon={<CloseIcon w='15px' h='15px' color='#817F7F' />}
                                                onClick={() => {
                                                    setState(prev => ({ ...prev, imageUrl: '', file: { name: '', size: 0 } }))
                                                    inpurRef.current!.value = ''
                                                }}
                                            />
                                        </Stack>
                                    }
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
                                            imageUrl: '',
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