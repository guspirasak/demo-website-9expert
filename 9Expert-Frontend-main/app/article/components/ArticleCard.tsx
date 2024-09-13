'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { ArticleClockIcon, ArticleDownloadIcon, ArticleEyeIcon, UserViewIcon } from "@/app/icons/ArticleIcon"
import { PlayIcon } from "@/app/icons/HomeIcons"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { AspectRatio, Box, Button, Center, HStack, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import Link from "next/link"
import { useSelector } from "react-redux"

export const ArticleTag = ({ children }: { children: React.ReactNode }) => {
    const fontColor = useColorModeValue('#1CA7EC', '#EBEBEB')

    return (
        <Center
            w='fit-content'
            h='100%'
            border='1px'
            px='0.5rem'
            borderColor='#1CA7EC'
            borderRadius='25px'
            color={fontColor}
            overflow='hidden'
            noOfLines={1}
            maxW='25rem'
        >
            <Text w='100%' fontSize={{ base: '0.75rem', lg: '1rem' }} >{children}</Text>
        </Center>
    )
}


export const ArticleCard = ({ article }: { article: TArticle }) => {
    const technologyArea: TTechnologyArea[] = useSelector(getTechnologyAreas)
    const tagColor = useColorModeValue('#817F7F', '#EBEBEB')
    const titleColor = useColorModeValue('#3B3B3B', '#EBEBEB')
    const contentColor = useColorModeValue('#817F7F', '#EBEBEB')
    const cardBg = useColorModeValue('#FFFFFF', '#FFFFFF11')
    const iconBgColor = useColorModeValue('exBlue', 'white')
    const iconColor = useColorModeValue('white', '#282828')

    return (
        <Stack
            as={Link}
            href={`/article/${article.articleTitle.replace(/ /g, '_')}`}
            _hover={{ textDecoration: 'none' }}
            w='100%'
            h='100%'
        >
            <Stack
                as="article"
                align='center'
                w='100%'
                position='relative'
                spacing={{ base: '1rem', lg: '1.5rem' }}
                borderRadius='20px'
                bgColor={cardBg}
                shadow='lg'
                p={{ base: '1rem', lg: '2rem' }}
            >
                <AspectRatio
                    ratio={724 / 396}
                    w='100%'
                >
                    <Image
                        alt={`${article.articleTitle} cover`}
                        src={article.articleImage || "/card/article.png"}
                        borderRadius='20px'
                    />
                </AspectRatio>
                {
                    article?.articleType.toLowerCase() === 'video' &&
                    <Stack
                        w='100%'
                        h='100%'
                        minH={{ base: '30px', md: '50px', '2xl': '75px' }}
                        position='relative'
                        mt={{ base: '-40px', md: '-70px', '2xl': '-90px' }}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            position='absolute'
                            w={{ base: '40px', md: '90px', '2xl': '126px' }}
                            h={{ base: '40px', md: '90px', '2xl': '126px' }}
                            right='20px'
                            bg={iconBgColor}
                            borderRadius='full'
                            border='2px'
                            borderColor={iconColor}
                        >
                            <PlayIcon
                                w={{ base: '40px', md: '90px', '2xl': '126px' }}
                                h={{ base: '40px', md: '90px', '2xl': '126px' }}
                                color={iconColor}
                            />
                        </Box>
                    </Stack>
                }
                <Stack
                    w='100%'
                    h='100%'
                    direction='row'
                    spacing='1rem'
                >
                    {/* <ArticleTag>
                    ทั่วไป
                </ArticleTag> */}
                    {
                        article.technologyArea &&
                        <ArticleTag>
                            {technologyArea.length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === article.technologyArea).length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === article.technologyArea)[0].technologyName}
                        </ArticleTag>
                    }
                    {
                        article.skills &&
                        <ArticleTag>
                            {article.skills}
                        </ArticleTag>
                    }
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    direction='row'
                    spacing='1rem'
                    flexWrap='wrap'
                >
                    <HStack
                        color={tagColor}
                    >
                        <UserViewIcon w='20px' h='20px' color={tagColor} />
                        <Text
                            fontSize={{ base: '0.75rem', lg: '1rem' }}
                        >
                            {`9Expert`}
                        </Text>
                    </HStack>
                    <HStack
                        color={tagColor}
                    >
                        <ArticleClockIcon w='20px' h='20px' color={tagColor} />
                        <Text
                            fontSize={{ base: '0.75rem', lg: '1rem' }}
                        >
                            Apr 30, 2024
                        </Text>
                    </HStack>
                    {
                        article.articlesFileDownload &&
                        <HStack
                            color={tagColor}
                        >
                            <ArticleDownloadIcon w='20px' h='20px' color={tagColor} />
                            <Text
                                fontSize={{ base: '0.75rem', lg: '1rem' }}
                            >
                                มีไฟล์ดาวน์โหลด
                            </Text>
                        </HStack>
                    }
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                    spacing='1rem'
                >
                    <Heading
                        as='h3'
                        color={titleColor}
                        fontSize={{ base: '1.25rem', lg: '1.5rem' }}
                        noOfLines={2}
                    >
                        {article.articleTitle}
                    </Heading>
                    <Text
                        color={contentColor}
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                        noOfLines={3}
                    >
                        {
                            article.articleTeaserAbbr
                        }
                    </Text>
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Button
                        as={Link}
                        href={`/article/${article.articleTitle.replace(/ /g, '_')}`}
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                        bg='#1CA8ED'
                        w={{ base: '100%', lg: '184px' }}
                        h={{ base: '45px', lg: '62px' }}
                        color='white'
                        borderRadius='full'
                        _hover={{
                            bg: '#2CA2FB',
                        }}
                        _active={{
                            bg: '#2CA2FB',
                        }}
                    >
                        อ่านเพิ่มเติม
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export const MiniArticleCard = ({ article }: { article: TArticle }) => {
    const titleColor = useColorModeValue('#3B3B3B', '#EBEBEB')
    return (
        <Link
            href={`/article/${article.articleTitle.replace(/ /g, '_')}`}
        >
            <Stack
                w='100%'
                h='65px'
                direction='row'
                justify='space-between'
                spacing={{ base: '1rem', lg: '2rem' }}
            >
                <AspectRatio
                    ratio={129 / 65}
                    w='129px'
                    h='65px'
                    minW='129px'
                    minH='65px'
                >
                    <Image
                        alt={article.articleTitle}
                        w='129px'
                        borderRadius='10px'
                        src={article.articleImage}
                    />
                </AspectRatio>
                <Stack
                    w='100%'
                    h='100%'
                    textColor={titleColor}
                >
                    <Text fontSize='0.7rem' >{moment(article.createAt).format('DD MMM YYYY')}</Text>
                    <Heading fontSize='1rem' noOfLines={2}>{article.articleTitle}</Heading>
                </Stack>
            </Stack>
        </Link>
    )
}