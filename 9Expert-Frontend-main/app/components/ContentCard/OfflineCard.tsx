'use client'

import { AccountPaymentIcon, CalendarIcon, CardClockIcon, CertificateIcon, GraduationCapIcon, WorkshopIcons } from "@/app/icons/CardIcons"
import { AspectRatio, Box, Button, Center, Divider, HStack, Image, Radio, RadioGroup, Tag, Text, Tooltip, VStack, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { ICardStatus, IMiniCalendar, TCourseCard } from "./Card"
import moment from "moment"
import { useState } from "react"
import { CourseLevel } from "./CourseLevel"
import { TClassDetails } from "@/app/admin/interface/CreateCourseInterface"
import { AnimatePresence, motion } from "framer-motion"
import commaNumber from "comma-number"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ClassStatusColor } from "@/libs/ClassStatusColor"


const MotionBox = motion(Box)
const MotionHStack = motion(HStack)
const MotionVStack = motion(VStack)
const MotionDivider = motion(Divider)

export const CardStatus = ({ status, color, border }: ICardStatus) => {

    const borderColor = useColorModeValue('white', '#282828')

    return (
        <HStack spacing='5px'>
            {
                border ?
                    <Box bg={color} w='10px' h='10px' border='2px' borderColor={borderColor} borderRadius='full'></Box>
                    :
                    <Box bg={color} w='10px' h='10px' borderRadius='full'></Box>
            }
            {
                status ?
                    <Text fontSize='10px' >{status}</Text>
                    :
                    <></>
            }
        </HStack>
    )
}

export const CarderFooterRadio = ({ classDetail }: { classDetail: TClassDetails }) => {
    const [radioValue, setRadioValue] = useState('class')

    return (
        <RadioGroup value={radioValue} onChange={setRadioValue}  >
            <VStack align='start' ml='1rem'>
                {
                    classDetail.classType === 'Classroom' || classDetail.classType === 'Hybrid' ?
                        <Radio value='class'>
                            <HStack justify='space-between' >
                                <Text fontSize='sm' >{`Class Room`}</Text>
                                {/* <Tag px='0.75rem' ml='1rem' borderRadius='xl' textColor='exGray' bg='statOrange' >
                                    <UserAlertIcon w='15px' h='15px' />
                                    <Text ml='5px' fontSize='sm' fontWeight='bold' >{`ใกล้เต็ม`}</Text>
                                </Tag> */}
                            </HStack>
                        </Radio>
                        :
                        <></>
                }
                {
                    classDetail.classType === 'Live' || classDetail.classType === 'Hybrid' ?
                        <Radio value='live'>
                            <HStack justify='space-between' >
                                <Text fontSize='sm' >{`Live`}</Text>
                                {/* <Tag px='0.75rem' ml='3.75rem' borderRadius='xl' textColor='white' bg='statGreen' >
                                    <UserAddIcon w='15px' h='15px' color='white' />
                                    <Text ml='5px' fontSize='sm' fontWeight='bold' >{`รับสมัคร`}</Text>
                                </Tag> */}
                            </HStack>
                        </Radio>
                        :
                        <></>
                }
            </VStack>
        </RadioGroup>
    )
}

