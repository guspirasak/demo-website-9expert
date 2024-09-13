'use client'

import { TBundleCard } from "@/app/admin/interface/BundleInterface"
import { WorkshopIcons, CertificateIcon, AccountPaymentIcon, CardClockIcon } from "@/app/icons/CardIcons"
import { VStack, HStack, Tag, Box, Image, Text, Center, useColorModeValue, AspectRatio, Tooltip, useBreakpointValue, Stack } from "@chakra-ui/react"
import { TCourseCard } from "./Card"
import { CourseLevel } from "./CourseLevel"
import commaNumber from "comma-number"
import Link from "next/link"

export const OnlineCardFooter = ({ bundle, course }: { bundle: TBundleCard, course: TCourseCard }) => {

    const iconBgColor = useColorModeValue('exDarkBlue.300', 'white')
    const iconColor = useColorModeValue('white', 'black')
    const textColor = useColorModeValue('exDarkBlue.100', 'white')

    const breakpoint = useBreakpointValue({
        sm: true,
        md: false
    })

    return (
        <HStack justify='space-between' w='100%' my='0.5rem'>
            <HStack id={`${course.courseName} bundle-card-dau`}>
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
            <HStack id={`${course.courseName} bundle-card-price`}>
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
                    bundle.sellPrice === 0 ?
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
                        <Text as='h4' fontSize='sm' fontWeight='bold' >{`${commaNumber(course.price)}.-`}</Text>
                }
            </HStack>
        </HStack>
    )
}

export const OnlineBundleCard = ({ bundle, course }: { bundle: TBundleCard, course: TCourseCard }) => {

    const iconColor = useColorModeValue('exBlue', 'white')
    const textColor = useColorModeValue('exDarkBlue.100', 'white')
    const tagColor = useColorModeValue('green', 'black')
    const tagBg = useColorModeValue('green.100', 'white')

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
        >
            <Stack
                w='fit-content'
                h='fit-content'
                px='15px'
                py='5px'
                bg='#F65A5A'
                borderRightRadius='10px'
                position='absolute'
                zIndex='1'
                top='24px'
            >
                <Text
                    fontSize='1rem'
                    textColor='white'
                >
                    {`โปรโมชั่นรวม ${bundle.course.length} หลักสูตร!!`}
                </Text>
            </Stack>
            <AspectRatio ratio={480 / 289} w='100%' >
                <Image
                    alt='course-banner-bundle'
                    w='100%'
                    borderRadius='30px 30px 0 0 '
                    fit='contain'
                    src={bundle.image || "https://placehold.co/340x180"}
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
                            {`Excel`}
                        </Tag>
                        <Tag
                            as='h4'
                            bg={tagBg}
                            color={tagColor}
                            borderRadius='20px'
                        >
                            {`Office`}
                        </Tag>
                    </HStack>
                    <CourseLevel level={course.difficultLevel} courseName={bundle.name} />
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
                    <Text as='h3' fontSize='xl' fontWeight='extrabold' >{bundle.name}</Text>
                </HStack>
                <Text h='42px' fontSize='sm' noOfLines={2} textColor={textColor} >{bundle.teaser ? bundle.teaser : course.courseTeaserAbbr}</Text>
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
                <OnlineCardFooter course={course} bundle={bundle} />
            </VStack>
        </Box>
    )
}

export const BundleCard = ({ bundle, scale }: { bundle: TBundleCard, scale?: string }) => {
    return (
        <Link
            href={`/bundle/${bundle.name.replaceAll(" ", "_")}_bundle`}
        >
            <Stack
                w='100%'
                h='100%'
                mt='70px'
                justify='end'
                position='relative'
                transform={scale ? `scale(${scale})` : 'scale(1)'}
                _hover={{
                    transform: 'scale(1.05)',
                }}
            >
                <Stack
                    w='fit-content'
                    h='fit-content'
                    align='center'
                    justify='center'
                >
                    {
                        bundle.course.length > 2 &&
                        <AspectRatio
                            ratio={480 / 289}
                            w='290px'
                            position='absolute'
                            top='-70px'
                        >
                            <Image
                                w='100%'
                                borderRadius='30px 30px 0 0 '
                                fit='contain'
                                src={bundle.course[1].courseImage}
                                alt='course-banner-bundle-1'
                            />
                        </AspectRatio>
                    }
                    {
                        bundle.course.length > 1 &&
                        <AspectRatio
                            ratio={480 / 289}
                            w='320px'
                            position='absolute'
                            top='-40px'
                        >
                            <Image
                                w='100%'
                                borderRadius='30px 30px 0 0 '
                                fit='contain'
                                src={bundle.course[0].courseImage}
                                alt='course-banner-bundle-2'
                            />
                        </AspectRatio>
                    }
                    <OnlineBundleCard bundle={bundle} course={bundle.course[0]} />
                </Stack>
            </Stack>
        </Link>
    )
}