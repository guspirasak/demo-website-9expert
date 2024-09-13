'use client'

import { createContext, useContext, useState } from 'react'
import { TCourseCard } from '@/app/components/ContentCard/Card'

export interface ISingleCourseContext {
    state: TCourseCard
    setState: React.Dispatch<React.SetStateAction<TCourseCard>>;
}

const defaultValue: ISingleCourseContext = {
    state: {
        courseId: "", //
        courseName: "", //
        courseNameAbbr: "", //
        courseType: "", //
        courseColor: [], // Array
        courseTeaser: "", //
        courseTeaserAbbr: "", //
        courseStatus: "Draft", //
        courseImage: '', //
        courseInstructor: '', //
        courseInstructorTitle: '', //
        courseInstructorProfile: '',
        courseTarget: [], //
        technologyArea: "", //
        courseGroupName: "", //
        courseGroupNameAbbr: "", //
        price: 0, //
        priceBefore: 0, //
        elearningPrice: 0, //
        hours: '', //ระยะเวลาการอบรม ชั่วโมง
        days: '',
        difficultLevel: "", //
        workshop: false, //
        certificate: false, //
        news: false, //
        promotion: false, //
        recommend: false, //
        catalogURL: "", //
        courseUrl: "", //
        skills: [], //
        rating: 0,
        courseRoadmapPrevious: "",
        courseRoadmapNext: "",
        note: "",
        version: '',
        courseVDO: '', //
        courseBenefit: [],
        courseObjective: [],
        courseRequirement: [],
        courseTopic: [],
        classDetails: [],
        relatedCourse: []
    },
    setState: () => { }
}

const SingleCourseContext = createContext<ISingleCourseContext>(defaultValue)

export const useSingleCourse = (): ISingleCourseContext => {
    const context = useContext(SingleCourseContext)
    return context
}

export const SingleCourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCourseCard>({
        courseId: "", //
        courseName: "", //
        courseNameAbbr: "", //
        courseType: "", //
        courseColor: [], // Array
        courseTeaser: "", //
        courseTeaserAbbr: "", //
        courseStatus: "Draft", //
        courseImage: '', //
        courseInstructor: '', //
        courseInstructorTitle: '', //
        courseInstructorProfile: '',
        courseTarget: [], //
        technologyArea: "", //
        courseGroupName: "", //
        courseGroupNameAbbr: "", //
        price: 0, //
        priceBefore: 0, //
        elearningPrice: 0, //
        hours: '', //ระยะเวลาการอบรม ชั่วโมง
        days: '',
        difficultLevel: "", //
        workshop: false, //
        certificate: false, //
        news: false, //
        promotion: false, //
        recommend: false, //
        catalogURL: "", //
        courseUrl: "", //
        skills: [], //
        rating: 0,
        courseRoadmapPrevious: "",
        courseRoadmapNext: "",
        note: "",
        version: '',
        courseVDO: '', //
        courseBenefit: [],
        courseObjective: [],
        courseRequirement: [],
        courseTopic: [],
        classDetails: [],
        relatedCourse: []
    })

    return (
        <SingleCourseContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </SingleCourseContext.Provider>
    )
}