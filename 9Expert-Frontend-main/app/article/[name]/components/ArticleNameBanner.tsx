'use client'

import { UserViewIcon, ArticleClockIcon, ArticleEyeIcon, ArticleDownloadIcon } from "@/app/icons/ArticleIcon"
import { AspectRatio, Container, HStack, Heading, Image, Stack, Tag, Text } from "@chakra-ui/react"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { useSelector } from "react-redux"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import moment from "moment"
import { containerBreakpoints } from "@/config/theme"

export const ArticleNameBanner = () => {

    const { state } = useSingleArticle()

    return (
        <>
            <Stack
                w='100%'
                h='100%'
                align='center'
                justify='space-between'
                bgImage='/article_banner.png'
                bgPosition='center'
                bgRepeat='no-repeat'
                bgSize='cover'
            >
                <Stack
                    maxW={containerBreakpoints}
                    w='100%'
                    h='100%'
                    minH='637px'
                    align='center'
                    justify='space-between'
                    direction='row'
                    spacing='60px'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        maxW='600px'
                        spacing='20px'
                    >
                        <Heading
                            as='h1'
                            textColor='#0B345D'
                            fontSize='60px'
                            noOfLines={3}
                        >
                            {state.articleTitle}
                        </Heading>
                        <Stack
                            w='100%'
                            h='100%'
                            direction='row'
                            spacing='30px'
                            align='center'
                            justify='start'
                        >
                            <HStack
                                color='#747474'
                            >
                                <UserViewIcon w='18px' h='18px' color='#0B345D80' />
                                <Text
                                    fontSize='14px'
                                    color='#0B345D80'
                                    textStyle='bold'
                                >
                                    {`9Expert`}
                                </Text>
                            </HStack>
                            <HStack
                                color='#747474'
                            >
                                <ArticleClockIcon w='18px' h='18px' color='#0B345D80' />
                                <Text
                                    fontSize='14px'
                                    color='#0B345D80'
                                    textStyle='bold'
                                >
                                    {`${moment(state.createAt).format('MMM DD, YYYY')}`}
                                </Text>
                            </HStack>
                            {
                                state.articlesFileDownload &&
                                <HStack
                                    color='#747474'
                                >
                                    <ArticleDownloadIcon w='18px' h='18px' color='#0B345D80' />
                                    <Text
                                        fontSize='14px'
                                        color='#0B345D80'
                                        textStyle='bold'
                                    >
                                        {`มีไฟล์ดาวน์โหลด`}
                                    </Text>
                                </HStack>
                            }
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            align='start'
                            justify='center'
                            mt='15px'
                            mb='15px'
                        >
                            <Text
                                noOfLines={3}
                                textColor='#2E2E2E'
                            >
                                {state.articleTeaserAbbr}
                            </Text>
                        </Stack>
                    </Stack>
                    <AspectRatio
                        ratio={835 / 460}
                        w='835px'
                    >
                        <Image
                            alt={state.articleTitle}
                            borderRadius='20px'
                            src={state.articleImage}
                        />
                    </AspectRatio>
                </Stack>
            </Stack>
        </>
    )
}

export const ArticleNameBannerMobile = () => {

    const { state } = useSingleArticle()
    const technologyArea = useSelector(getTechnologyAreas)

    return (
        <Stack
            mt='34px'
            w='90%'
            h='100%'
            spacing='15px'
        >
            <AspectRatio
                ratio={347 / 187}
                w='100%'
            >
                <Image
                    alt={state.articleTitle}
                    borderRadius='20px'
                    src={state.articleImage}
                />
            </AspectRatio>
            <HStack
                spacing='5px'
                align='center'
                justify='start'
            >
                <Tag
                    px="12px"
                    py='7px'
                    bg='#30AF8C33'
                    color='#075F7D'
                    borderRadius='50px'
                >
                    <Text fontSize='8px' >{`บทความทั่วไป`}</Text>
                </Tag>
                {
                    state.technologyArea &&
                    <Tag
                        px="12px"
                        py='7px'
                        bg='#30AF8C33'
                        color='#075F7D'
                        borderRadius='50px'
                    >
                        <Text fontSize='8px' >{technologyArea.length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === state.technologyArea).length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === state.technologyArea)[0].technologyName}</Text>
                    </Tag>
                }
                {
                    state.skills &&
                    <Tag
                        px="12px"
                        py='7px'
                        bg='#30AF8C33'
                        color='#075F7D'
                        borderRadius='50px'
                    >
                        <Text fontSize='8px' >{state.skills}</Text>
                    </Tag>
                }
            </HStack>
            <Heading 
                noOfLines={3}
                as='h1'
            >
                {state.articleTitle}
            </Heading>
        </Stack>
    )
}