import { TCourseCard } from "@/app/components/ContentCard/Card"

export type TELTab = {
    children: React.ReactNode
    leftIcon?: JSX.Element
    target?: LegacyRef<HTMLDivElement> | MutableRefObject<LegacyRef<HTMLDivElement>>
    image?: string
}

export type TUserBundle = {
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