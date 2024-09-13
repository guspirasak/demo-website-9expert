import { LegacyRef, ReactNode } from "react"

export interface IAdminPageProps {
    searchParams: {
        tab: string
    } 
}

export type TAdminInput = {
    children: ReactNode
    placeholder?: string
    onBlur?: () => void
    onFocus?: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
    value?: string
    maxLength?: number
    isInvalid?: boolean
    isRequired?: boolean
    type?: string
    onWheel?: (e: UIEventHandler<HTMLInputElement>) => void
}

export type TAdminInputUrl = {
    children: ReactNode
    placeholder?: string
    prefix?: string
    subfix?: string
    onBlur?: () => void
    onFocus?: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
    value?: string
    maxLength?: number
    isInvalid?: boolean
    isRequired?: boolean
}

export type TAdminTextArea = {
    children: ReactNode
    placeholder?: string
    onBlur?: () => void
    onFocus?: () => void
    defaultValue?: string
    value?: string
}

export type TAdminCourseInfomation = {
    children: ReactNode
    placeholder?: string
    data: Array<string>
    objKey: string
}

export type TCourseInputRef = 
    | LegacyRef<HTMLInputElement> 
    | MutableRefObject<LegacyRef<HTMLInputElement>> 

export type TArticleInputRef = 
    | LegacyRef<HTMLInputElement> 
    | MutableRefObject<LegacyRef<HTMLInputElement>> 

export type TCourseTextAreaRef =
    | LegacyRef<HTMLTextAreaElement>
    | MutableRefObject<LegacyRef<HTMLTextAreaElement>> 


export type TUserRegister = {
    public: number
    inhouse: number
    total: number
    course: number
}

export type TAdminLogin = {
    token: string
    user: string
    role: string
    isFirstLogin: boolean
}