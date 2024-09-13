'use client'

import { HStack, Stack, useBreakpointValue } from "@chakra-ui/react"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { ArticleTag } from "../../components/ArticleCard"
import parse from 'html-react-parser'
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { useSelector } from "react-redux"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import MarkdownPreview from '@uiw/react-markdown-preview';

import React from "react";

export default function CodeCopyBtn({ children }: { children: any }) {
    const [copyOk, setCopyOk] = React.useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? 'fa-check-square' : 'fa-copy';

    const handleClick = () => {
        navigator.clipboard.writeText(children?.toString() as string);
        
        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <div className="code-copy-btn">
            <i className={`fas ${icon}`} onClick={handleClick} style={{ color: iconColor }} />
        </div>
    )
}

export const ArticleContent = () => {

    const { state } = useSingleArticle()
    const technologyArea = useSelector(getTechnologyAreas)

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    // Add the CodeCopyBtn component to our PRE element
    const Pre = ({ children }: { children: any }) => (
        <pre className="blog-pre">
            <CodeCopyBtn>{children}</CodeCopyBtn>
            {children}
        </pre>
    )
    

    return (
        <Stack
            w='100%'
            h='100%'
            align='start'
            justify='center'
        >
            {
                breakpoint &&
                <HStack
                    w='100%'
                    spacing='15px'
                >
                    <ArticleTag>
                        {`ทั่วไป`}
                    </ArticleTag>
                    {
                        state.technologyArea &&
                        <ArticleTag>
                            {technologyArea.length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === state.technologyArea).length > 0 && technologyArea.filter((item: TTechnologyArea) => item._id === state.technologyArea)[0].technologyName}
                        </ArticleTag>
                    }
                    {
                        state.skills &&
                        <ArticleTag>
                            {state.skills}
                        </ArticleTag>
                    }
                </HStack>
            }
            <Stack
                w='100%'
                h='100%'
                mt='68px'
                align='start'
                justify='center'
                overflowX='hidden'
            >
                {
                    state.articleDetailType === 'html' && (
                        parse(state.articleDetail)
                    )
                }
                {
                    state.articleDetailType === 'md' && (
                        <MarkdownPreview
                            source={state.articleDetail}
                        />
                    )
                }
            </Stack>
        </Stack>
    )
}