export const ActiveCardFooter = ({ course, classDetail }: { course: TCourseCard, classDetail: TClassDetails }) => {

    const bgIconColor = useColorModeValue('exBlue', 'white')
    const iconColor = useColorModeValue('white', '#282828')
    const whiteIconColor = useColorModeValue('black', 'white')
    const tagTextColor = useColorModeValue('textPurple', 'white')
    const tagBgColor = useColorModeValue('tagPurple', 'textPurple')

    const pathSubmit = `/register/${classDetail.classType === 'Hybrid' ? 'hybrid' : 'public'}?class=${classDetail._id}`
    const isFull = classDetail.classStatus === 'Full'

    const stackProps = isFull ? {}:{ as: Link, href:pathSubmit } ;
    

    return (
        <AnimatePresence>
            <MotionBox
                w='100%'
                zIndex='50'
                initial={{
                    opacity: 0,
                    height: 0
                }}
                animate={{
                    opacity: 1,
                    height: 'auto'
                }}
                transition={{
                    duration: 0.3
                }}
                exit={{
                    opacity: 0,
                    height: 0
                }}
            >
                <MotionHStack
                    mt='1.5rem'
                    justify='space-between'
                    w='100%'
                    initial={{
                        opacity: 0,
                        y: -40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                >
                    <VStack
                        align='flex-start'
                        justify='flex-start'
                        spacing='0'
                    >
                        <HStack id={`${course.courseName} card-day active`}>
                            <CalendarIcon w='20px' h='20px' color={whiteIconColor} />
                            <Text as='h4' fontSize='sm' fontWeight='black' >{`วันที่อบรม`}</Text>
                        </HStack>
                        <Text fontSize='sm' textColor='exGray' >{`${moment(new Date(classDetail.classStartDate as string)).format('DD')} - ${moment(new Date(classDetail.classEndDate as string)).format('DD')} ${moment(new Date(classDetail.classStartDate as string)).locale('th').format('MMMM').toUpperCase()} ${moment(new Date(classDetail.classEndDate as string)).format('YYYY')}`}</Text>
                    </VStack>
                    <HStack id={`${course.courseName} card-dau active`}>
                        <Center 
                            p='0'
                            bg={bgIconColor}
                            w='26px'
                            h='26px'
                            borderRadius='full'
                        >
                            <CardClockIcon color={iconColor} w='20px' h='20px' />
                        </Center>
                        <Text as='h4' fontSize='sm' textColor='exGray' >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
                    </HStack>
                </MotionHStack>
                <MotionDivider
                    initial={{
                        opacity: 0,
                        y: -40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                />
                <MotionVStack
                    mt='1rem'
                    w='100%'
                    align='start'
                    justify='start'
                    initial={{
                        opacity: 0,
                        y: -40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                >
                    <HStack id={`${course.courseName} card-type active`}>
                        <GraduationCapIcon w='20px' h='20px' color={whiteIconColor} />
                        <Text as='h4' fontSize='sm' fontWeight='black' >{`รูปแบบการอบรม`}</Text>
                        <Tag px='0.75rem' borderRadius='xl' textColor={tagTextColor} bg={tagBgColor} >{classDetail.classType}</Tag>
                    </HStack>
                    {
                        classDetail.classType.toLowerCase() === 'hybrid' && (
                            <VStack as='h4' ml='1.75rem' mt='0.5rem' align='start' justify='start'>
                                <Text fontSize='sm' textColor='exGray' >{`เลือกรูปแบบ`}</Text>
                                <CarderFooterRadio classDetail={classDetail} />
                            </VStack>
                        )
                    }
                    <Divider my='0.25rem' />
                    <HStack id={`${course.courseName} card-price active`} mt='0.5rem' mb='1rem' w='100%' justify='space-between'>
                        <HStack>
                            <Center
                                p='0'
                                bg={bgIconColor}
                                w='26px'
                                h='26px'
                                borderRadius='full'
                            >
                                <AccountPaymentIcon color={iconColor} w='16px' h='16px' />
                            </Center>
                            <Text as='h4' fontSize='lg' fontWeight='black' >{`${course.price}.-`}</Text>
                        </HStack>
                        {/* <Button
                            onClick={()=>{
                                console.log('course: ',course);
                                console.log('classDetail: ',classDetail);
                                
                                return;
                            }}
                        >xx</Button> */}
                        <Button
                            {...stackProps}

                            w='50%'
                            bg={classDetail.classStatus === 'Full'?'gray':bgIconColor}
                            color={useColorModeValue('white', 'black')}
                            borderRadius='20px'
                            disabled={classDetail.classStatus === 'Full'}
                            _hover={{
                                bg: classDetail.classStatus === 'Full'?'gray':'exBlue',
                            }}
                            _active={{
                                bg: classDetail.classStatus === 'Full'?'gray':'exBlue',
                            }}
                        >
                            {`สมัคร / สำรองที่นั่ง`}
                        </Button>
                    </HStack>
                </MotionVStack>
            </MotionBox>
        </AnimatePresence>
    )
}

export const MiniCalendar = ({ date, color, onClick, isActive }: IMiniCalendar) => {

    const bgColorActive = useColorModeValue('exBlue', '#0E4174')
    const bgColor = useColorModeValue('white', '#282828')
    const borderColor = useColorModeValue('exLightBlue', '#FFFFFF33')

    return (
        <VStack
            align='center'
            justify='center'
            border='2px'
            borderColor={borderColor}
            borderRadius='10px'
            w='70px'
            h='55px'
            spacing='-2rem'
            cursor='pointer'
            onClick={onClick}
            transform={isActive ? 'scaleY(1.1)' : 'scaleY(1)'}
            color={isActive ? 'white' : ''}
            bg={isActive ? bgColorActive : bgColor}
            _hover={{
                bg: bgColorActive,
                color: 'white',
                transform: 'scaleY(1.1)',
            }}
        >
            <Box fontSize='md' fontWeight='black' p='0' m='0' position='relative' >
                {`${moment(new Date(date.startDate)).format('DD')}-${moment(new Date(date.endDate)).format('DD')}`}
                <Box
                    position='absolute'
                    top='-1px'
                    right='-5px'
                >
                    <CardStatus color={color} border />
                </Box>
            </Box>
            <Text fontSize='xs' fontWeight='black' p='0' m='0' >{`${moment(new Date(date.startDate)).format('MMM').toUpperCase()}`}</Text>
        </VStack>
    )
}

export const CardFooter = ({ course }: { course: TCourseCard }) => {

    const bgIconColor = useColorModeValue('exBlue', 'white')
    const iconColor = useColorModeValue('white', '#282828')

    const breakpoint = useBreakpointValue({
        sm: true,
        md: false
    })

    return (
        <HStack justify='space-between' w='100%' my='0.5rem'>
            <HStack id={`${course.courseName} card-dau`}>
                <Center
                    p='0'
                    bg={bgIconColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <CardClockIcon color={iconColor} w='20px' h='20px' />
                </Center>
                <Text as='h4' fontSize='sm' fontWeight='bold' >{`${course.days} วัน (${course.hours} ชม.)`}</Text>
            </HStack>
            <HStack id={`${course.courseName} card-price`}>
                <Center
                    p='0'
                    bg={bgIconColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <AccountPaymentIcon color={iconColor} w='16px' h='16px' />
                </Center>
                {
                    course.price === 0 ?
                        <Tooltip
                            w='fit-content'
                            bg='#2E2E2E'
                            hasArrow
                            textAlign='center'
                            label='ช่องทางการติดต่อ 02-219-4304 หรือ training@9expert.co.th'
                            borderRadius='5px'
                            py='13px'
                        >
                            {
                                breakpoint ?
                                    <Text
                                        as={Link}
                                        href={`tel:02-219-4304`}
                                        fontSize='sm'
                                        fontWeight='bold'
                                    >
                                        {'Call'}
                                    </Text>
                                    :
                                    <Text
                                        as='h4'
                                        fontSize='sm'
                                        fontWeight='bold'
                                    >
                                        {'Call'}
                                    </Text>
                            }
                        </Tooltip>
                        :
                        <Text as='h4' fontSize='sm' fontWeight='bold' >{`${commaNumber(course.price)}.-`}</Text>
                }
            </HStack>
        </HStack>
    )
}

export const OfflineCard = ({ course }: { course: TCourseCard }) => {

    const [active, setActive] = useState<number>(0)

    const iconColor = useColorModeValue('exBlue', 'white')
    const tagColor = useColorModeValue(course.courseColor[1], 'black')
    const tagBg = useColorModeValue(`${course.courseColor[0]}70`, 'white')

    const router = useRouter()

    const handleClickImage = () => {
        router.push(course.courseUrl ? `${window.origin}/course/${course.courseUrl}` : `/course/${course.courseName.replaceAll(' ', '_')}`)
    }

    return (
        <Box
            id={`${course.courseName} card`}
            w='340px'
            h='max-content'
            borderRadius='20px'
            border='1px'
            borderColor={useColorModeValue('gray.200', 'transparent')}
            boxShadow='exBlue'
            bg={useColorModeValue('white', '#282828')}
            position='relative'
            _hover={{
                transform: 'scale(1.05)',
            }}
        >
            <HStack
                w='fit-content'
                position='absolute'
                top='18px'
                left='22px'
                zIndex='3'
            >
                {
                    course.news &&
                    <Tag
                        as='h4'
                        bg={`#FF5FA7`}
                        color={`white`}
                        borderRadius='8px'
                        fontWeight='600'
                    >
                        {`New`}
                    </Tag>
                }
                {
                    course.promotion &&
                    <Tag
                        as='h4'
                        bg={`#F65A5A`}
                        color={`white`}
                        borderRadius='8px'
                        fontWeight='600'
                    >
                        {`Promotion`}
                    </Tag>
                }
                {
                    course.recommend &&
                    <Tag
                        as='h4'
                        bg={`#F65A5A`}
                        color={`white`}
                        borderRadius='8px'
                        fontWeight='600'
                    >
                        {`Recommended`}
                    </Tag>
                }
            </HStack>
            <AspectRatio ratio={480 / 289} w='100%' >
                <Image
                    loading='lazy'
                    alt={`${course.courseName} banner`}
                    w='100%'
                    h='180px'
                    borderRadius='30px 30px 0 0 '
                    fit='contain'
                    src={course.courseImage || "https://placehold.co/340x180"}
                    cursor='pointer'
                    onClick={handleClickImage}
                />
            </AspectRatio>
            <VStack id={`${course.courseName} card-detail`} m='1rem' align='start' >
                <HStack
                    justify='space-between'
                    w='100%'
                >
                    <HStack
                        id={`${course.courseName} card-tag`}
                        h='100%'
                    >
                        <Tag
                            as='h4'
                            bg={tagBg}
                            color={tagColor}
                            borderRadius='20px'
                        >
                            {course.courseGroupNameAbbr}
                        </Tag>
                        <Tag
                            as='h4'
                            bg={tagBg}
                            color={tagColor}
                            borderRadius='20px'
                        >
                            {course.skills[0]}
                        </Tag>
                    </HStack>
                    <CourseLevel level={course.difficultLevel} courseName={course.courseName} />
                </HStack>
                <HStack
                    minH='60px'
                >
                    <Box
                        w='4px'
                        h='50px'
                        bg={course.courseColor.length > 1 ? `linear-gradient(180deg, ${course.courseColor[0]}, ${course.courseColor[1]})` : course.courseColor[0]}
                        borderRadius='full'
                    ></Box>
                    <Link
                        href={course.courseUrl ? `${window.origin}/course/${course.courseUrl}` : `/course/${course.courseName.replaceAll(' ', '_')}`}
                    >
                        <Text
                            as='h3'
                            fontSize='xl'
                            fontWeight='extrabold'
                            noOfLines={2}
                        >
                            {course.courseName}
                        </Text>
                    </Link>
                </HStack>
                <Text noOfLines={2} fontSize='sm' textColor='exGray' minH='42px' >{course.courseTeaserAbbr}</Text>
                {/* <HStack
                    px='1rem'
                    py='0.25rem'
                >
                    <Avatar size='md' src={course.courseInstructorProfile || ''} />
                    <VStack
                        id="card-instructor"
                        align='start'
                        spacing='0'
                        ml='0.5rem'
                    >
                        <Text fontSize='xs' as='h3' fontWeight='bold' >{course.courseInstructor}</Text>
                        <Text fontSize='xs' as='h3' noOfLines={3} fontWeight='bold' textColor='exGray' py='0' >{course.courseInstructorTitle}</Text>
                    </VStack>
                </HStack> */}
                <HStack justify='space-between' w='100%' mt='0.25rem'>
                    {
                        course.workshop &&
                        <HStack spacing='1rem'>
                            <WorkshopIcons color={iconColor} w='22px' h='22px' />
                            <Text as='h4' fontWeight='bold' fontSize='sm' textColor='exGray' >{`Workshop`}</Text>
                        </HStack>
                    }
                    {
                        course.certificate &&
                        <HStack spacing='1rem' >
                            <CertificateIcon color={iconColor} w='22px' h='22px' />
                            <Text as='h4' fontWeight='bold' fontSize='sm' textColor='exGray' >{`เรียนจบได้ certificate`}</Text>
                        </HStack>
                    }
                </HStack>
                <Divider my='0.5rem' borderTop='1px' borderColor='exGray' />
                <HStack
                    id={`${course.courseName} card-schedule-all`}
                    justify='space-between'
                    w='100%'
                >
                    <HStack>
                        <Divider orientation='vertical' h='30px' borderRight='2px' borderColor='exBlue' borderRadius='full' />
                        <Text as='h4' fontWeight='bold' >{`รอบการอบรม`}</Text>
                    </HStack>
                    <HStack>
                        <CardStatus status='รับสมัคร' color='statGreen' />
                        <CardStatus status='ใกล้เต็ม' color='statOrange' />
                        <CardStatus status='เต็ม' color='statRed' />
                    </HStack>
                </HStack>
                <HStack
                    w='100%'
                    h='100%'
                    minH='55px'
                    align='center'
                    justify={course.classDetails?.length > 4 ? 'space-between' : 'start'}
                >
                    {
                        course.classDetails?.slice(0, 4).map((item, index) => (
                            <MiniCalendar
                                key={index}
                                date={{
                                    startDate: item.classStartDate as string,
                                    endDate: item.classEndDate as string
                                }}
                                onClick={() => {
                                    if (active === index + 1) {
                                        setActive(0)
                                    } else {
                                        setActive(index + 1)
                                    }
                                }}
                                color={ClassStatusColor(item.classStatus)}
                                course={course}
                                classDetail={item}
                                isActive={active === index + 1}
                            />
                        ))
                    }
                </HStack>
                {
                    active === 0 ?
                        <CardFooter course={course} />
                        :
                        <ActiveCardFooter course={course} classDetail={course.classDetails?.[active - 1]} />
                }
            </VStack>
        </Box>
    )
}