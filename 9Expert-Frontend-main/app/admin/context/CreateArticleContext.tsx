'use client'

import { createContext, useContext, useState } from 'react'
import { TCreateArticle } from '../interface/CreateArticleInterface';

export interface ICreateArticleContext {
    state: TCreateArticle
    setState: React.Dispatch<React.SetStateAction<TCreateArticle>>;
}

const defaultValue: ICreateArticleContext = {
    state: {
        articleTitle: '',
        articleTeaser: '',
        articleTeaserAbbr: '',
        articleType: '',
        articleImage: '',
        articleDetail: '',
        articleDetailType: 'html',
        technologyArea: '',
        courseGroup: '',
        skills: [],
        courseRelated: [],
        keywords: [],
        articleVideoUrl: '',
        articleRelated: [],
        note: '',
        status: '',
        displayHomepage: false,
        articlesFileDownload: '',
        pin: false
    },
    setState: () => { }
}

const CreateArticleContext = createContext<ICreateArticleContext>(defaultValue)

export const useCreateArticle = (): ICreateArticleContext => {
    const context = useContext(CreateArticleContext)
    return context
}

export const CreateArticleProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCreateArticle>({
        articleTitle: '',
        articleTeaser: '',
        articleTeaserAbbr: '',
        articleType: '',
        articleImage: '',
        articleDetail: '',
        articleDetailType: 'html',
        technologyArea: '',
        courseGroup: '',
        skills: [],
        courseRelated: [],
        keywords: [],
        articleVideoUrl: '',
        articleRelated: [],
        note: '',
        status: '',
        displayHomepage: false,
        articlesFileDownload: '',
        pin: false
    })

    return (
        <CreateArticleContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </CreateArticleContext.Provider>
    )
}