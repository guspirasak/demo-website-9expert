'use client'

import { createContext, useContext, useState } from 'react'
import { TArticle } from '@/app/admin/interface/CreateArticleInterface'


export interface IArticleContext {
    state: TArticle[]
    setState: React.Dispatch<React.SetStateAction<TArticle[]>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const defaultValue: IArticleContext = {
    state: [],
    setState: () => { },
    page: 1,
    setPage: () => { },
}

const ArticleContext = createContext<IArticleContext>(defaultValue)

export const useArticle = (): IArticleContext => {
    const context = useContext(ArticleContext)
    return context
}

export const ArticleProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TArticle[]>([])

    const [page, setPage] = useState(1)

    return (
        <ArticleContext.Provider
            value={{
                state,
                setState,
                page,
                setPage
            }}
        >
            {children}
        </ArticleContext.Provider>
    )
}