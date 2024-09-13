export type TQuestion = {
    title: string
    description: string[]
}

export type TFaq = {
    _id?: string
    title: string
    icon: string
    question: TQuestion[]
    isActive?: boolean
    isDeleted?: boolean
    createAt?: string
}