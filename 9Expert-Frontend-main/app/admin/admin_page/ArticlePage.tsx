'use client'

import { useSearchParams } from "next/navigation"
import { ArticlaMainPage } from "../components/article/ArticleMainPage"
import { CreateArticlePage } from "../components/article/CreateArticlePage"
import { CreateArticleProvider } from "../context/CreateArticleContext"



export const AdminArticlePage = () => {

    const action = useSearchParams().get('action')

    const renderPage = () => {
        if (action === 'create') {
            return (
                <CreateArticleProvider>
                    <CreateArticlePage />
                </CreateArticleProvider>
            )
        } else if (action === 'edit') {
            return (
                <CreateArticleProvider>
                    <CreateArticlePage />
                </CreateArticleProvider>
            )
        } else {
            return <ArticlaMainPage />
        }
    }


    return (
        <>
            {renderPage()}
        </>
    )
}