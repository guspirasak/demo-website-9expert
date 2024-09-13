export type TReview = {
    _id?: string
    name: string
    rating: number
    description: string
    image: string
    createAt?: string
    isDeleted?: boolean
}

export type TCreateReview = {
    file: {
        name: string
        size: number
    }
} & TReview