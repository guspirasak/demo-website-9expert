'use client'

import { StudentIcon, WorkshopIcons, CertificateIcon, AccountPaymentIcon, CardClockIcon } from "@/app/icons/CardIcons"
import { VStack, HStack, Tag, Box, Image, Text, Center, useColorModeValue, AspectRatio, Divider } from "@chakra-ui/react"
import { TCourseCard } from "./Card"
import { CourseLevel } from "./CourseLevel"
import Link from "next/link"
import commaNumber from "comma-number"

export const MiniCourseFooter = ({ course }: { course: TCourseCard }) => {

    const iconBgColor = useColorModeValue('exDarkBlue.300', 'white')
    const iconColor = useColorModeValue('white', 'black')
    const textColor = useColorModeValue('black', 'white')

    return (
        <HStack justify='space-between' w='100%' my='0.5rem'>
            <HStack id={`${course.courseName} mini-card-dau`}>
                <Center
                    p='0'
                    bg={iconBgColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <CardClockIcon color={iconColor} w='20px' h='20px' />
                </Center>
                <Text as='h4' fontSize='0.8rem' fontWeight='bold' textColor={textColor} >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
            </HStack>
            <HStack id={`${course.courseName} mini-card-price`}>
                <Center
                    p='0'
                    bg={iconBgColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <AccountPaymentIcon color={iconColor} w='16px' h='16px' />
                </Center>
                <Text as='h4' fontSize='0.8rem' fontWeight='bold' textColor={textColor} >{course.price ? `${commaNumber(course.price)}.-` : 'Call'}</Text>
            </HStack>
        </HStack>
    )
}

export const MiniRecommandCard = ({ course }: { course: TCourseCard }) => {
    const iconColor = useColorModeValue('exBlue', 'white')
    const textColor = useColorModeValue('#817F7F', 'white')
    const tagColor = useColorModeValue('green', 'black')
    const tagBg = useColorModeValue('green.100', 'white')

    return (
        <Box
            as={Link}
            href={course.courseUrl ? `${window.origin}/course/${course.courseUrl}` : `/course/${course.courseName.replaceAll(' ', '_')}`}
            w='327px'
            h='max-content'
            borderRadius='34px'
            border='1px'
            borderColor={useColorModeValue('gray.200', 'transparent')}
            boxShadow='md'
            bg={useColorModeValue('white', '#282828')}
            position='relative'
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
                        color={useColorModeValue('white', 'black')}
                        borderRadius='20px'
                    >
                        {`New`}
                    </Tag>
                }
                {
                    course.promotion &&
                    <Tag
                        as='h4'
                        bg={`#F65A5A`}
                        color={useColorModeValue('white', 'black')}
                        borderRadius='20px'
                    >
                        {`Promotion`}
                    </Tag>
                }
            </HStack>
            <AspectRatio ratio={480 / 289} w='100%' >
                <Image
                    alt={course.courseName + " banner"}
                    w='100%'
                    borderRadius='30px 30px 0 0 '
                    fit='contain'
                    src={course.courseImage || "https://placehold.co/340x180"}
                />
            </AspectRatio>
            <VStack m='10px' align='start' color='black' spacing='0' >
                <HStack
                    justify='space-between'
                    w='100%'
                >
                    <HStack
                        h='100%'
                    >
                        <Tag
                            as='h4'
                            bg={tagBg}
                            color={tagColor}
                            borderRadius='20px'
                            fontSize={'0.8rem'}
                        >
                            {course.courseGroupNameAbbr}
                        </Tag>
                        <Tag
                            as='h4'
                            bg={tagBg}
                            color={tagColor}
                            borderRadius='20px'
                            fontSize={'0.8rem'}
                        >
                            {course.skills[0]}
                        </Tag>
                    </HStack>
                    <CourseLevel level={course.difficultLevel} courseName={course.courseName} />
                </HStack>
                <HStack
                    minH='38px'
                >
                    <Box w='4px' h='31px' bgColor='rgba(54, 179, 126, 1)' borderRadius='full'></Box>
                    <Text
                        as='h3'
                        fontSize='1rem'
                        fontWeight='extrabold'
                        noOfLines={2}
                        textColor={useColorModeValue('black', 'white')}
                    >
                        {course.courseName}
                    </Text>
                </HStack>
                <Text noOfLines={2} fontSize='0.8rem' textColor={textColor} minH='42px' >{course.courseTeaserAbbr}</Text>
                <HStack justify='space-between' w='100%' mt='0.25rem'>
                    {
                        course.workshop &&
                        <HStack spacing='1rem'>
                            <WorkshopIcons color={iconColor} w='20px' h='20px' />
                            <Text as='h4' fontSize='0.8rem' textColor={textColor} >{`Workshop`}</Text>
                        </HStack>
                    }
                    {
                        course.certificate &&
                        <HStack spacing='1rem' >
                            <CertificateIcon color={iconColor} w='20px' h='20px' />
                            <Text as='h4' fontSize='0.8rem' textColor={textColor} >{`เรียนจบได้ certificate`}</Text>
                        </HStack>
                    }
                </HStack>
                <Divider my='5px' borderColor='#C4C4C4' />
                <MiniCourseFooter course={course} />
            </VStack>
        </Box>
    )
}