export type TCreateArticle = {
    _id?: string
    articleId?: string,
    articleTitle: string, //
    articleTeaser: string, //
    articleTeaserAbbr: string, //
    articleType: string, //
    articleImage: string, //
    articleDetail: string, //
    articleDetailType: string,
    technologyArea: string, //
    courseGroup: string, //
    skills: Array<string>, //
    courseRelated: Array<string>, //
    keywords: Array<string>,
    articleVideoUrl?: string, //
    articleRelated: Array<string>, //
    note?: string, //
    status?: string //
    displayHomepage?: boolean
    articlesFileDownload?: string //
    createAt?: string
    isDeleted?: boolean
    pin?: boolean
}


export type TArticle = {
    _id?: string
    articleId?: string,
    articleTitle: string, 
    articleTeaser: string, 
    articleTeaserAbbr: string, 
    articleType: string, 
    articleImage: string 
    articleDetail: string, 
    technologyArea?: Array<string>, 
    skills?: Array<string>, 
    courseRelated?: Array<string>, 
    keywords?: Array<string>,
    articleVideoUrl?: string, 
    articleRelated?: Array<string>, 
    articleDetailType: string
    note?: string, 
    status?: string 
    displayHomepage?: boolean
    articlesFileDownload?: string 
    createAt?: string
    isDeleted?: boolean
    pin?: boolean
    courseGroup?: string
}