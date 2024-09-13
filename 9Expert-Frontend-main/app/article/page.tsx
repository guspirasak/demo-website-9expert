
import { getArticles } from "@/services/api/article"
import { TArticle } from "../admin/interface/CreateArticleInterface"
import { ArticlePage } from "./components/ArticlePage"
import { ArticleProvider } from "./context/ArticleContext"

export default async function Article() {
    const articles: TArticle[] = await getArticles()
    return (
        <ArticleProvider>
            <ArticlePage article={articles} />
        </ArticleProvider>
    )
}