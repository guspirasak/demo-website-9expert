'use client'

import { AverageStars } from "@/app/components/AverageStar"
import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { CalendarIcon } from "@/app/icons/CardIcons"
import { CertificateIcon, ClockIcon } from "@/app/icons/CourseIcon"
import { AspectRatio, Heading, Stack, Text, Image, Button, useColorModeValue } from "@chakra-ui/react"
import commaNumber from "comma-number"
import Link from "next/link"

export const ELBanner = () => {

    const { state }: ISingleCourseContext = useSingleCourse()

    const bannerCardBg = useColorModeValue(
        { base: 'transparent', '2xl': 'white' },
        { base: '#282828', '2xl': '#282828' }
    )

    const bannerCardTextColor = useColorModeValue(
        { base: 'white', '2xl': 'black' },
        { base: 'black', '2xl': 'white' }
    )

    const bannerInnerCardBg = useColorModeValue(
        'white',
        { base: '#282828', '2xl': '#282828' }
    )

    const bannerInnerCardTextColor = useColorModeValue(
        'black',
        { base: 'black', '2xl': 'white' }
    )

    const bannerInnerCardSubTextColor = useColorModeValue(
        '#717579',
        'white'
    )


    return (
        <>
            <Stack
                w='100%'
                h={{ base: 'max-content', '2xl': '759px' }}
                pb={{ base: '2rem', '2xl': '0' }}
                bg={
                    state.courseColor.length > 1 ?
                        { base: `linear-gradient(180deg, ${state.courseColor[1]}, ${state.courseColor[0]})`, xl: `linear-gradient(180deg, ${state.courseColor[1]}, ${state.courseColor[0]})` }
                        :
                        { base: `linear-gradient(180deg, ${state.courseColor[0]}, ${state.courseColor[0]})`, xl: `linear-gradient(180deg, ${state.courseColor[0]}, ${state.courseColor[0]})` }
                }
                align='center'
                justify='center'
                position='relative'
            >
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify={{ base: 'center', '2xl': 'space-between' }}
                    direction={{ base: 'column-reverse', '2xl': 'row' }}
                    spacing={{ base: '2rem', '2xl': '1rem' }}
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
                                        {`e-learning`}
                                    </Text>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='fit-content'
                                    align='center'
                                    spacing='26px'
                                >
                                    <Stack
                                        h='110px'
                                        w='100%'
                                        align='center'
                                        direction='row'
                                        spacing='1rem'
                                    >
                                        <Stack
                                            w='7px'
                                            h='110px'
                                            bg={{ base: `${state.courseColor[0]}`, '2xl': `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})` }}
                                            borderRadius='20px'
                                        >

                                        </Stack>
                                        <Heading
                                            maxW='375px'
                                            fontSize={{ base: '48px', '2xl': '32px' }}
                                            as='h1'
                                            noOfLines={2}
                                        >
                                            {state.courseName}
                                        </Heading>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        ml='33px'
                                        align='center'
                                        justify='start'
                                        direction='row'
                                        display={{ base: 'flex', '2xl': 'none' }}
                                    >
                                        {AverageStars(4.5)}
                                        <Text textColor='#F79D1D' >{`4.7/5.0`}</Text>
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
                                        >
                                            {`e-learning`}
                                        </Text>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        spacing='15px'
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
                                                <ClockIcon w={{ base: '21px', '2xl': '22px' }} h={{ base: '21px', '2xl': '22px' }} />
                                                <Text
                                                    fontSize={{ base: '18px', '2xl': '18px' }}
                                                    fontWeight='600'
                                                >
                                                    {`จำนวนบทเรียน 51 บทเรียน`}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                direction='row'
                                            >
                                                <Stack w='32px' h='32px' ></Stack>
                                                <Text
                                                    fontSize={{ base: '16px', '2xl': '14px' }}
                                                    textColor={bannerInnerCardSubTextColor}
                                                >
                                                    {`( รวม 7 ชั่วโมง 14 นาที )`}
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
                                                <CalendarIcon w={{ base: '21px', '2xl': '22px' }} h={{ base: '21px', '2xl': '22px' }} />
                                                <Text
                                                    fontSize={{ base: '18px', '2xl': '18px' }}
                                                    fontWeight='500'
                                                >
                                                    {`ระยะเวลาเรียน 365 วัน`}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                        {
                                            state.certificate &&
                                            <Stack
                                                w='100%'
                                                spacing='8px'
                                            >
                                                <Stack
                                                    direction='row'
                                                    align='center'
                                                >
                                                    <CertificateIcon w={{ base: '21px', '2xl': '22px' }} h={{ base: '21px', '2xl': '22px' }} />
                                                    <Text
                                                        fontSize={{ base: '18px', '2xl': '18px' }}
                                                        fontWeight='500'
                                                    >
                                                        {`รับวุฒิบัตรเมื่อเรียนครบ 100% และทำข้อสอบผ่าน 80%`}
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                        }
                                        <Stack
                                            w='100%'
                                            spacing='8px'
                                            display={{ base: 'none', '2xl': 'block' }}
                                        >
                                            <Stack
                                                direction='row'
                                                align='center'
                                            >
                                                <Text
                                                    fontSize={{ base: '18px', '2xl': '48px' }}
                                                    fontWeight='600'
                                                >
                                                    {`${commaNumber(state.price)} บาท`}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        w='100%'
                                        h={{ base: 'max-content', '2xl': '100%' }}
                                        align='center'
                                        justify='center'
                                        mt={{ base: '2rem', '2xl': '0' }}
                                    >
                                        <Link
                                            href={state.onlineUrl ? state.onlineUrl : '#'}
                                            target="_blank"
                                        >
                                            <Button
                                                w='271px'
                                                h='65px'
                                                variant={{ base: 'none', '2xl': 'outline' }}
                                                bg={{ base: 'linear-gradient(180deg, #FEC84B, #EF6C00)', '2xl': 'none' }}
                                                borderRadius='55px'
                                                fontSize='24px'
                                                fontWeight='600'
                                                textColor={{ base: 'white', '2xl': state.courseColor[0] }}
                                                borderColor={{ base: 'none', '2xl': state.courseColor[0] }}
                                                _hover={{
                                                    bg: { base: 'linear-gradient(180deg, #FEC84B, #EF6C00)', '2xl': `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})` },
                                                    textColor: 'white',
                                                    border: 'transparent',
                                                }}
                                                _active={{
                                                    bg: { base: 'linear-gradient(180deg, #FEC84B, #EF6C00)', '2xl': `linear-gradient(0deg, ${state.courseColor[1]}, ${state.courseColor[0]})` },
                                                    textColor: 'white',
                                                    border: 'transparent',
                                                }}
                                            >
                                                {`สมัครเรียน`}
                                            </Button>
                                        </Link>
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
                            ratio={480 / 289}
                            w={{ base: '100%', '2xl': '800px' }}
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