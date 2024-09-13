
import { SingleArticleProvider } from "../context/SingleArticleContext";
import { ArticleNamePage } from "./components/ArticleNamePage";


const getSingleArticle = async (articleName: string) => {
    
    const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1/articles/title/${articleName}`

    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()

}

export default async function ArticleNameMainPage({ params }: { params: { name: string } }) {
    
    const article = await getSingleArticle(params.name.replaceAll('_', ' '))

    return (
        <SingleArticleProvider>
            <ArticleNamePage article={article} />
        </SingleArticleProvider>
    )
}