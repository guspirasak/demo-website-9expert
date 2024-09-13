import { TCourseCard } from "@/app/components/ContentCard/Card"

export type TBundle = {
    _id?: string
    name: string
    teaser?: string
    sellPrice: number
    totalPrice: number
    course: TBundleCourse[]
    image: string
    createAt?: string
    isActive?: boolean
    isDeleted?: boolean
}

export type TBundleCourse = {
    _id?: string
    courseId: string
    courseName: string
    courseImage: string
    courseType: string
    price: number | string
    elearningPrice: number
    courseStatus: string
    days: string
}

export type TBundleCard = {
    _id?: string
    name: string
    teaser?: string
    sellPrice: number
    totalPrice: number
    course: TCourseCard[]
    image: string
    createAt?: string
    isActive?: boolean
    isDeleted?: boolean
}