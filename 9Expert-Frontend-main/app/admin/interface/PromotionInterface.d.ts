export type TPromotion = {
    _id?: string
    name: string
    code: string
    type: string
    value: number
    usage: number
    maxUsage: string
    minPrice: number
    status: string
    startAt?: string
    expireAt?: string
    isDeleted?: boolean
    createAt?: string
}