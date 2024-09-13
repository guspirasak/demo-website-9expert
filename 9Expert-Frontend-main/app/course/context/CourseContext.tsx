'use client'

import { createContext, useContext, useState } from 'react'
import { TCourseCard } from '@/app/components/ContentCard/Card'
import { TCourseGroup } from '@/app/admin/interface/CreateCourseInterface'

export type TCourseContextState = {
    courseGroup: TCourseGroup,
    course: TCourseCard[]
}

export interface ICourseContext {
    state: TCourseContextState[]
    setState: React.Dispatch<React.SetStateAction<TCourseContextState[]>>
    cache: TCourseContextState[]
    setCache: React.Dispatch<React.SetStateAction<TCourseContextState[]>>
}

const defaultValue: ICourseContext = {
    state: [],
    setState: () => { },
    cache: [],
    setCache: () => { },
}

const CourseContext = createContext<ICourseContext>(defaultValue)

export const useCourse = (): ICourseContext => {
    const context = useContext(CourseContext)
    return context
}

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCourseContextState[]>([])
    const [cache, setCache] = useState<TCourseContextState[]>([])

    return (
        <CourseContext.Provider
            value={{
                state,
                setState,
                cache,
                setCache
            }}
        >
            {children}
        </CourseContext.Provider>
    )
}