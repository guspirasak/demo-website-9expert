'use client'

import { WorkshopIcons, CertificateIcon, AccountPaymentIcon, CardClockIcon } from "@/app/icons/CardIcons"
import { VStack, HStack, Tag, Avatar, Box, Image, Text, Center, useColorModeValue, AspectRatio, Link, Tooltip, useBreakpointValue } from "@chakra-ui/react"
import { AverageStars } from "../AverageStar"
import { TCourseCard } from "./Card"
import { CourseLevel } from "./CourseLevel"
import commaNumber from "comma-number"

export const OnlineCardFooter = ({ course }: { course: TCourseCard }) => {

    const iconBgColor = useColorModeValue('exDarkBlue.300', 'white')
    const iconColor = useColorModeValue('white', 'black')
    const textColor = useColorModeValue('exDarkBlue.100', 'white')

    const breakpoint = useBreakpointValue({
        sm: true,
        md: false
    })

    return (
        <HStack justify='space-between' w='100%' my='0.5rem'>
            <HStack id={`${course.courseName} online-card-dau`}>
                <Center
                    p='0'
                    bg={iconBgColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <CardClockIcon color={iconColor} w='20px' h='20px' />
                </Center>
                <Text as='h3' fontSize='sm' fontWeight='bold' textColor={textColor} >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
            </HStack>
            <HStack id={`${course.courseName} online-card-price`}>
                <Center
                    p='0'
                    bg={iconBgColor}
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
                                        fontSize='sm'
                                        fontWeight='bold'
                                    >
                                        {'Call'}
                                    </Text>
                            }
                        </Tooltip>
                        :
                        <Text as='h3' fontSize='sm' fontWeight='bold' >{`${commaNumber(course.price)}.-`}</Text>
                }
            </HStack>
        </HStack>
    )
}

export const OnlineCard = ({ course }: { course: TCourseCard }) => {

    const iconColor = useColorModeValue('exBlue', 'white')
    const textColor = useColorModeValue('exDarkBlue.100', 'white')
    const tagColor = useColorModeValue(`${course.courseColor[1]}`, 'black')
    const tagBg = useColorModeValue(`${course.courseColor[0]}`, 'white')

    return (
        <Box
            w='340px'
            h='max-content'
            borderRadius='34px'
            border='1px'
            borderColor={useColorModeValue('gray.200', 'transparent')}
            boxShadow='md'
            bg='#0B345D'
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
                    alt={`${course.courseName} banner`}
                    w='100%'
                    borderRadius='30px 30px 0 0 '
                    fit='contain'
                    src={course.courseImage || "https://placehold.co/340x180" }
                />
            </AspectRatio>
            <VStack m='1rem' align='start' color='white' >
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
                    <Text as='h3' fontSize='xl' fontWeight='extrabold' >{course.courseName}</Text>
                </HStack>
                <Text h='42px' fontSize='sm' noOfLines={2} textColor={textColor} >{course.courseTeaserAbbr}</Text>
                {/* <HStack
                    px='1rem'
                    py='0.25rem'
                >
                    <Avatar size='md' src={course.courseInstructorProfile || ''} />
                    <VStack
                        align='start'
                        spacing='0'
                        ml='0.5rem'
                    >
                        <Text as='h3' fontSize='xs' fontWeight='bold' >{course.courseInstructor}</Text>
                        <Text fontSize='xs' as='b' textColor={textColor} py='0' >{course.courseInstructorTitle}</Text>
                        <HStack spacing='0' >
                            {AverageStars(4.7, '10px', 'exDarkStarYellow')}
                            <Text ml='0.25rem' fontSize='xs'>{`4.7/5.0`}</Text>
                        </HStack>
                    </VStack>
                </HStack> */}
                <HStack justify='space-between' w='100%' h='22px' mt='0.25rem'>
                    {
                        course.workshop &&
                        <HStack spacing='1rem'>
                            <WorkshopIcons color={iconColor} w='22px' h='22px' />
                            <Text as='h4' fontSize='sm' textColor={textColor} >{`Workshop`}</Text>
                        </HStack>
                    }
                    {
                        course.certificate &&
                        <HStack spacing='1rem' >
                            <CertificateIcon color={iconColor} w='22px' h='22px' />
                            <Text as='h4' fontSize='sm' textColor={textColor} >{`เรียนจบได้ certificate`}</Text>
                        </HStack>
                    }
                </HStack>
                <OnlineCardFooter course={course} />
            </VStack>
        </Box>
    )
}