'use client'

import { TCreateReview } from "@/app/admin/interface/ReviewInterface"
import { AdminUploadImageIcon } from "@/app/icons/AdminIcon"
import { adminUpdateTechnologyArea } from "@/libs/AdminAPI"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { EditIcon } from "@chakra-ui/icons"
import { useToast, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Input, Text, Image, MenuItem } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { Loading } from "../../Loading"
import { TCreateTechnologyArea } from "@/app/admin/interface/TechnologyAreaInterface"

export const AreaEditModal = ({ area, setUpdate }: { area: TCreateTechnologyArea, setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [state, setState] = useState<TCreateTechnologyArea>({
        _id: area._id,
        technologyName: area.technologyName,
        technologyNameAbbr: area.technologyNameAbbr,
        courseGroup: area.courseGroup,
        icon: area.icon,
        note: area.note,
        isActive: area.isActive,
        isDeleted: area.isDeleted
    })

    const [loading, setLoading] = useState(false)

    const inpurRef = useRef<HTMLInputElement>(null)

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        setState(area)
    }, [area])

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
                icon: result.file as string,
            }))
        })
    }

    const onHandleSave = async () => {
        setLoading(true)

        if (!state.technologyName || !state.technologyNameAbbr || !state.icon) {
            setLoading(false)
            return toast({
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        }

        await adminUpdateTechnologyArea(state._id as string, state, (data: TCreateReview, error: string) => {

            if (error) {
                console.log(error)
                setLoading(false)
                return toast({
                    title: 'อัพเดตข้อมูลไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setLoading(false)
            setUpdate(prev => !prev)
            toast({
                title: 'อัพเดตข้อมูลสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            onClose()
        })
    }


    return (
        <>
            <MenuItem
                icon={<EditIcon w='16px' h='16px' />}
                onClick={onOpen}
            >
                {`แก้ไข`}
            </MenuItem>
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
                        {`เพิ่ม Technology Area`}
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
                                justify='start'
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
                                        accept="image/png, image/่jpg, image/jpeg, image/webp"
                                        onChange={handleUploadImage}
                                        hidden
                                    />
                                    {
                                        state.icon ?
                                            <Image
                                                alt="icon"
                                                w='269px'
                                                h='269px'
                                                minW='269px'
                                                src={state.icon}
                                                cursor='pointer'
                                                onClick={() => inpurRef.current?.click()}
                                            />
                                            :
                                            <Stack
                                                w='269px'
                                                h='269px'
                                                minW='269px'
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
                                        รูปแบบที่รองรับ: .jpg, .jpeg .png หรือ .webp
                                    </Text>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='center'
                                    spacing='30px'
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
                                            {`Technology Area :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='71px'
                                            fontSize='20px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.technologyName}
                                            placeholder="ระบุTechnology Area..."
                                            onChange={(e) => setState(prev => ({ ...prev, technologyName: e.target.value }))}
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
                                            {`Technology Area Abbreviation :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='71px'
                                            fontSize='20px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.technologyNameAbbr}
                                            placeholder="ระบุTechnology Area Abbreviation..."
                                            onChange={(e) => setState(prev => ({ ...prev, technologyNameAbbr: [e.target.value] }))}
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
                                            technologyName: '',
                                            technologyNameAbbr: [],
                                            courseGroup: [],
                                            icon: '',
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