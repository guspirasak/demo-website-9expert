'use client'

import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { ClockIcon, EducationIcon } from "@/app/icons/CourseIcon"
import { AspectRatio, Heading, ListItem, Stack, Text, UnorderedList, Image, useColorModeValue, Tooltip, Link, useBreakpointValue } from "@chakra-ui/react"
import commaNumber from "comma-number"

export const LiveBanner = () => {

    const { state }: ISingleCourseContext = useSingleCourse()

    const breakpoint = useBreakpointValue({
        sm: true,
        md: false
    })

    const bannerCardBg = useColorModeValue(
        { base: 'transparent', '2xl': 'white' },
        { base: state.courseColor[0], '2xl': '#282828' }
    )

    const bannerCardTextColor = useColorModeValue(
        { base: 'white', '2xl': 'black' },
        'white'
    )

    const bannerInnerCardBg = useColorModeValue(
        'white',
        { base: 'white', '2xl': '#282828' }
    )

    const bannerInnerCardTextColor = useColorModeValue(
        { base: '#2E2E2E', '2xl': 'black' },
        { base: 'black', '2xl': 'white' }
    )

    const bannerInnerCardSubTextColor = useColorModeValue(
        '#717579',
        { base: 'black', '2xl': 'white' }
    )

    return (
        <>
            <Stack
                w='100%'
                pl={{ base: '0', '2xl': '3rem', '3xl': '0' }}
                h={{ base: 'max-content', '2xl': '759px'  }}
                bg={
                    state.courseColor.length > 1 ?
                        { base: `linear-gradient(180deg, ${state.courseColor[1]}, ${state.courseColor[0]})`, '2xl': `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})` }
                        :
                        { base: `linear-gradient(180deg, ${state.courseColor[0]}, ${state.courseColor[0]})`, '2xl': `linear-gradient(0deg, ${state.courseColor[0]}, ${state.courseColor[0]})` }
                }
                align='center'
                justify='center'
                position='relative'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column-reverse', '2xl': 'row' }}
                    spacing={{ base: '0', '2xl': '1rem' }}
                >
                    <Stack
                        w={{ base: '100%', '2xl': '40%' }}
                        h='100%'
                        maxW={{ base: '100%', '2xl': '40%' }}
                        align='center'
                        justify='center'
                        position='relative'
                        mt={{ base: '0', '2xl': '-5%' }}
                    >
                        <AspectRatio
                            ratio={579 / 610}
                            display={{ base: 'none', '2xl': 'block' }}
                            w='500px'
                        >
                            <Stack
                                w='579px' //'579px'
                                h='610px'
                                minH='610px'
                                bg='#ffffff50'
                                borderRadius='49px'
                                mt='1rem'
                                shadow='xl'
                            >

                            </Stack>
                        </AspectRatio>
                        <AspectRatio
                            ratio={{ base: 8 / 12, md: 16 / 11, '2xl': 548 / 595 }}
                            position={{ base: 'relative', '2xl': 'absolute' }}
                            w={{ base: '100%', '2xl': '548px' }}
                        >
                            <Stack
                                w={{ base: '100%', '2xl': '622px' }} //'622px'
                                h={{ base: '100%', '2xl': '595px' }}
                                minH={{ base: '100%', '2xl': '595px' }}
                                bg={bannerCardBg}
                                borderRadius={{ base: '0', '2xl': '20px' }}
                                px={{ base: '20px', '2xl': '49px' }}
                                py={{ base: '0', '2xl': '39px' }}
                                shadow={{ base: 'none', '2xl': 'xl' }}
                                color={bannerCardTextColor}
                                mt={{ base: '0', '2xl': '3rem' }}
                            >
                                <Stack
                                    w='100%'
                                    h='min-content'
                                    pt='1rem'
                                >
                                    <Text
                                        w='max-content'
                                        display={{ base: 'none', '2xl': 'block' }}
                                        bg={useColorModeValue(`${state.courseColor[0]}10`, 'white')}
                                        px='16px'
                                        py='12px'
                                        borderRadius='full'
                                        textColor={useColorModeValue(`${state.courseColor[1]}`, 'black')}
                                    >
                                        {`Classroom`}
                                    </Text>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='fit-content'
                                    align='center'
                                    spacing='32px'
                                >
                                    <Stack
                                        h='90px'
                                        w='100%'
                                        align='center'
                                        direction='row'
                                        spacing='1rem'
                                    >
                                        <Stack
                                            w='7px'
                                            h='90px'
                                            bg={{ base: `${state.courseColor[0]}`, '2xl': `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})` }}
                                            borderRadius='20px'
                                        >

                                        </Stack>
                                        <Heading
                                            maxW={{ base: '100%', '2xl': '100%' }}
                                            fontSize={{ base: '42px', '2xl': '32px' }}
                                            as='h1'
                                        >
                                            {state.courseName}
                                        </Heading>
                                    </Stack>
                                    <Stack
                                        direction='row'
                                        w='100%'
                                        align='center'
                                        justify='start'
                                        spacing='15px'
                                        display={{ base: 'flex', '2xl': 'none' }}
                                    >
                                        <Text
                                            textColor='white'
                                            fontSize='24px'
                                            fontWeight='600'
                                        >
                                            {`รูปแบบ : `}
                                        </Text>
                                        <Text
                                            w='max-content'
                                            display={{ base: 'block', '2xl': 'none' }}
                                            bg='#FDF5F9'
                                            px='16px'
                                            py='7px'
                                            borderRadius='full'
                                            textColor='#922D89'
                                            fontWeight='600'
                                        >
                                            {`สอนสด`}
                                        </Text>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        spacing='32px'
                                        bg={bannerInnerCardBg}
                                        color={bannerInnerCardTextColor}
                                        p={{ base: '21px', '2xl': '0' }}
                                        borderRadius={{ base: '15px', '2xl': '0' }}
                                    >
                                        <Stack
                                            w='100%'
                                            spacing='8px'
                                        >
                                            <Stack
                                                direction='row'
                                                align='center'
                                            >
                                                <ClockIcon w={{ base: '21px', '2xl': '40px' }} h={{ base: '21px', '2xl': '40px' }} />
                                                <Text
                                                    fontSize={{ base: '18px', '2xl': '32px' }}
                                                    fontWeight='600'
                                                    textColor={bannerInnerCardSubTextColor}
                                                    as='h2'
                                                > 
                                                    {
                                                        state.classDetails.length > 0 ? 
                                                            `ช่วงเวลา ${state.classDetails[0].classStartTime} - ${state.classDetails[0].classEndTime} น.` 
                                                            : 
                                                            `ช่วงเวลา 09:00 - 16:00 น.`
                                                    }
                                                </Text>
                                            </Stack>
                                            <Stack
                                                direction='row'
                                            >
                                                <Stack w='32px' h='32px' ></Stack>
                                                <Text
                                                    fontSize={{ base: '16px', '2xl': '24px' }}
                                                    textColor={bannerInnerCardSubTextColor}
                                                    as='h3'
                                                >
                                                    {`ระยะเวลา ${state.days} วัน ( ${state.hours} ชม.)`}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            w='100%'
                                            spacing='8px'
                                        >
                                            <Stack
                                                direction='row'
                                                align='center'
                                            >
                                                <EducationIcon w={{ base: '21px', '2xl': '40px' }} h={{ base: '21px', '2xl': '40px' }} />
                                                <Text
                                                    fontSize={{ base: '18px', '2xl': '24px' }}
                                                    fontWeight='500'
                                                    as='h3'
                                                >
                                                    {`รองรับรูปแบบการอบรม`}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                direction='row'
                                            >
                                                <Stack w={{ base: '32px', '2xl': '40px' }} h={{ base: '32px', '2xl': '40px' }} ></Stack>
                                                <UnorderedList
                                                    color={bannerInnerCardSubTextColor}
                                                >
                                                    <ListItem>
                                                        {`สอนสด`}
                                                    </ListItem>
                                                    <ListItem>
                                                        {`Inhouse`}
                                                    </ListItem>
                                                </UnorderedList>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        h={{ base: 'max-content', '2xl': '100%' }}
                                        align='center'
                                        justify='center'
                                    >
                                        {
                                            state.price === 0 ?
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
                                                                fontSize={{ base: '36px', '2xl': '64px' }}
                                                                fontWeight='600'
                                                            >
                                                                {'Call'}
                                                            </Text>
                                                            :
                                                            <Text
                                                                fontSize={{ base: '36px', '2xl': '64px' }}
                                                                fontWeight='600'
                                                            >
                                                                {'Call'}
                                                            </Text>
                                                    }
                                                </Tooltip>
                                                :
                                                <Text 
                                                    fontSize={{ base: '36px', '2xl': '64px' }}
                                                    fontWeight='600'
                                                    as='h2'
                                                >{`${commaNumber(state.price)} บาท`}</Text>
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                        </AspectRatio>
                    </Stack>
                    <Stack
                        w={{ base: '100%', '2xl': '60%' }}
                        h='100%'
                        align='center'
                        justify='center'
                    >
                        <AspectRatio
                            ratio={ 480 / 289 }
                            w={{ base: '100%', '2xl': '700px', '3xl': '800px' }}
                        >
                            <Image 
                                alt={`${state.courseName} banner`}
                                w='100%'
                                h='100%'
                                borderRadius={{ base: '0', '2xl': '40px' }}
                                src={state.courseImage}
                                fit='cover'
                            />
                        </AspectRatio>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}