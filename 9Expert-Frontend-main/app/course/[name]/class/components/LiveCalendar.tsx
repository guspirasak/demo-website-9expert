'use client'

import { ICardStatus, IMiniCalendar, TCourseCard } from "@/app/components/ContentCard/Card"
import { CourseCalendarIcon } from "@/app/icons/CourseIcon"
import { AspectRatio, Box, Button, Center, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Radio, RadioGroup, Stack, Tag, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import { TCalendarTag, TSmallCalendar } from "../interface/Calendar"
import { CalendarIcon, CardClockIcon, GraduationCapIcon, UserAddIcon, UserAlertIcon } from "@/app/icons/CardIcons"
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper/modules"
import { TClassDetails } from "@/app/admin/interface/CreateCourseInterface"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ClassStatusColor } from "@/libs/ClassStatusColor"

const CalendarHeaderStatus = ({ small }: TSmallCalendar) => {

    const textColor = useColorModeValue('#817F7F', '#D1D1D1')

    return (
        <Stack
            w='100%'
            h={small ? '20px' : '30px'}
            align='center'
            justify='end'
            position='relative'
            direction='row'
            spacing={small ? '0.5rem' : '1.5rem'}
        >
            <Text
                fontSize='15px'
                textColor={textColor}
            >
                {`สถานะรอบอบรม`}
            </Text>
            <Stack
                direction='row'
                align='center'
            >
                <Box
                    w={small ? '15px' : '30px'}
                    h={small ? '15px' : '30px'}
                    bg='#36B37E'
                    borderRadius='100%'
                >

                </Box>
                <Text
                    as='b'
                >
                    {`รับสมัคร`}
                </Text>
            </Stack>
            <Stack
                direction='row'
                align='center'
            >
                <Box
                    w={small ? '15px' : '30px'}
                    h={small ? '15px' : '30px'}
                    bg='#FEC84B'
                    borderRadius='100%'
                >

                </Box>
                <Text
                    as='b'
                >
                    {`ใกล้เต็ม`}
                </Text>
            </Stack>
            <Stack
                direction='row'
                align='center'
            >
                <Box
                    w={small ? '15px' : '30px'}
                    h={small ? '15px' : '30px'}
                    bg='#F65A5A'
                    borderRadius='100%'
                >

                </Box>
                <Text
                    as='b'
                >
                    {`เต็ม`}
                </Text>
            </Stack>
        </Stack>
    )
}

const CalendarStatus = ({ color, status, border }: ICardStatus) => {

    const borderColor = useColorModeValue('white', '#282828')

    return (

        <Stack spacing='5px' direction='row'>
            {
                border ?
                    <Box bg={color} w='18px' h='18px' border='2px' borderColor={borderColor} borderRadius='full'></Box>
                    :
                    <Box bg={color} w='18px' h='18px' borderRadius='full'></Box>
            }
            {
                status ?
                    <Text fontSize='18px' >{status}</Text>
                    :
                    <></>
            }
        </Stack>
    )
}

const CalendarTag = ({ color, bg, children }: TCalendarTag) => {

    return (
        <Stack
            w='max-content'
            h='20px'
            borderRadius='47px'
            align='center'
            justify='center'
            px='10px'
            bg={bg}
        >
            <Text
                fontSize='12px'
                textColor={color}
            >
                {children}
            </Text>
        </Stack>
    )
}

