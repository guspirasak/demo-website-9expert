'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { ArticleIcon } from "@/app/icons/HomeIcons"
import { AspectRatio, Heading, Image, Stack, Tag, TagLabel, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

export const SearchArticleCard = ({ article }: { article: TArticle }) => {
    const headerColor = useColorModeValue('#19B5FE', 'white')
    const textColor = useColorModeValue('#7D7D7D', 'white')

    return (
        <Link
            href={`/article/${article.articleTitle.replace(/ /g, '_')}`}
        >
            <Stack
                h={{ base: '100%', xl: '297px' }}
                align='center'
                justify='space-between'
                bg='transparent'
                direction={{ base: 'column', xl: 'row' }}
                spacing='20px'
            >
                <AspectRatio
                    ratio={360 / 297}
                    w='360px'
                    minW='360px'
                    h='297px'
                    borderRadius='20px'
                >
                    <Image
                        w='360px'
                        h='297px'
                        alt={`${article.articleTitle} image`}
                        borderRadius='20px'
                        src={article.articleImage}
                    />
                </AspectRatio>
                <Stack
                    w='100%'
                    h='100%'
                    p='25px'
                    align='start'
                    justify='center'
                    direction='column'
                >
                    <Stack
                        direction='row'
                        spacing='11px'
                    >
                        <ArticleIcon w='29px' h='29px' patternid={article.articleTitle?.replaceAll(' ', '_')} imageid={article.articleImage} />
                        <Tag
                            w='131px'
                            h='30px'
                            display='flex'
                            bg={useColorModeValue('#8DD4FF', 'white')}
                            borderRadius='20px'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <TagLabel
                                textAlign='center'
                                color={useColorModeValue('#3A86FF', '#2E2E2E')}
                                fontWeight='semibold'
                                fontSize='12px'
                            >
                                {article.skills![0]}
                            </TagLabel>
                        </Tag>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Heading
                            textColor={headerColor}
                            fontSize='1.75rem'
                            fontWeight='extrabold'
                            as='h3'
                        >
                            {article.articleTitle}
                        </Heading>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text
                            textColor={textColor}
                            fontSize='1rem'

                        >
                            {article.articleTeaserAbbr}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Link>
    )
}