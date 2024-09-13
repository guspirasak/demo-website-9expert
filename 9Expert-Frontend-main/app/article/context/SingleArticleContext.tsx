'use client'

import { createContext, useContext, useState } from 'react'
import { TArticle } from '@/app/admin/interface/CreateArticleInterface'


export interface ISingleArticleContext {
    state: TArticle
    setState: React.Dispatch<React.SetStateAction<TArticle>>
}

const defaultValue: ISingleArticleContext = {
    state: {
        _id: '',
        articleTitle: '',
        articleTeaser: '',
        articleTeaserAbbr: '',
        articleType: '',
        articleImage: '',
        articleDetail: '',
        technologyArea: [],
        skills: [],
        courseRelated: [],
        keywords: [],
        articleVideoUrl: '',
        articleRelated: [],
        note: '',
        status: '',
        displayHomepage: false,
        articlesFileDownload: '',
        articleDetailType: 'html'
    },
    setState: () => { },
}

const SingleArticleContext = createContext<ISingleArticleContext>(defaultValue)

export const useSingleArticle = (): ISingleArticleContext => {
    const context = useContext(SingleArticleContext)
    return context
}

export const SingleArticleProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TArticle>({
        _id: '',
        articleTitle: '',
        articleTeaser: '',
        articleTeaserAbbr: '',
        articleType: '',
        articleImage: '',
        articleDetail: '',
        technologyArea: [],
        skills: [],
        courseRelated: [],
        keywords: [],
        articleVideoUrl: '',
        articleRelated: [],
        note: '',
        status: '',
        displayHomepage: false,
        articlesFileDownload: '',
        articleDetailType: 'html'
    })

    return (
        <SingleArticleContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </SingleArticleContext.Provider>
    )
}