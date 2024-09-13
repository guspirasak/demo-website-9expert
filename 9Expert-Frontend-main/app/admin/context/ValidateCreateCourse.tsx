'use client'

import { createContext, useContext, useState } from 'react'
import { TCreateOfflineCourseValidateData } from '../interface/CreateCourseInterface';

export interface ICreateCourseValidateContext { 
    validate: TCreateOfflineCourseValidateData
    setValidate: React.Dispatch<React.SetStateAction<TCreateOfflineCourseValidateData>>;
}

const defaultValue: ICreateCourseValidateContext = {
    validate: {
        isCourseId: false,
        isCourseName: false,
        isCourseType: false,
        isCourseColor: false,
        isCourseStatus: false,
        isCourseImage: false,
        // courseInstructorProfile: '',
        isCourseTarget: false,
        isTechnologyArea: false,
        isTechnologyNameAbbr: false,
        isCourseGroupName: false,
        isCourseGroupNameAbbr: false,
        isPrice: false,
        isHours: false,
        isDays: false,
        isDifficultLevel: false,
        isSkills: false,
    },
    setValidate: () => { }
}

const ValidateCreateCourseContext = createContext<ICreateCourseValidateContext>(defaultValue)

export const useValidateCreateCourse = (): ICreateCourseValidateContext => {
    const context = useContext(ValidateCreateCourseContext)
    return context
}

export const ValidateCreateCourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [validate, setValidate] = useState<TCreateOfflineCourseValidateData>({
        isCourseId: false,
        isCourseName: false,
        isCourseType: false,
        isCourseColor: false,
        isCourseStatus: false,
        isCourseImage: false,
        // courseInstructorProfile: '',
        isCourseTarget: false,
        isTechnologyArea: false,
        isTechnologyNameAbbr: false,
        isCourseGroupName: false,
        isCourseGroupNameAbbr: false,
        isPrice: false,
        isHours: false,
        isDays: false,
        isDifficultLevel: false,
        isSkills: false,
    })

    return (
        <ValidateCreateCourseContext.Provider
            value={{
                validate,
                setValidate,
            }}
        >
            {children}
        </ValidateCreateCourseContext.Provider>
    )
}