const CalendarCard = ({ classDetail, color, onClick, course }: IMiniCalendar) => {

    const [classType, setClassType] = useState('Classroom')

    const classDate = {
        startDate: moment(new Date(classDetail.classStartDate as string)).format('DD'),
        endDate: moment(new Date(classDetail.classEndDate as string)).format('DD'),
        monthAbbr: moment(new Date(classDetail.classStartDate as string)).format('MMM'),
        month: moment(new Date(classDetail.classStartDate as string)).format('MMMM'),
        year: (Number(moment(new Date(classDetail.classStartDate as string)).format('YYYY'))).toString(),
    }

    const cardBgColor = useColorModeValue('white', '#2E2E2E')
    const cardActiveBgColor = useColorModeValue('white', '#0E4174')
    const iconColor = useColorModeValue('black', 'white')

    const router = useRouter()

    const handleRegister = (cd: TClassDetails) => {
        if (cd.classType.toLowerCase() === 'classroom') {
            return router.push(`/register/public/?class=${cd._id as string}`)
        } else if (cd.classType.toLowerCase() === 'live') {
            return router.push(`/register/public/?class=${cd._id as string}`)
        } else if (cd.classType.toLowerCase() === 'hybrid') {
            return router.push(`/register/hybrid/?class=${cd._id as string}&type=${classType}`)
        } else {
            return router.push(`/register/hybrid/?class=${cd._id as string}&type=${classType}`)
        }
    }

    const classTypeBg = (type: string) => {
        if (type.toLowerCase() === 'classroom') {
            return useColorModeValue('#8BF47A80', '#2E5C0E')
        }

        if (type.toLowerCase() === 'live') {
            return useColorModeValue('#FADEDE80', '#EB6969')
        }

        if (type.toLowerCase() === 'hybrid') {
            return useColorModeValue('#DEE0FA80', '#6974EB')
        }

        return useColorModeValue('#8BF47A80', '#2E5C0E')
    }

    const classTypeTextColor = (type: string) => {
        if (type.toLowerCase() === 'classroom') {
            return useColorModeValue('#2E5C0E', '#FFFFFF')
        }

        if (type.toLowerCase() === 'live') {
            return useColorModeValue('#E85353', '#FFFFFF')
        }

        if (type.toLowerCase() === 'hybrid') {
            return useColorModeValue('#535FE8', '#FFFFFF')
        }

        return useColorModeValue('#2E5C0E', '#FFFFFF')
    }

    let statusText = ''
    let statusBgColor = 'exBlue'
    let statusTextColor = 'white'

    if (classDetail.classStatus.toLocaleLowerCase() == 'full'){
        statusText = 'เต็ม'
        statusBgColor = 'red'
        statusTextColor = 'white'
    } else if (classDetail.classStatus.toLocaleLowerCase() == 'almost full'){
        statusText = 'ใกล้เต็ม'
        statusBgColor = 'statOrange'
        statusTextColor = 'black'
    } else if (classDetail.classStatus.toLocaleLowerCase() == 'open'){
        statusText = 'รับสมัคร'
        statusBgColor = 'statGreen'
        statusTextColor = 'white'
    }
    // เต็ม
    // ใกล้เต็ม
    // รับสมัคร

    const isDisable = classDetail.classStatus.toLocaleLowerCase() == 'full'

    return (
        <AspectRatio
            ratio={190 / 158}
            w='158px'
            maxW='190px'
            mr='1rem'
        >
            <Popover
                placement='bottom'
                arrowSize={20}
            >
                <PopoverTrigger>
                    <Center
                        as={Button}
                        w='190px'
                        h='158px'
                        bg={cardBgColor}
                        flexDirection='column'
                        borderRadius='14px'
                        position='relative'
                        onClick={onClick}
                        _hover={{
                            bg: cardActiveBgColor,
                        }}
                        _active={{
                            bg: cardActiveBgColor,
                        }}
                    >
                        <Box p='0' m='0' position='relative' >
                            <Text
                                as='b'
                                fontSize='28px'
                            >
                                {`${moment(new Date(classDetail.classStartDate as string)).format('DD')}-${moment(new Date(classDetail.classEndDate as string)).format('DD')}`}
                            </Text>
                            <Box
                                position='absolute'
                                top='-10px'
                                right='-8px'
                            >
                                <CalendarStatus color={color} border />
                            </Box>
                        </Box>
                        <Text
                            fontSize='18px'
                            fontWeight='semibold'
                            textColor={useColorModeValue('#717579', '#FFFFFF')}
                        >
                            {`${moment(new Date(classDetail.classStartDate as string)).format('MMM').toUpperCase()}`}
                        </Text>
                        <Box
                            w='100%'
                            h='100%'
                            position='absolute'
                            top='12px'
                            left='12px'
                        >
                            <CalendarTag
                                color={classTypeTextColor(classDetail.classType)}
                                bg={classTypeBg(classDetail.classType)}
                            >
                                {classDetail.classType}
                            </CalendarTag>
                        </Box>
                    </Center>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent
                        w='460px'
                        h='398px'
                        borderRadius='20px'
                    >
                        <PopoverArrow />
                        <PopoverBody
                            w='460px'
                            h='398px'
                            bg={useColorModeValue('#FFFFFF', '#282828')}
                            borderRadius='20px'
                        >
                            <Stack
                                w='100%'
                                p='10px'
                                py='1.5rem'
                                align='center'
                            >
                                <Stack
                                    w='100%'
                                    h='75px'
                                    borderBottom='1px'
                                    borderColor='#D9D9D9'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                    >
                                        <CalendarIcon w='20px' h='20px' color={iconColor} />
                                        <Text fontSize='16px' fontWeight='semibold'>{`วันที่อบรม`}</Text>
                                    </HStack>
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='space-between'
                                    >
                                        <Text fontSize='16px' textColor='#817F7F'>{`${classDate.startDate} - ${classDate.endDate} ${classDate.month} ${classDate.year}`}</Text>
                                        <HStack>
                                            <Center
                                                p='0'
                                                bg={useColorModeValue('#1CA7EC', 'white')}
                                                w='20px'
                                                h='20px'
                                                borderRadius='full'
                                            >
                                                <CardClockIcon color={useColorModeValue('white', 'black')} w='14px' h='14px' />
                                            </Center>
                                            <Text fontSize='16px' textColor='#817F7F' >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
                                        </HStack>
                                    </HStack>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='197px'
                                    py='18px'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                        spacing='1rem'
                                    >
                                        <GraduationCapIcon w='20px' h='20px' color={iconColor} />
                                        <Text fontSize='16px' fontWeight='semibold'>{`รูปแบบการอบรม`}</Text>
                                        <Center
                                            h='30px'
                                            bg={classTypeBg(classDetail.classType)}
                                            borderRadius='47px'
                                            px='16px'
                                        >
                                            <Text as='b' fontSize='16px' textColor={classTypeTextColor(classDetail.classType)}>{classDetail.classType}</Text>
                                        </Center>
                                    </HStack>
                                    {
                                        classDetail.classType === 'Hybrid' && (
                                            <Stack
                                                mt='1rem'
                                            >
                                                <Text
                                                    fontSize='14px'
                                                    textColor='#7D7D7D'
                                                >
                                                    {`เลือกรูปแบบ`}
                                                </Text>
                                                <RadioGroup
                                                    value={classType}
                                                    onChange={setClassType}
                                                >
                                                    <Stack align='start' ml='1rem'>
                                                        {
                                                            classDetail.classType.toLowerCase() === 'classroom' || classDetail.classType.toLowerCase() === 'hybrid' ?
                                                                <Radio value='classroom'>
                                                                    <HStack justify='space-between' >
                                                                        <Text fontSize='16px' >{`Class Room`}</Text>
                                                                        <Tag h='30px' px='0.75rem' ml='1rem' borderRadius='47px' textColor={statusTextColor} bg={statusBgColor} >
                                                                            <UserAlertIcon w='15px' h='15px' />
                                                                            <Text ml='5px' fontSize='16px' >{statusText}</Text>
                                                                        </Tag>
                                                                    </HStack>
                                                                </Radio> : <></>
                                                        }
                                                        {
                                                            classDetail.classType.toLowerCase() === 'live' || classDetail.classType.toLowerCase() === 'hybrid' ?
                                                                <Radio value='live'>
                                                                    <HStack justify='space-between' >
                                                                        <Text fontSize='16px' >{`Live`}</Text>
                                                                        <Tag h='30px' px='0.75rem' ml='3.75rem' borderRadius='47px' textColor={statusTextColor} bg={statusBgColor} >
                                                                            <UserAddIcon w='15px' h='15px' color={statusTextColor} />
                                                                            <Text ml='5px' fontSize='16px' >{statusText}</Text>
                                                                        </Tag>
                                                                    </HStack>
                                                                </Radio> : <></>
                                                        }
                                                    </Stack>
                                                </RadioGroup>
                                            </Stack>
                                        )
                                    }
                                    <Stack
                                        mt='26px'
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='center'
                                    >
                                        <Button
                                            h='56px'
                                            w='236px'
                                            bg={isDisable?'gray':useColorModeValue('#19B5FE', 'white')}
                                            borderRadius='20px'
                                            color={useColorModeValue('white', 'black')}
                                            onClick={() => {
                                                if (!isDisable){
                                                    handleRegister(classDetail)
                                                }
                                            }}
                                            disabled={isDisable}
                                            _hover={{
                                                bg: isDisable?'gray':useColorModeValue('#19B5FE', 'white'),
                                            }}
                                            _active={{
                                                bg: isDisable?'gray':useColorModeValue('#19B5FE', 'white'),
                                            }}
                                        >
                                            <Text
                                                fontSize='20px'
                                                fontWeight='semibold'
                                            >
                                                {`สมัคร / สำรองที่นั่ง`}
                                            </Text>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </AspectRatio>
    )
}

