'use client'

import { PlayIcon } from "@/app/icons/HomeIcons"
import { AspectRatio, Stack, Image, Tag, Box, Heading, Text, HStack, useColorModeValue, useBreakpointValue } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { useArticle } from "../context/ArticleContext"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { useSelector } from "react-redux"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getPinArticle } from "@/libs/AdminAPI"

const ArticleBannerCard = ({ article, isActive }: { article: TArticle, isActive: boolean }) => {
    const technologyArea: TTechnologyArea[] = useSelector(getTechnologyAreas)
    const router = useRouter()
    const tagColor = useColorModeValue('#1CA7EC', '#EBEBEB')
    const titleColor = useColorModeValue('#3B3B3B', '#EBEBEB')
    const contentColor = useColorModeValue('#817F7F', '#EBEBEB')
    const cardBg = useColorModeValue('#FFFFFF', '#FFFFFF11')
    const iconBgColor = useColorModeValue('exBlue', 'white')
    const iconColor = useColorModeValue('white', '#282828')

    const handleClick = () => {
        router.push(`/article/${article.articleTitle.replaceAll(/ /g, '_')}`)
    }

    return (
        <AspectRatio
            ratio={{ base: 320 / 296, lg: 1159 / 900 }}
            w={{ base: isActive ? '296px' : '275px', lg: isActive ? '900px' : '800px' }}
            h='fit-content'
            onClick={handleClick}
            cursor='pointer'
            mt={isActive ? '0' : '4%'}
        >
            <Stack
                w='100%'
                borderRadius='20px'
                bg={cardBg}
                spacing={0}
                position='relative'
                shadow='md'
            >
                <AspectRatio
                    ratio={{ base: 320 / 152, lg: 1159 / 595 }}
                    w='100%'
                >
                    <Image
                        alt={`${article.articleTitle} banner`}
                        src={article.articleImage}
                        borderTopRadius='20px'
                    />
                </AspectRatio>
                <Stack
                    w='100%'
                    h='240px'
                    spacing='1rem'
                    p={{ base: '1rem', lg: '2rem' }}
                >
                    <HStack
                        spacing='1rem'
                    >
                        <Tag
                            w='fit-content'
                            variant='ghost'
                            h={{ base: '24px', lg: '39px' }}
                            px={{ base: '16px', lg: '31px' }}
                            borderRadius='25px'
                            border='1px'
                            borderColor='#1CA7EC'
                            textColor={tagColor}
                            fontWeight='semibold'
                            fontSize={{ base: '0.75rem', lg: '1rem' }}
                            alignItems='center'
                            justifyContent='center'
                        >
                            {`ทั่วไป`}
                        </Tag>
                        <Tag
                            variant='ghost'
                            display='inline-flex'
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                            overflow='hidden'
                            w='fit-content'
                            h={{ base: '24px', lg: '39px' }}
                            px={{ base: '16px', lg: '31px' }}
                            borderRadius='25px'
                            border='1px'
                            borderColor='#1CA7EC'
                            textColor={tagColor}
                            fontWeight='semibold'
                            fontSize={{ base: '0.75rem', lg: '1rem' }}
                            alignItems='center'
                            justifyContent='center'
                        >
                            {technologyArea.length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === article.technologyArea).length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === article.technologyArea)[0].technologyName}
                        </Tag>
                        <Tag
                            variant='ghost'
                            w='fit-content'
                            h={{ base: '24px', lg: '39px' }}
                            px={{ base: '16px', lg: '31px' }}
                            borderRadius='25px'
                            border='1px'
                            borderColor='#1CA7EC'
                            textColor={tagColor}
                            fontWeight='semibold'
                            fontSize={{ base: '0.75rem', lg: '1rem' }}
                            alignItems='center'
                            justifyContent='center'
                        >
                            {article.skills![0]}
                        </Tag>
                    </HStack>
                    <Stack
                        w='100%'
                        direction='row'
                        align='center'
                    >
                        <Box
                            w='0'
                            h={{ base: '20px', lg: '40px' }}
                            border='2px'
                            borderColor='#1CA7EC'
                            borderRadius='full'
                        >
                        </Box>
                        <Heading
                            noOfLines={1}
                            as='h2'
                            fontSize={{ base: '1rem', lg: '2rem' }}
                            textColor={titleColor}
                        >
                            {article.articleTitle}
                        </Heading>
                    </Stack>
                    <Text
                        noOfLines={{ base: 2, lg: 2 }}
                        w='90%'
                        h='min-content'
                        fontSize={isActive ? { base: '0.75rem', lg: '1.25rem' } : { base: '0.5rem', lg: '1rem' }}
                        textColor={contentColor}
                    >
                        {article.articleTeaserAbbr}
                    </Text>
                </Stack>
                {
                    article.articleType.toLowerCase() === 'video' &&
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        zIndex='1'
                        w={{ base: isActive ? '40px' : '35px', lg: isActive ? '125px' : '100px' }}
                        h={{ base: isActive ? '40px' : '35px', lg: isActive ? '125px' : '100px' }}
                        bg='#1CA7EC'
                        position='absolute'
                        bottom='130px'
                        right={{ base: '20px', lg: '50px' }}
                        border='2px'
                        borderColor='white'
                        borderRadius='full'
                    >
                        <PlayIcon
                            w={{ base: isActive ? '40px' : '35px', lg: isActive ? '120px' : '95px' }}
                            h={{ base: isActive ? '40px' : '35px', lg: isActive ? '120px' : '95px' }}
                            color='white' 
                        />
                    </Box>
                }
            </Stack>
        </AspectRatio>
    )
}

export const ArticleBanner = () => {
    
    const { state } = useArticle()

    const [pin, setPin] = useState<TArticle[]>([])

    useEffect(() => {
        getPinArticle((data: TArticle[], error: unknown) => {
            if (error) console.log(error)
            data ? setPin(data) : setPin([])
        })
    }, [])

    return (
        <Stack
            w='100%'
            h='100%'
            position='relative'
            align='center'
            justify='center'
        >
            <Stack
                as={Swiper}
                w='100%'
                h='100%'
                pb='2rem'
                align='center'
                justify='center'
                spaceBetween={30}
                slidesPerView='auto'
                centeredSlides={true}
                initialSlide={1}
            >
                {
                    pin.length > 0 ? pin.map((article, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: 'fit-content',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {({ isActive }) => (
                                <ArticleBannerCard article={article} isActive={isActive} />
                            )}
                        </SwiperSlide>
                    ))
                        :
                        state.filter((item: TArticle) => item.pin).map((article, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    width: 'fit-content',
                                    height: '837px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {({ isActive }) => (
                                    <ArticleBannerCard article={article} isActive={isActive} />
                                )}
                            </SwiperSlide>
                        ))
                }
            </Stack>
        </Stack>
    )
}