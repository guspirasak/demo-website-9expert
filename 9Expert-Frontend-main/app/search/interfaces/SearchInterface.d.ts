import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { TCourseCard } from "@/app/components/ContentCard/Card"
export type TSearchState = {
    courses: {
        items: TCourseCard[],
        count: number
    }
    articles: {
        items: TArticle[],
        count: number
    }
    type: string
}