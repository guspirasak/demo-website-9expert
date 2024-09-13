'use client'

import { Button, Container, Heading, HStack, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, AspectRatio, Image, VStack, useToast, Textarea, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure, Highlight } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { createBundle, getBundle, updateBundle } from "@/libs/AdminAPI"
import { useRouter, useSearchParams } from "next/navigation"
import { CourseImageUploadIcon } from "@/app/icons/AdminIcon"
import { TCourseInputRef } from "@/app/admin/interface/AdminInterface"
import { TPromotion } from "@/app/admin/interface/PromotionInterface"
import { imageToBase64, TImageToBase64Result } from "@/libs/ImageToBase64"
import { TBundle } from "@/app/admin/interface/BundleInterface"
import { BundleSelectCourse } from "./BundleSelectCourse"
import { Loading } from "../../Loading"

export const CreateBundlePage = () => {

    const action = useSearchParams().get('action')
    const id = useSearchParams().get('id')
    const toast = useToast()
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const cancelRef = useRef<HTMLButtonElement>(null);

    const imageRef = useRef<TCourseInputRef>()

    const [state, setState] = useState<TBundle>({
        name: '',
        teaser: '',
        sellPrice: 0,
        totalPrice: 0,
        course: [],
        image: '',
        isActive: false,
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (action === 'edit' && !id) router.push('/admin?tab=promotion&sub=bundle')

        if (action === 'edit' && id) {
            getBundle(id, (data: TBundle, error: unknown) => {
                if (error) {
                    console.log(error)
                    return
                }
                console.log(data)
                setState(data)
            })
        }
    }, [action, id])

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        imageToBase64(event.target.files?.[0], (result: TImageToBase64Result) => {

            if (result.error) {
                return toast({
                    title: 'กรุณาเลือกรูปภาพ',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setState({ ...state, image: result.file as string })
        })
    }

    const handleCreateBundle = async () => {

        if (!state.name) {
            return toast({
                title: 'กรุณากรอกชื่อ Bundle',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        }

        setLoading(true)
        await createBundle(state, (data: TPromotion, error: unknown) => {
            if (error) {
                setLoading(false)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถสร้าง Bundle ได้ กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setLoading(false)
            router.push('/admin?tab=promotion&sub=bundle&action=result')

        })
    }

    const handleUpdateBundle = async () => {
        setLoading(true)
        await updateBundle(id as string, state, (data: TPromotion, error: unknown) => {
            if (error) {
                setLoading(false)
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถแก้ไข Bundle ได้ กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setLoading(false)
            router.push('/admin?tab=promotion&sub=bundle&action=result&id=' + id)
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
        >
            {
                loading && <Loading />
            }
            <HStack
                w='100%'
                h='130px'
                align='center'
                justify='space-between'
                px={{ base: '1.5rem', lg: '3rem' }}
                m='0'
            >
                <Heading>{`สร้างหลักสูตรแบบ Bundle`}</Heading>
            </HStack>
            <Container
                p='0'
                maxW='95%'
                bg='white'
                h='fit-content'
                borderRadius='20px'
            >
                <Tabs>
                    <TabList
                        w='100%'
                        h='80px'
                        px='50px'
                    >
                        <Tab
                            fontSize='24px'
                            textColor='#817F7F80'
                            _selected={{
                                textColor: '#2E2E2E',
                                fontWeight: '700',
                                borderBottom: '3px solid #4091F4',
                            }}
                        >
                            {`ข้อมูลทั่วไป`}
                        </Tab>
                        <Tab
                            fontSize='24px'
                            textColor='#817F7F80'
                            _selected={{
                                textColor: '#2E2E2E',
                                fontWeight: '700',
                                borderBottom: '3px solid #4091F4',
                            }}
                        >
                            {`สินค้า`}
                        </Tab>
                        <Tab
                            fontSize='24px'
                            textColor='#817F7F80'
                            _selected={{
                                textColor: '#2E2E2E',
                                fontWeight: '700',
                                borderBottom: '3px solid #4091F4',
                            }}
                        >
                            {`รูปภาพ`}
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel
                            px='50px'
                            mt='60px'
                        >
                            <Stack
                                w='100%'
                                h='100%'
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
                                        w='15%'
                                        fontSize='24px'
                                        fontWeight='400'
                                        textColor='#1D2026'
                                    >
                                        <Highlight
                                            query='*'
                                            styles={{ textColor: 'crimson' }}
                                        >
                                            {`ชื่อ Bundle* :`}
                                        </Highlight>
                                    </Text>
                                    <Input
                                        w='85%'
                                        h='60px'
                                        borderColor='#C1C1C1'
                                        value={state.name}
                                        onChange={(e) => setState({ ...state, name: e.target.value })}
                                    />
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='start'
                                    justify='start'
                                    direction='row'
                                >
                                    <Text
                                        w='15%'
                                        fontSize='24px'
                                        fontWeight='400'
                                        textColor='#1D2026'
                                    >
                                        {`รายละเอียด Bundle:`}
                                    </Text>
                                    <Textarea
                                        w='85%'
                                        minH='200px'
                                        borderColor='#C1C1C1'
                                        value={state.teaser}
                                        onChange={(e) => setState({ ...state, teaser: e.target.value })}
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
                                        w='15%'
                                        fontSize='24px'
                                        fontWeight='400'
                                        textColor='#1D2026'
                                    >
                                        {`ราคาขาย : `}
                                    </Text>
                                    <Input
                                        w='85%'
                                        h='60px'
                                        borderColor='#C1C1C1'
                                        type='number'
                                        maxLength={6}
                                        value={state.sellPrice}
                                        onChange={(e) => {
                                            const newVal = Number(e.target.value)
                                            
                                            if (newVal < 0) return

                                            setState({ ...state, sellPrice: newVal})
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel
                            mt='40px'
                        >
                            <BundleSelectCourse state={state} setState={setState} />
                        </TabPanel>
                        <TabPanel
                            px='50px'
                            mt='60px'
                        >
                            <Stack
                                w='100%'
                                h='100%'
                            >
                                <Text fontSize='lg' fontWeight='bold' >{`ภาพแบนเนอร์ของ Bundle`}</Text>
                                <Stack
                                    direction={{ base: 'column', lg: 'row' }}
                                    h={{ base: 'min-content', lg: '289px' }}
                                    w='100%'
                                    spacing='1.5rem'
                                >
                                    <AspectRatio w='100%' maxW='480px' ratio={480 / 289}>
                                        <Image
                                            alt="Course Image"
                                            w='480px'
                                            fit='cover'
                                            objectPosition='top'
                                            src={
                                                state.image || "https://res.cloudinary.com/dzz6rgxkl/image/upload/v1702450992/9expert/public/h5owwu5ca7hdhmzhwgia.png"
                                            }
                                        />
                                    </AspectRatio>
                                    <VStack
                                        align='start'
                                        spacing='1.5rem'
                                        h={{ base: 'min-content', md: '289px' }}
                                    >
                                        <Text
                                            noOfLines={3}
                                            maxW={{ base: '100%', md: '60%' }}
                                            textColor='exGray.500'
                                        >
                                            {
                                                `อัพโหลดภาพขนาดย่อของหลักสูตร Bundle ของคุณที่นี่ 
                                     ขนาดภาพที่แนะนำ : 480x289 px
                                     รูปแบบที่รองรับ: .jpg, .jpeg .png หรือ .webp`
                                            }
                                        </Text>
                                        <Button
                                            bg='exLightBlue'
                                            color='exBlue'
                                            leftIcon={<CourseImageUploadIcon w='16px' h='16px' />}
                                            onClick={() => imageRef.current?.click()}
                                            _hover={{
                                                bg: 'exBlue',
                                                color: 'white'
                                            }}
                                            _active={{
                                                bg: 'exBlue',
                                                color: 'white'
                                            }}
                                        >
                                            {`Upload image`}
                                        </Button>
                                        <Input type="file" ref={imageRef} onChange={handleUploadImage} display='none' accept="image/png, image/jpeg, image/jpg, image/webp" />
                                    </VStack>
                                </Stack>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <HStack
                    mt='100px'
                    mb='3rem'
                    align='center'
                    justify='space-between'
                    w='100%'
                    px='2.5rem'
                >
                    <Button
                        w='250px'
                        h='50px'
                        variant='outline'
                        border='1px'
                        borderColor='#E9EAF0'
                        bg='#FFFFFF'
                        fontSize='18px'
                        textColor='#717579'
                        // onClick={() => window.history.back()}
                        onClick={onOpen}
                    >
                        {`ย้อนกลับ`}
                    </Button>
                    <Button
                        w='250px'
                        h='50px'
                        fontSize='18px'
                        bg='exBlue'
                        color='white'
                        onClick={action === 'create' ? handleCreateBundle : handleUpdateBundle}
                    >
                        {`บันทึก`}
                    </Button>

                    <AlertDialog
                        motionPreset='slideInBottom'
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                            <AlertDialogHeader>หลักสูตร Bundle ยังไม่บันทึก!</AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                คุณต้องการออกจากหน้านี้หรือไม่
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                ไม่
                                </Button>
                                <Button colorScheme='red' ml={3} onClick={() => window.history.back()} >
                                ใช่
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </HStack>
            </Container>
        </Stack>
    )
}