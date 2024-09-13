
import { TArticle } from '@/app/admin/interface/CreateArticleInterface'
import { get } from './api'

export const getArticles = (): Promise<TArticle[]> => get(`/articles/pinned`, fetch)