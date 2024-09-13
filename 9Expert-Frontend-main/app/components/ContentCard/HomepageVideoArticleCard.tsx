'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { PlayIcon } from "@/app/icons/HomeIcons"
import { AspectRatio, Box, Button, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export const HomepageVideoArticleCard = ({ article }: { article: TArticle }) => {

    const textColor = useColorModeValue('black', 'white')
    const bgColor = useColorModeValue('white', '#282828')
    const iconBgColor = useColorModeValue('exBlue', 'white')
    const iconColor = useColorModeValue('white', '#282828')

    const router = useRouter()

    return (
        <Stack
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
            <Stack
                w='100%'
                h='200px'
                position='relative'
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
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    position='absolute'
                    right='1rem'
                    bottom='-37px'
                    w='75px'
                    h='75px'
                    bg={iconBgColor}
                    borderRadius='full'
                    border='2px'
                    borderColor={iconColor}
                >
                    <PlayIcon w='75px' h='75px' color={iconColor} />
                </Box>
            </Stack>
            <Stack
                direction='row'
                w='100%'
                align='center'
                justify='space-between'
                px='1rem'
                py='0.25rem'
            >
                <Stack
                    direction='row'
                    h='32px'
                    align='center'
                    justify='center'
                >
                    {
                        Array.isArray(article.keywords) && article.keywords.length > 0 &&
                        <Button
                            as='h4'
                            variant='outline'
                            borderRadius='100px'
                            maxW='100px'
                            size='xs'
                            color={useColorModeValue('#0B345D', 'white')}
                            borderColor={useColorModeValue('#0B345D', 'white')}
                        >
                            {article.keywords![0].slice(0, 14)}
                        </Button>
                    }
                    {
                        Array.isArray(article.skills) && article.skills.length > 0 &&
                        <Button
                            as='h4'
                            variant='outline'
                            borderRadius='100px'
                            maxW='100px'
                            size='xs'
                            color={useColorModeValue('#5F2DED', 'white')}
                            borderColor={useColorModeValue('#5F2DED', 'white')}
                        >
                            {article.skills![0].slice(0, 14)}
                        </Button>
                    }
                    {
                        // Array.isArray(article.technologyArea) && article.technologyArea.length > 0 &&
                        // <Button
                        //     as='h4'
                        //     variant='outline'
                        //     borderRadius='100px'
                        //     maxW='100px'
                        //     size='xs'
                        //     color={useColorModeValue('#5F2DED', 'white')}
                        //     borderColor={useColorModeValue('#5F2DED', 'white')}
                        // >
                        //     {article.technologyArea![0].slice(0, 14)}
                        // </Button>
                    }
                </Stack>
            </Stack>
            <Stack
                w='100%'
                h='100%'
                p='1rem'
                pt='0'
            >
                <Stack
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
                        <Heading as='h3' size='sm' noOfLines={2}>{article.articleTitle}</Heading>
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