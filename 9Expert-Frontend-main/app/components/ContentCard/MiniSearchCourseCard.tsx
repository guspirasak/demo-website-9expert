'use client'

import { WorkshopIcons, CertificateIcon, AccountPaymentIcon, CardClockIcon } from "@/app/icons/CardIcons"
import { VStack, HStack, Tag, Box, Image, Text, Center, useColorModeValue, AspectRatio, Divider, Tooltip, useBreakpointValue } from "@chakra-ui/react"
import { TCourseCard } from "./Card"
import { CourseLevel } from "./CourseLevel"
import Link from "next/link"
import commaNumber from "comma-number"

export const MiniCourseFooter = ({ course }: { course: TCourseCard }) => {
    const iconBgColor = useColorModeValue('exDarkBlue.300', '#ffffff')
    const iconColor = useColorModeValue('#ffffff', '#2E2E2E')
    const textColor = useColorModeValue('#2E2E2E', '#ffffff')

    const breakpoint = useBreakpointValue({
        sm: true,
        lg: false
    })

    return (
        <HStack justify='space-between' w='100%' my='0.5rem'>
            <HStack id={`${course.courseName} mini-search-card-dau`}>
                <Center
                    p='0'
                    bg={iconBgColor}
                    w='26px'
                    h='26px'
                    borderRadius='full'
                >
                    <CardClockIcon color={iconColor} w='20px' h='20px' />
                </Center>
                <Text as='h4' fontSize='sm' fontWeight='bold' textColor={textColor} >{`${course.days} วัน(${course.hours} ชม.)`}</Text>
            </HStack>
            <HStack id={`${course.courseName} mini-search-card-price`}>
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
                                        textColor={textColor}
                                        fontWeight='bold'
                                    >
                                        {'Call'}
                                    </Text>
                                    :
                                    <Text
                                        fontSize='sm'
                                        textColor={textColor}
                                        fontWeight='bold'
                                    >
                                        {'Call'}
                                    </Text>
                            }
                        </Tooltip>
                        :
                        <Text as='h4' fontSize='sm' textColor={textColor} fontWeight='bold' >{`${commaNumber(course.price)}.-`}</Text>
                }
            </HStack>
        </HStack>
    )
}

export const MiniSearchCourseCard = ({ course }: { course: TCourseCard }) => {
    const iconColor = useColorModeValue('exBlue', '#ffffff')
    const textColor = useColorModeValue('#817F7F', '#ffffff')

    const tagColor = useColorModeValue(course.courseColor[1], 'black')
    const tagBg = useColorModeValue(`${course.courseColor[0]}70`, 'white')

    return (
        <Link
            href={course.courseUrl ? `${window.origin}/course/${course.courseUrl}` : `/course/${course.courseName.replaceAll(' ', '_')}`}
        >
            <Box

                w='340px'
                h='max-content'
                borderRadius='34px'
                border='1px'
                borderColor={useColorModeValue('gray.200', 'transparent')}
                boxShadow='md'
                bg={useColorModeValue('#ffffff', '#323232')}
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
                            color={useColorModeValue('#ffffff', '#2E2E2E')}
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
                            color={useColorModeValue('#ffffff', '#2E2E2E')}
                            borderRadius='20px'
                        >
                            {`Promotion`}
                        </Tag>
                    }
                </HStack>
                <AspectRatio ratio={480 / 289} w='100%' >
                    <Image
                        alt={`${course.courseName} image`}
                        w='100%'
                        borderRadius='30px 30px 0 0 '
                        fit='contain'
                        src={course.courseImage || "https://placehold.co/340x180"}
                    />
                </AspectRatio>
                <VStack m='1rem' align='start' color='#2E2E2E' >
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
                            {
                                course.skills.length > 0 && (
                                    <Tag
                                        as='h4'
                                        bg={tagBg}
                                        color={tagColor}
                                        borderRadius='20px'
                                    >
                                        {course.skills[0]}
                                    </Tag>
                                )
                            }
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
                        <Text
                            as='h3'
                            fontSize='xl'
                            fontWeight='extrabold'
                            noOfLines={2}
                            textColor={useColorModeValue('#2E2E2E', '#ffffff')}
                        >
                            {course.courseName}
                        </Text>
                    </HStack>
                    <Text noOfLines={2} fontSize='sm' textColor={textColor} minH='42px' >{course.courseTeaserAbbr}</Text>
                    <HStack justify='space-between' w='100%' mt='0.25rem'>
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
                    <Divider my='10px' borderColor='#C4C4C4' />
                    <MiniCourseFooter course={course} />
                </VStack>
            </Box>
        </Link>
        
    )
}