export const LiveCalendar = ({ classDetails, course }: { classDetails: TClassDetails[], course: TCourseCard }) => {

    return (
        <Stack
            id='calendar'
            w={{ base: '1375px', md: '100%' }}
            h='386px'
            align='center'
            position='relative'
            spacing='1rem'
            display={{ base: 'none', xl: 'flex' }}
            overflow='hidden'
        >
            <CalendarHeaderStatus />
            <Stack
                w='100%'
                h='340px'
                spacing='0'
                shadow='lg'
                borderRadius='20px'
            >
                <Stack
                    w='100%'
                    h='86px'
                    align='center'
                    direction='row'
                    bg='#19B5FE'
                    borderTopRadius='20px'
                >
                    <Center
                        w='51px'
                        h='51px'
                        bg='#1B48BB'
                        borderRadius='14px'
                        ml='59px'
                    >
                        <CourseCalendarIcon w='28px' h='28px' color='white' />
                    </Center>
                    <Text
                        as='h2'
                        textColor='white'
                        fontSize='28px'
                        fontWeight='bold'
                    >
                        {`ตารางการฝึกอบรม`}
                    </Text>
                </Stack>
                <Stack
                    w='100%'
                    h='254px'
                    align='center'
                    justify={classDetails.length < 4 ? 'start' : 'space-around'}
                    direction='row'
                    spacing='43px'
                    bg='#E2EDFB'
                    borderBottomRadius='20px'
                    p='28px'
                    position='relative'
                    overflowX='scroll'
                >
                    <Stack direction='row' w='max-content'>
                        {
                            classDetails.map((item, index) => {
                                return (
                                    <CalendarCard
                                        key={index}
                                        date={{
                                            startDate: item.classStartDate as string,
                                            endDate: item.classEndDate as string
                                        }}
                                        course={course}
                                        classDetail={item}
                                        color={ClassStatusColor(item.classStatus)}
                                    />
                                )
                            })
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}


const MiniCalendarCard = ({ classDetail, color, onClick, course }: IMiniCalendar) => {

    const [classType, setClassType] = useState('Classroom')
    const classDate = {
        startDate: moment(new Date(classDetail.classStartDate as string)).format('DD'),
        endDate: moment(new Date(classDetail.classEndDate as string)).format('DD'),
        monthAbbr: moment(new Date(classDetail.classStartDate as string)).format('MMM'),
        month: moment(new Date(classDetail.classStartDate as string)).format('MMMM'),
        year: (Number(moment(new Date(classDetail.classStartDate as string)).format('YYYY'))).toString(),
    }

    const cardBgColor = useColorModeValue('white', '#2E2E2E')
    const cardActiveBgColor = useColorModeValue('white', '#0E4174')
    const iconColor = useColorModeValue('black', 'white')

    const router = useRouter()

    const handleRegister = (cd: TClassDetails) => {
        if (cd.classType.toLowerCase() === 'classroom') {
            return router.push(`/register/public/?class=${cd._id as string}`)
        } else if (cd.classType.toLowerCase() === 'live') {
            return router.push(`/register/public/?class=${cd._id as string}`)
        } else if (cd.classType.toLowerCase() === 'hybrid') {
            return router.push(`/register/hybrid/?class=${cd._id as string}&type=${classType}`)
        } else {
            return router.push(`/register/hybrid/?class=${cd._id as string}&type=${classType}`)
        }
    }

    const classTypeBg = (type: string) => {
        if (type.toLowerCase() === 'classroom') {
            return useColorModeValue('#8BF47A80', '#2E5C0E')
        }

        if (type.toLowerCase() === 'live') {
            return useColorModeValue('#FADEDE80', '#EB6969')
        }

        if (type.toLowerCase() === 'hybrid') {
            return useColorModeValue('#DEE0FA80', '#6974EB')
        }

        return useColorModeValue('#8BF47A80', '#2E5C0E')
    }

    const classTypeTextColor = (type: string) => {
        if (type.toLowerCase() === 'classroom') {
            return useColorModeValue('#2E5C0E', '#FFFFFF')
        }

        if (type.toLowerCase() === 'live') {
            return useColorModeValue('#E85353', '#FFFFFF')
        }

        if (type.toLowerCase() === 'hybrid') {
            return useColorModeValue('#535FE8', '#FFFFFF')
        }

        return useColorModeValue('#2E5C0E', '#FFFFFF')
    }

    let statusText = ''
    let statusBgColor = 'exBlue'
    let statusTextColor = 'white'

    if (classDetail.classStatus.toLocaleLowerCase() == 'full'){
        statusText = 'เต็ม'
        statusBgColor = 'red'
        statusTextColor = 'white'
    } else if (classDetail.classStatus.toLocaleLowerCase() == 'almost full'){
        statusText = 'ใกล้เต็ม'
        statusBgColor = 'statOrange'
        statusTextColor = 'black'
    } else if (classDetail.classStatus.toLocaleLowerCase() == 'open'){
        statusText = 'รับสมัคร'
        statusBgColor = 'statGreen'
        statusTextColor = 'white'
    }

    const isDisable = classDetail.classStatus.toLocaleLowerCase() == 'full'

    return (
        <AspectRatio
            ratio={158 / 158}
            maxH={{ base: '100px', 'md': '130px' }}
            w={{ base: '100px', 'md': '130px' }}
        >
            <Popover
                placement='bottom'
                arrowSize={20}
            >
                <PopoverTrigger>
                    <Center
                        as={Button}
                        h={{ base: '100px', 'md': '130px' }}
                        bg={cardBgColor}
                        flexDirection='column'
                        borderRadius='14px'
                        position='relative'
                        onClick={onClick}
                        _hover={{
                            bg: cardActiveBgColor,
                        }}
                        _active={{
                            bg: cardActiveBgColor,
                        }}
                    >
                        <Box p='0' m='0' position='relative' >
                            <Text
                                as='b'
                                fontSize={{ base: '18px', 'md': '28px' }}
                            >
                                {`${classDate.startDate}-${classDate.endDate}`}
                            </Text>
                            <Box
                                position='absolute'
                                top='-10px'
                                right='-8px'
                            >
                                <CalendarStatus color={color} border />
                            </Box>
                        </Box>
                        <Text
                            fontSize='18px'
                            fontWeight='semibold'
                            textColor={useColorModeValue('#717579', '#FFFFFF')}
                        >
                            {`${classDate.monthAbbr.toUpperCase()}`}
                        </Text>
                    </Center>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent
                        w={{ base: '100%', 'md': '460px' }}
                        h='398px'
                        borderRadius='20px'
                        zIndex={9999}
                    >
                        <PopoverArrow />
                        <PopoverBody
                            w={{ base: '100%', 'md': '460px' }}
                            h='398px'
                            bg={useColorModeValue('#FFFFFF', '#282828')}
                            borderRadius='20px'
                        >
                            <Stack
                                w='100%'
                                p='10px'
                                py='1.5rem'
                                align='center'
                            >
                                <Stack
                                    w='100%'
                                    h='75px'
                                    borderBottom='1px'
                                    borderColor='#D9D9D9'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                    >
                                        <CalendarIcon w='20px' h='20px' color={iconColor} />
                                        <Text fontSize='16px' fontWeight='semibold'>{`วันที่อบรม`}</Text>
                                    </HStack>
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='space-between'
                                    >
                                        <Text fontSize='16px' textColor='#817F7F'>{`${classDate.startDate} - ${classDate.endDate} ${classDate.month} ${classDate.year}`}</Text>
                                        <HStack>
                                            <Center
                                                p='0'
                                                bg={useColorModeValue('#1CA7EC', 'white')}
                                                w='20px'
                                                h='20px'
                                                borderRadius='full'
                                            >
                                                <CardClockIcon color={useColorModeValue('white', 'black')} w='14px' h='14px' />
                                            </Center>
                                            <Text fontSize='16px' textColor='#817F7F' >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
                                        </HStack>
                                    </HStack>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='197px'
                                    py='18px'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                        spacing='1rem'
                                    >
                                        <GraduationCapIcon w='20px' h='20px' color={iconColor} />
                                        <Text fontSize='16px' fontWeight='semibold'>{`รูปแบบการอบรม`}</Text>
                                        <Center
                                            h='30px'
                                            bg={classTypeBg(classDetail.classType)}
                                            borderRadius='47px'
                                            px='16px'
                                        >
                                            <Text as='b' fontSize='16px' textColor={classTypeTextColor(classDetail.classType)}>{classDetail.classType}</Text>
                                        </Center>
                                    </HStack>
                                    {
                                        classDetail.classType.toLowerCase() === 'hybrid' &&
                                        <Stack
                                            mt='1rem'
                                        >
                                            <Text
                                                fontSize='14px'
                                                textColor='#7D7D7D'
                                            >
                                                {`เลือกรูปแบบ`}
                                            </Text>
                                            <RadioGroup
                                                value={classType}
                                                onChange={(e: string) => {
                                                    setClassType(e)
                                                }}
                                            >
                                                <Stack align='start' ml='1rem'>
                                                    {
                                                        classDetail.classType.toLowerCase() === 'classroom' || classDetail.classType.toLowerCase() === 'hybrid' ?
                                                            <Radio value='classroom'>
                                                                <HStack justify='space-between' >
                                                                    <Text fontSize='16px' >{`Class Room`}</Text>
                                                                    <Tag h='30px' px='0.75rem' ml='1rem' borderRadius='47px' textColor={useColorModeValue('exGray', 'black')} bg='statOrange' >
                                                                        <UserAlertIcon w='15px' h='15px' />
                                                                        <Text ml='5px' fontSize='16px' >{`ใกล้เต็ม`}</Text>
                                                                    </Tag>
                                                                </HStack>
                                                            </Radio> : <></>
                                                    }
                                                    {
                                                        classDetail.classType.toLowerCase() === 'live' || classDetail.classType.toLowerCase() === 'hybrid' ?
                                                            <Radio value='live'>
                                                                <HStack justify='space-between' >
                                                                    <Text fontSize='16px' >{`Live`}</Text>
                                                                    <Tag h='30px' px='0.75rem' ml='3.75rem' borderRadius='47px' textColor='white' bg='statGreen' >
                                                                        <UserAddIcon w='15px' h='15px' color='white' />
                                                                        <Text ml='5px' fontSize='16px' >{`รับสมัคร`}</Text>
                                                                    </Tag>
                                                                </HStack>
                                                            </Radio> : <></>
                                                    }
                                                </Stack>
                                            </RadioGroup>
                                        </Stack>
                                    }
                                    <Stack
                                        mt='26px'
                                        w='100%'
                                        h='100%'
                                        align='center'
                                        justify='center'
                                    >
                                        <Button
                                            h='56px'
                                            w='236px'
                                            bg={isDisable?'gray':useColorModeValue('#19B5FE', 'white')}
                                            borderRadius='20px'
                                            color={useColorModeValue('white', 'black')}
                                            onClick={() => {
                                                if (!isDisable){
                                                    handleRegister(classDetail)
                                                }
                                            }}
                                            _hover={{
                                                bg: isDisable?'gray':useColorModeValue('#19B5FE', 'white'),
                                            }}
                                            _active={{
                                                bg: isDisable?'gray':useColorModeValue('#19B5FE', 'white'),
                                            }}
                                            disabled={isDisable}
                                        >
                                            <Text
                                                fontSize='20px'
                                                fontWeight='semibold'
                                            >
                                                {`สมัคร / สำรองที่นั่ง`}
                                            </Text>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </AspectRatio>
    )
}

export const MiniLiveCalendar = ({ classDetails, course }: { classDetails: TClassDetails[], course: TCourseCard }) => {

    return (
        <Stack
            id='mini-calendar'
            w='100%'
            h='min-content'
            maxW='100%'
            align='center'
            spacing='1rem'
            mt={{ base: '5rem', '2xl': '0' }}
            position={{ base: 'relative', '2xl': 'sticky' }}
            top={{ base: '0', '2xl': '7rem' }}
            zIndex={{ base: '0', '2xl': '10' }}
            overflowX='hidden'
        >
            <CalendarHeaderStatus small />
            <Stack
                w='100%'
                h='100%'
                spacing='0'
            >
                <Stack
                    w='100%'
                    h='81px'
                    align='center'
                    justify='center'
                    direction='row'
                    bg='#19B5FE'
                    borderTopRadius='20px'
                >
                    <Center
                        w='51px'
                        h='51px'
                        bg='#1B48BB'
                        borderRadius='14px'
                    >
                        <CourseCalendarIcon w='28px' h='28px' color='white' />
                    </Center>
                    <Text
                        as='b'
                        textColor='white'
                        fontSize='28px'
                    >
                        {`ตารางการฝึกอบรม`}
                    </Text>
                </Stack>
                <Stack
                    w='100%'
                    h='220px'
                    align='center'
                    justify='space-around'
                    direction='row'
                    spacing='20px'
                    bg='#E2EDFB'
                    borderBottomRadius='20px'
                    p='28px'
                    position='relative'
                >
                    <Box
                        as={Swiper}
                        id='miniCalendar'
                        w='100%'
                        h='100%'
                        px={{ base: '0rem', lg: '0.5rem' }}
                        slidesPerView='auto'
                        spaceBetween={useBreakpointValue({ base: 20, md: 30 })}
                        centeredSlides={false}
                        initialSlide={0}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                            snapOnRelease: true
                        }}
                        modules={[Scrollbar]}
                    >
                        {
                            classDetails.map((item, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={{
                                            width: useBreakpointValue({ base: '100px', md: '130px' }),
                                            height: useBreakpointValue({ base: '100px', md: '130px' }),
                                        }}
                                    >
                                        <MiniCalendarCard
                                            date={{
                                                startDate: item.classStartDate as string,
                                                endDate: item.classEndDate as string
                                            }}
                                            classDetail={item}
                                            course={course}
                                            color={ClassStatusColor(item.classStatus)}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}