'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { DownloadIcon } from "@chakra-ui/icons"
import { AspectRatio, Box, Button, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"


export const HomepageArticleCard = ({ article }: { article: TArticle }) => {

    const courseGroup = useSelector(getCourseGroup)

    const textColor = useColorModeValue('black', 'white')
    const bgColor = useColorModeValue('white', '#323232')

    const router = useRouter()

    return (
        <Stack
            as={Link}
            href={`/article/${article.articleTitle.replaceAll(' ', '_')}`}
            w='360px'
            h='380px'
            align='center'
            justify='center'
            bg={bgColor}
            borderRadius='20px'
            position='relative'
            boxShadow='4px 4px 0px rgba(28, 167, 236, 0.45)'
            color={textColor}
            _hover={{
                transform: 'scale(1.05)',
            }}
        >
            <AspectRatio
                ratio={557 / 287}
                w='100%'
            >
                <Image
                    alt={article.articleTitle}
                    w='100%'
                    h='200px'
                    src={article.articleImage || 'https://placehold.co/360x200'}
                    borderTopRadius='30px'
                    onClick={() => router.push(`/article/${article.articleTitle.replaceAll(' ', '_')}`)}
                />
            </AspectRatio>
            <Stack
                direction='row'
                w='100%'
                align='center'
                justify='space-between'
                px='1rem'
            >
                <Stack
                    direction='row'
                    h='32px'
                    align='center'
                    justify='center'
                >
                    {
                        article.courseGroup &&
                        <Button
                            as='h4'
                            variant='outline'
                            borderRadius='100px'
                            maxW='100px'
                            size='xs'
                            color={useColorModeValue('#0B345D', 'black')}
                            borderColor={useColorModeValue('#0B345D', 'white')}
                            bg='white'
                            _hover={{
                                bg: 'white'
                            }}
                        >
                            {
                                courseGroup.filter((c: TCourseGroup) => c._id === article.courseGroup)[0] ? courseGroup.filter((c: TCourseGroup) => c._id === article.courseGroup)[0].courseGroupName.slice(0, 14) : ''
                            }
                        </Button>
                    }
                    {
                        article.skills && article.skills?.length > 0 &&
                        <Button
                            as='h4'
                            variant='outline'
                            borderRadius='100px'
                            maxW='100px'
                            size='xs'
                            color={useColorModeValue('#0B345D', 'black')}
                            borderColor={useColorModeValue('#0B345D', 'white')}
                            bg='white'
                            _hover={{
                                bg: 'white'
                            }}
                        >
                            {article.skills![0].slice(0, 14)}
                        </Button>
                    }
                    {/* <Button
                        as='h4'
                        variant='outline'
                        borderRadius='100px'
                        maxW='100px'
                        size='xs'
                        color={useColorModeValue('#5F2DED', 'white')}
                        borderColor={useColorModeValue('#5F2DED', 'white')}
                    >
                        {article.technologyArea![0].slice(0, 14)}
                    </Button> */}
                </Stack>
                {
                    article.articlesFileDownload &&
                    <Button
                        as={Link}
                        href={article.articlesFileDownload}
                        leftIcon={<DownloadIcon />}
                        size='sm'
                        variant='ghost'
                        color={useColorModeValue('exBlue', 'white')}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}

                    >
                        {`มีไฟล์ดาวน์โหลด`}
                    </Button>
                }
            </Stack>
            <Stack
                w='100%'
                h='100%'
                p='1rem'
            >
                <Stack
                    id={article.articleTitle.replaceAll(' ', '_')}
                    direction='row'
                    align='center'
                >
                    <Box
                        bg='#1CA7EC'
                        w='3px'
                        h='30px'
                        borderRadius='20px'
                    >

                    </Box>
                    <Link
                        href={`/article/${article.articleTitle.replaceAll(' ', '_')}`}
                    >
                        <Heading as='h3' size='sm' noOfLines={3} >{article.articleTitle}</Heading>
                    </Link>
                </Stack>
                <Text noOfLines={2} position='relative' >
                    {`${article.articleTeaserAbbr}...`}
                    <Button
                        as={Link}
                        href={`/article/${article.articleTitle.replaceAll(' ', '_')}`}
                        variant='link'
                        position='absolute'
                        right='0'
                        bottom='0'
                        bg={bgColor}
                        pl='1rem'
                        color={useColorModeValue('exBlue', 'white')}
                    >
                        {`อ่านต่อ`}
                    </Button>
                </Text>
            </Stack>
        </Stack>
    )
}