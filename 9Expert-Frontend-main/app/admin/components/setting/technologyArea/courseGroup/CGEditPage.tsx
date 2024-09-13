'use client'

import { AdminUploadImageIcon } from "@/app/icons/AdminIcon"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { AddIcon, EditIcon } from "@chakra-ui/icons"
import { useToast, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Input, Text, Image, Divider, Textarea, AspectRatio, Wrap, Center, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverFooter, MenuItem } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { Loading } from "../../../Loading"
import { TCreateCourseGroup, TCreateTechnologyArea, } from "@/app/admin/interface/TechnologyAreaInterface"
import { adminUpdateCourseGroup, getTechnologyAreaById } from "@/libs/AdminAPI"
import rgbHex from 'rgb-hex'
import ColorPicker from 'react-best-gradient-color-picker'

export const CGEditModal = ({ areaId, courseGroup, setUpdate }: { areaId: string, courseGroup: TCreateCourseGroup, setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [state, setState] = useState<TCreateCourseGroup>({
        _id: courseGroup._id,
        courseGroupId: courseGroup.courseGroupId,
        courseGroupName: courseGroup.courseGroupName,
        courseGroupNameAbbr: courseGroup.courseGroupNameAbbr,
        courseGroupIcon: courseGroup.courseGroupIcon,
        courseGroupBanner: courseGroup.courseGroupBanner,
        courseGroupTeaser: courseGroup.courseGroupTeaser,
        courseGroupTeaserAbbr: courseGroup.courseGroupTeaserAbbr,
        courseGroupColor: courseGroup.courseGroupColor,
        course: courseGroup.course,
        note: courseGroup.note,
        isDeleted: courseGroup.isDeleted,
        isActive: courseGroup.isActive
    })

    const [color, setColor] = useState<Array<string[]>>([
        ['#47B980', '#195C37'],
        ['#E2889C', '#881421'],
        ['#FF8F6B', '#D35230'],
        ['#BC85F5', '#591C95'],
        ['#E79ACA', '#952E8B'],
        ['#306998', '#FFD43B'],
        ['#F7DD68', '#A88429'],
        ['#BE1E2D', '#FFDDDE'],
        ['#71BDFD', '#104CCA'],
        ['#AAD8FF', '#19B5FE'],
    ])

    const [colorPicker, setColorPicker] = useState<string[]>([])

    const [ta, setTa] = useState<string>('')

    const [loading, setLoading] = useState(false)

    const [popOpen, setPopOpen] = useState(false)

    const inpurRef = useRef<HTMLInputElement>(null)
    const bannerRef = useRef<HTMLInputElement>(null)

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        getTechnologyAreaById(areaId, (data: TCreateTechnologyArea, error: unknown) => {
            if (error) {
                return toast({
                    title: 'ไม่สามารถดึงข้อมูลได้',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setTa(data.technologyName)
        })
    }, [])

    useEffect(() => {
        if (isOpen) {
            if (color.filter(item => item === state.courseGroupColor).length === 0) {
                setColor(prev => [...prev, courseGroup.courseGroupColor])
            } 
        }
    }, [isOpen])

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
                courseGroupIcon: result.file as string,
            }))
        })
    }

    const handleUploadBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                courseGroupBanner: result.file as string,
            }))
        })
    }

    const onHandleSave = async () => {
        setLoading(true)
        await adminUpdateCourseGroup(state._id as string, state, (data: TCreateCourseGroup, error: string) => {

            if (error) {
                console.log(error)
                setLoading(false)
                return toast({
                    title: 'แก้ไขกลุ่มหลักสูตรไม่สําเร็จ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setLoading(false)
            setUpdate(prev => !prev)
            toast({
                title: 'แก้ไขกลุ่มหลักสูตรสําเร็จ',
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
                size='3xl'
            >
                <ModalOverlay />
                <ModalContent>
                    {
                        loading &&
                        <Loading />
                    }
                    <ModalHeader
                        h='130px'
                        fontSize='24px'
                        textColor='#2E2E2E'
                        fontWeight='500'
                        borderBottom='1px'
                        borderColor='#817F7F80'
                    >
                        {`เพิ่มกลุ่มหลักสูตร`}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        mt='35px'
                    >
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
                                spacing='30px'
                            >
                                <Text
                                    fontSize='20px'
                                    textColor='#2E2E2E'
                                >
                                    {`เพิ่มรูปภาพแบนเนอร์`}
                                </Text>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    justify='center'
                                    mb='40px'
                                >
                                    <Stack
                                        w='100%'
                                        align='start'
                                    >
                                        <Input
                                            type='file'
                                            ref={bannerRef}
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            onChange={handleUploadBanner}
                                            hidden
                                        />
                                        {
                                            state.courseGroupBanner ?
                                                <AspectRatio
                                                    ratio={3509 / 2712}
                                                    w='100%'
                                                >
                                                    <Image
                                                        w='100%'
                                                        src={state.courseGroupBanner}
                                                        cursor='pointer'
                                                        onClick={() => bannerRef.current?.click()}
                                                        fit='cover'
                                                    />
                                                </AspectRatio>
                                                :
                                                <AspectRatio
                                                    ratio={3509 / 2712}
                                                    w='100%'
                                                >
                                                    <Stack
                                                        w='100%'
                                                        h='100%'
                                                        minW='300px'
                                                        align='center'
                                                        justify='center'
                                                        bg='#F5F5F5'
                                                        border='1px'
                                                        borderStyle='dashed'
                                                        borderColor='#D6D6D6'
                                                        borderRadius='20px'
                                                        cursor='pointer'
                                                        onClick={() => bannerRef.current?.click()}
                                                    >
                                                        <AdminUploadImageIcon
                                                            w='48px'
                                                            h='48px'
                                                            color='#817F7F'
                                                        />
                                                        <Text
                                                            fontSize='20px'
                                                            fontWeight='600'
                                                            textColor='#19B5FE'
                                                            textDecoration='underline'
                                                        >
                                                            {`อัปโหลดรูปภาพ`}
                                                        </Text>
                                                    </Stack>
                                                </AspectRatio>
                                        }
                                        <Text
                                            textColor='exGray.500'
                                            fontSize='14px'
                                        >
                                            อัพโหลดภาพ Banner ของคุณที่นี่ <br />
                                            ขนาดภาพที่แนะนำ : 3509x2712 px <br />
                                            รูปแบบที่รองรับ: .jpg, .jpeg .png หรือ .webp
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Divider
                                border='2px'
                                borderColor='#817F7F80'
                            />
                            <Stack
                                w='100%'
                                h='100%'
                                align='start'
                                justify='start'
                                direction='row'
                                spacing='30px'
                            >
                                <Stack
                                    minW='19ch'
                                    spacing='20px'
                                >
                                    <Input
                                        type='file'
                                        ref={inpurRef}
                                        accept="image/*"
                                        onChange={handleUploadImage}
                                        hidden
                                    />
                                    {
                                        state.courseGroupIcon ?
                                            <Image
                                                w='200px'
                                                h='200px'
                                                minW='200px'
                                                src={state.courseGroupIcon}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ID กลุ่มหลักสูตร :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='45px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.courseGroupId}
                                            placeholder="ระบุ ID ของกลุ่มหลักสูตร..."
                                            onChange={(e) => setState(prev => ({ ...prev, courseGroupId: e.target.value }))}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ชื่อกลุ่มหลักสูตร :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='45px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.courseGroupName}
                                            placeholder="ระบุชื่อของกลุ่มหลักสูตร..."
                                            onChange={(e) => setState(prev => ({ ...prev, courseGroupName: e.target.value }))}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ชื่อย่อของกลุ่มหลักสูตร :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='45px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.courseGroupNameAbbr}
                                            placeholder="ระบุชื่อย่อของกลุ่มหลักสูตร..."
                                            onChange={(e) => setState(prev => ({ ...prev, courseGroupNameAbbr: e.target.value }))}
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
                                align='start'
                                justify='start'
                                pb='30px'
                                spacing='30px'
                            >
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ทีเซอร์กลุ่มหลักสูตร :`}
                                        </Text>
                                        <Textarea
                                            w='100%'
                                            h='100px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.courseGroupTeaser}
                                            placeholder="ระบุชื่อของกลุ่มหลักสูตร..."
                                            onChange={(e) => setState(prev => ({ ...prev, courseGroupTeaser: e.target.value }))}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`ทีเซอร์ย่อของกลุ่มหลักสูตร :`}
                                        </Text>
                                        <Textarea
                                            w='100%'
                                            h='100px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            value={state.courseGroupTeaserAbbr}
                                            placeholder="ระบุชื่อย่อของกลุ่มหลักสูตร..."
                                            onChange={(e) => setState(prev => ({ ...prev, courseGroupTeaserAbbr: e.target.value }))}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`Technology Area :`}
                                        </Text>
                                        <Input
                                            w='100%'
                                            h='45px'
                                            fontSize='18px'
                                            borderRadius='5px'
                                            borderColor='#C1C1C1'
                                            isDisabled
                                            value={ta}
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
                                            fontSize='20px'
                                            fontWeight='500'
                                            textColor='#1D2026'
                                        >
                                            {`สีของกลุ่มหลัดสูตร :`}
                                        </Text>
                                        <Wrap
                                            w='100%'
                                            h='100%'
                                            justify='center'
                                            align='center'
                                        >
                                            {
                                                color.map((c, index) => (
                                                    <Button
                                                        key={index}
                                                        w='45px'
                                                        h='45px'
                                                        p='0'
                                                        borderRadius='full'
                                                        bg='white'
                                                        isActive={state.courseGroupColor === c}
                                                        onClick={() => (
                                                            setState(prev => ({
                                                                ...prev, courseGroupColor: c
                                                            }))
                                                        )}
                                                        _hover={{
                                                            bg: 'white',
                                                            border: '2px',
                                                            borderColor: '#817F7F80'
                                                        }}
                                                        _active={{
                                                            bg: 'white',
                                                            border: '2px',
                                                            borderColor: '#817F7F80'
                                                        }}
                                                    >
                                                        <Center
                                                            w='40px'
                                                            h='40px'
                                                            bg={`linear-gradient(180deg, ${c[0]}, ${c[1]})`}
                                                            borderRadius='full'
                                                        >

                                                        </Center>
                                                    </Button>
                                                ))
                                            }
                                            <Popover
                                                isOpen={popOpen}
                                            >
                                                <PopoverTrigger>
                                                    <Button
                                                        w='60px'
                                                        h='60px'
                                                        p='0'
                                                        borderRadius='full'
                                                        bg='white'
                                                        position='relative'
                                                        onClick={() => setPopOpen(!popOpen)}
                                                        _hover={{
                                                            bg: 'white',
                                                        }}
                                                        _active={{
                                                            bg: 'white',
                                                        }}
                                                    >
                                                        <Center
                                                            w='50px'
                                                            h='50px'
                                                            borderRadius='full'
                                                            border='2px'
                                                            borderColor='#817F7F80'
                                                            _hover={{
                                                                bg: 'white',
                                                                border: '2px',
                                                                borderColor: '#817F7F80'
                                                            }}
                                                            _active={{
                                                                bg: 'white',
                                                                border: '2px',
                                                                borderColor: '#817F7F80'
                                                            }}
                                                        >
                                                            <AddIcon w='25px' h='25px' color='#817F7FC9' />
                                                        </Center>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverBody>
                                                        <Stack
                                                            w='100%'
                                                            h='100%'
                                                            align='center'
                                                            justify='center'
                                                            direction='row'
                                                        >
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <Button
                                                                        w='60px'
                                                                        h='60px'
                                                                        p='0'
                                                                        borderRadius='full'
                                                                        bg='white'
                                                                        position='relative'
                                                                        _hover={{
                                                                            bg: 'white',
                                                                        }}
                                                                        _active={{
                                                                            bg: 'white',
                                                                        }}
                                                                    >
                                                                        <Center
                                                                            w='50px'
                                                                            h='50px'
                                                                            borderRadius='full'
                                                                            bg={colorPicker[0] || 'white'}
                                                                            border={!colorPicker[0] ? '2px' : '0'}
                                                                            borderColor={!colorPicker[0] ? '#817F7F80' : 'white'}
                                                                            _hover={!colorPicker[0] ? {
                                                                                bg: 'white',
                                                                                border: '2px',
                                                                                borderColor: '#817F7F80'
                                                                            } : {}}
                                                                            _active={
                                                                                !colorPicker[0] ? {
                                                                                    bg: 'white',
                                                                                    border: '2px',
                                                                                    borderColor: '#817F7F80'
                                                                                } : {}
                                                                            }
                                                                        >
                                                                            {
                                                                                !colorPicker[0] &&
                                                                                <AddIcon w='25px' h='25px' color='#817F7FC9' />
                                                                            }
                                                                        </Center>
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <PopoverArrow />
                                                                    <PopoverCloseButton />
                                                                    <PopoverBody>
                                                                        <ColorPicker
                                                                            hidePresets
                                                                            hideControls
                                                                            onChange={(value) => {
                                                                                setColorPicker([`#${rgbHex(value).substring(0, 6)}`, colorPicker[1]])
                                                                            }}
                                                                        />
                                                                    </PopoverBody>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <Button
                                                                        w='60px'
                                                                        h='60px'
                                                                        p='0'
                                                                        borderRadius='full'
                                                                        bg='white'
                                                                        position='relative'
                                                                        _hover={{
                                                                            bg: 'white',
                                                                        }}
                                                                        _active={{
                                                                            bg: 'white',
                                                                        }}
                                                                    >
                                                                        <Center
                                                                            w='50px'
                                                                            h='50px'
                                                                            borderRadius='full'
                                                                            bg={colorPicker[1] || 'white'}
                                                                            border={!colorPicker[1] ? '2px' : '0'}
                                                                            borderColor={!colorPicker[1] ? '#817F7F80' : 'white'}
                                                                            _hover={!colorPicker[1] ? {
                                                                                bg: 'white',
                                                                                border: '2px',
                                                                                borderColor: '#817F7F80'
                                                                            } : {}}
                                                                            _active={
                                                                                !colorPicker[1] ? {
                                                                                    bg: 'white',
                                                                                    border: '2px',
                                                                                    borderColor: '#817F7F80'
                                                                                } : {}
                                                                            }
                                                                        >
                                                                            {
                                                                                !colorPicker[1] &&
                                                                                <AddIcon w='25px' h='25px' color='#817F7FC9' />
                                                                            }
                                                                        </Center>
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <PopoverArrow />
                                                                    <PopoverCloseButton />
                                                                    <PopoverBody>
                                                                        <ColorPicker
                                                                            hidePresets
                                                                            hideControls
                                                                            onChange={(value) => {
                                                                                setColorPicker([colorPicker[0], `#${rgbHex(value).substring(0, 6)}`])
                                                                            }}
                                                                        />
                                                                    </PopoverBody>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </Stack>
                                                    </PopoverBody>
                                                    <PopoverFooter>
                                                        <Stack
                                                            w='100%'
                                                            h='100%'
                                                            align='center'
                                                            justify='space-between'
                                                            direction='row'
                                                        >
                                                            <Button
                                                                w='120px'
                                                                h='40px'
                                                                variant='outline'
                                                                bg='white'
                                                                textColor='#717579'
                                                                borderColor='#E9EAF0'
                                                                borderRadius='10px'
                                                                onClick={() => {
                                                                    setColorPicker([])
                                                                    setPopOpen(false)
                                                                }}
                                                            >
                                                                {`ย้อนกลับ`}
                                                            </Button>
                                                            <Button
                                                                w='120px'
                                                                h='40px'
                                                                bg='exBlue'
                                                                textColor='white'
                                                                onClick={() => {
                                                                    if (colorPicker[0] && colorPicker[1]) {
                                                                        setColor(prev => [...prev, colorPicker])
                                                                    }
                                                                    setPopOpen(false)
                                                                }}
                                                            >
                                                                {`บันทึก`}
                                                            </Button>
                                                        </Stack>
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Popover>
                                        </Wrap>
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
                                            courseGroupId: '',
                                            courseGroupName: '',
                                            courseGroupNameAbbr: '',
                                            courseGroupIcon: '',
                                            courseGroupBanner: '',
                                            courseGroupTeaser: '',
                                            courseGroupTeaserAbbr: '',
                                            courseGroupColor: [],
                                            course: []
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