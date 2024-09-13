'use client'

import { Container, Heading, HStack, Input, Stack, Text, Highlight, Select, Button, Divider, IconButton, AspectRatio, Image, useToast, Spinner } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TCertificate, TCertificateHours, TCertificateUser } from "../../interface/CreateCertificate"
import { getCertificateWithCerNo, getCertificateWithClassDetailId, getCourseHours, getCourseHoursByCourseId, updateCertificateUser } from "@/libs/AdminAPI"
import { AdminFileIcon } from "@/app/icons/AdminIcon"
import { csvFileToArray } from "@/libs/ArrayManage"
import { CreateCertificate } from "@/libs/CreateCertificate"
import { CloseIcon } from "@chakra-ui/icons"
import { filesize } from "filesize"

export const EditCertificatePage = () => {

    const no = useSearchParams().get('no')
    const id = useSearchParams().get('id')

    const [user, setUser] = useState<TCertificateUser>({
        name: '',
        surname: '',
        email: '',
        status: '',
        certificateNo: '',
        certificate: '',
        isSending: false,
        startDate: '',
    })

    const [state, setState] = useState<TCertificate>({
        classDetailId: '',
        courseId: '',
        courseName: '',
        courseInstructor: '',
        qrcode: '',
        validId: '',
        user: [],
        createDate: '',
        status: '',
    })

    const [course, setCourse] = useState<TCertificateHours>({
        _id: '',
        courseName: '',
        hours: '',
        days: '',
    })

    const [file, setFile] = useState<{ name: string, size: number }>({
        name: '',
        size: 0,
    })

    const [loading, setLoading] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const reader = new FileReader()
    const router = useRouter()
    const toast = useToast()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files?.[0]

        if (files) {
            reader.onload = async (event) => {
                const csvOutput = event?.target?.result

                const csvUser = csvFileToArray(csvOutput as string)

                const newUser = await CreateCertificate(csvUser, state.courseName, state.courseInstructor, user.certificateNo?.replace(`${state.courseId}-`, '').slice(0, 4) as string, state.courseId, course.days, course.hours)

                const newUserFilter = newUser.filter((usr) => usr.name)

                const addCerNumber = newUserFilter.map((usr) => ({
                    ...usr,
                    certificateNo: user.certificateNo,
                    isSending: false,
                    startDate: user.startDate,
                }))

                setUser(addCerNumber[0])

                setFile({
                    name: file.name,
                    size: file.size
                })
            };

            reader.readAsText(files)
        }
    }

    const handleEdit = async () => {
        const newUser = await CreateCertificate([user], state.courseName, state.courseInstructor, user.certificateNo?.replace(`${state.courseId}-`, '').slice(0, 4) as string, state.courseId, course.days, course.hours)

        const addCerNumber = newUser.map((usr) => ({
            ...usr,
            certificateNo: user.certificateNo,
            isSending: false,
            startDate: user.startDate,
        }))

        setUser(addCerNumber[0])
    }

    const handleSave = async () => {
        setLoading(true)
        const newData = state.user.filter((usr) => usr.certificateNo !== user.certificateNo)

        newData.push(user)

        await updateCertificateUser(id as string, { ...state, user: newData, file, classStartDate: user.startDate }, (data: TCertificateUser[], error: unknown) => {
            if (error) {
                setLoading(false)
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            setLoading(false)

            return toast({
                title: 'บันทึกสําเร็จ',
                description: 'เพิ่มข้อมูลสําเร็จ',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    useEffect(() => {
        if (!file.name || !file.size) inputRef.current!.value = ''
    }, [file.name, file.size])

    useEffect(() => {

        if (!id || !no) router.push('/admin?tab=certificate')

        getCertificateWithCerNo(id as string, no as string, (data: TCertificateUser[], error: unknown) => {
            if (error) console.log(error)
            if (data) setUser(data[0])
        })

        getCertificateWithClassDetailId(id as string, async (data: TCertificate, error: unknown) => {

            if (error) console.log(error)

            if (data) {
                setState(data)

                await getCourseHoursByCourseId(data.courseId as string, (_data: TCertificateHours, err: unknown) => {
                    if (err) console.log(err)

                    if (_data) setCourse(_data)
                })
            }
        })

    }, [])

    return (
        <>
            {
                loading &&
                <Stack
                    w='80%'
                    h='100%'
                    bg='gray.300'
                    opacity='0.5'
                    align='center'
                    justify='center'
                    position='absolute'
                    top='0'
                    zIndex='100'
                >
                    <Spinner size='xl' color='exBlue' thickness="4px" />
                </Stack>
            }
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                bg='white'
                h='fit-content'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='130px'
                    justify='center'
                    align='start'
                    px='30px'
                    py='30px'
                    m='0'
                    borderBottom='1px'
                    borderColor='exGray.100'
                >
                    <HStack
                        w='100%'
                        h='100%'
                        align='center'
                    >
                        <Heading fontSize='36px'>{`Edit User Detail for Rebuild Certificate Number`}</Heading>
                        <Heading fontSize='36px' textColor='#3A86FF'>{`${no}`}</Heading>
                    </HStack>
                    <HStack
                        w='100%'
                        h='100%'
                        align='center'
                    >
                        <Text textColor='#817F7F' fontSize='24px'>{`แก้ไขรายละเอียดสมาชิกสำหรับการสร้าง Certificate หมายเลข `}</Text>
                        <Text textColor='#3A86FF' fontSize='24px'>{`${no}`}</Text>
                    </HStack>
                </Stack>
                <Stack
                    w='100%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='31px'
                    py='40px'
                    spacing='40px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='center'
                    >
                        <Heading
                            fontSize='24px'
                            textColor='#2E2E2E'
                        >
                            {`Email Adress`}
                        </Heading>
                        <Input
                            w='100%'
                            h='80px'
                            borderColor='#C1C1C1'
                            fontSize='20px'
                            value={user.email}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='center'
                    >
                        <Heading
                            fontSize='24px'
                            textColor='#2E2E2E'
                        >
                            <Highlight
                                query='(ชื่อ)'
                                styles={{ textColor: '#817F7F' }}
                            >
                                {`Name (ชื่อ)`}
                            </Highlight>
                        </Heading>
                        <Input
                            w='100%'
                            h='80px'
                            borderColor='#C1C1C1'
                            fontSize='20px'
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='center'
                    >
                        <Heading
                            fontSize='24px'
                            textColor='#2E2E2E'
                        >
                            {`Certificate Status`}
                        </Heading>
                        <Select
                            w='100%'
                            h='80px'
                            borderColor='#C1C1C1'
                            fontSize='20px'
                            onChange={(e) => setUser(prev => ({ ...prev, status: e.target.value } as TCertificateUser))}
                        >
                            <option
                                value='pass'
                            >
                                {`Pass`}
                            </option>
                            <option
                                value='attendence'
                            >
                                {`Attendance`}
                            </option>
                        </Select>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Button
                            w='250px'
                            h='65px'
                            bg='exBlue'
                            textColor='white'
                            onClick={handleEdit}
                        >
                            {`ยืนยันการแก้ไข`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Container
                mt='2rem'
                p='0'
                maxW='95%'
                bg='white'
                h='fit-content'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='130px'
                    justify='center'
                    align='start'
                    px='30px'
                    py='30px'
                    m='0'
                    borderBottom='1px'
                    borderColor='exGray.100'
                >
                    <HStack
                        w='100%'
                        h='100%'
                        align='center'
                    >
                        <Heading fontSize='36px'>{`Create User(s)`}</Heading>
                    </HStack>
                </Stack>
                <Stack
                    w='100%'
                    h='fit-content'
                    align='center'
                    justify='center'
                    px='31px'
                    py='40px'
                    spacing='40px'
                >
                    <Stack
                        w='100%'
                        h='fit-content'
                        align='start'
                        justify='center'
                        spacing='30px'
                    >
                        <Heading
                            w='100%'
                            fontSize='32px'
                            fontWeight='600'
                            textColor='#2E2E2E'
                            pb='15px'
                            borderBottom='1px'
                            borderColor='#C4C4C4'
                        >
                            {`files`}
                        </Heading>
                        <Stack
                            w='100%'
                            h='100%'
                            align='center'
                            justify='center'
                            py='16px'
                        >
                            <AspectRatio
                                ratio={879 / 635}
                                w='879px'
                            >
                                <Image
                                    src={user.certificate}
                                    alt='certificate'
                                />
                            </AspectRatio>
                        </Stack>
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
                            <Input
                                type='file'
                                ref={inputRef}
                                onChange={handleOnChange}
                                hidden
                            />
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='start'
                                direction='row'
                                spacing='15px'
                            >
                                {
                                    file.name &&
                                    <AdminFileIcon
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
                                    {file.name}
                                </Text>
                            </Stack>
                            {
                                file.name &&
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
                                        {filesize(file.size)}
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
                                            setState(prev => ({ ...prev, user: [], file: { name: '', size: 0 } }))
                                        }}
                                    />
                                </Stack>
                            }
                        </Stack>
                        <Button
                            w='250px'
                            h='65px'
                            bg='#19B5FE'
                            textColor='white'
                            fontSize='18px'
                            fontWeight='600'
                            onClick={() => inputRef.current?.click()}
                        >
                            {`Upload CSV`}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Stack
                w='100%'
                h='100%'
                align='center'
                justify='center'
            >
                <Stack
                    w='95%'
                    h='100%'
                    my='60px'
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
                        onClick={handleSave}
                    >
                        {`บันทึก`}
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}