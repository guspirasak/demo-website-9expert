'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface";
import { getArticles } from "@/services/api/article";
import { useState, useEffect } from "react";
import { HomepageArticle } from "../HomepageArticle";
import { HomepageVideoArticle } from "../HomepageVideoArticle";

export const HomepageArticleWraper = () => {

    const [articles, setArticles] = useState<TArticle[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            const data = await getArticles();
            setLoading(false)
            setArticles(data)
        }
        fetchData();
    }, []);

    return (
        <>
            {
                loading
                    ? <></>
                    : <>
                        <HomepageArticle articles={articles.filter(article => article.articleType === 'Article')} />
                        <HomepageVideoArticle articles={articles.filter(article => article.articleType === 'Video')} />
                    </>
            }
        </>
    )
}