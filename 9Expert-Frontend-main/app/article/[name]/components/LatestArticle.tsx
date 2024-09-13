'use client'

import { Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { MiniArticleCard } from "../../components/ArticleCard"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { useEffect, useState } from "react"
import { getThreeLatestArticle } from "@/libs/AdminAPI"

export const LatestArticle = () => {

    const [latestArticle, setLatestArticle] = useState<TArticle[]>([])

    const borderColor = useColorModeValue('#F2F5FA', 'black')

    useEffect(() => {
        getThreeLatestArticle((data: TArticle[], error: string) => {
            if (error) console.log(error)
            setLatestArticle(data)
        })
    }, [])

    return (
        <Stack
            align='start'
            w='100%'
            h='100%'
            position='relative'
            spacing='30px'
        >
            <Stack
                w='100%'
                h='100%'
                px='45px'
                py='40px'
                justify='center'
                border='1px'
                borderRadius='10px'
                borderColor={borderColor}
                shadow='md'
                spacing='21px'
            >
                <Heading
                    fontSize='24px'
                >
                    {`บทความล่าสุด`}
                </Heading>
                <Stack
                    w='100%'
                    h='100%'
                    spacing='36px'
                >
                    {
                        latestArticle && latestArticle.map((article, index) => (
                            <MiniArticleCard
                                key={index}
                                article={article}
                            />
                        ))
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}