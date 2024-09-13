'use client'

import { createContext, useContext, useState } from 'react'
import { TCourseCard } from '@/app/components/ContentCard/Card'
import { TCourseGroup } from '@/app/admin/interface/CreateCourseInterface'

export type TGroupContextState = {
    courseGroup: TCourseGroup,
    course: TCourseCard[]
}

export interface IGroupContext {
    state: TGroupContextState
    setState: React.Dispatch<React.SetStateAction<TGroupContextState>>
}

const defaultValue: IGroupContext = {
    state: {
        courseGroup: {
            _id: undefined,
            courseGroupId: "",
            courseGroupName: "",
            courseGroupNameAbbr: "",
            courseGroupIcon: "",
            courseGroupTeaser: "",
            courseGroupTeaserAbbr: "",
            courseGroupRoadmap: undefined,
            courseGroupColor: [],
            courseGroupBanner: "",
            course: [],
            note: "",
            __v: undefined,
        },
        course: [],
    },
    setState: () => { },
}

const GroupContext = createContext<IGroupContext>(defaultValue)

export const useGroup = (): IGroupContext => {
    const context = useContext(GroupContext)
    return context
}

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TGroupContextState>({
        courseGroup: {
            _id: undefined,
            courseGroupId: "",
            courseGroupName: "",
            courseGroupNameAbbr: "",
            courseGroupIcon: "",
            courseGroupTeaser: "",
            courseGroupTeaserAbbr: "",
            courseGroupRoadmap: undefined,
            courseGroupColor: [],
            courseGroupBanner: "",
            course: [],
            note: "",
            __v: undefined,
        },
        course: [],
    })

    return (
        <GroupContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </GroupContext.Provider>
    )
}