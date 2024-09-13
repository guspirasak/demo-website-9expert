'use client'

import { createContext, useContext, useState } from 'react'
import { TCreateCourse } from '../interface/CreateCourseInterface';

export interface ICreateCourseContext {
    state: TCreateCourse
    setState: React.Dispatch<React.SetStateAction<TCreateCourse>>;
}

const defaultValue: ICreateCourseContext = {
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
        technologyNameAbbr: '',
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
        showOnHomepage: false,
        catalogURL: "", //
        courseUrl: "", //
        courseUrlAbbr: '',
        onlineUrl: "",
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
        relatedCourse: [],
    },
    setState: () => {}
}

const CreateCourseContext = createContext<ICreateCourseContext>(defaultValue)

export const useCreateCourse = (): ICreateCourseContext => {
    const context = useContext(CreateCourseContext)
    return context
}

export const CreateCourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCreateCourse>({
        courseId: "",
        courseName: "",
        courseNameAbbr: "", 
        courseType: "",
        courseColor: [],
        courseTeaser: "",
        courseTeaserAbbr: "",
        courseStatus: "Draft",
        courseImage: '',
        courseInstructor: '',
        courseInstructorTitle: '',
        courseInstructorProfile: '',
        courseTarget: [],
        technologyArea: "",
        technologyNameAbbr: '',
        courseGroupName: "",
        courseGroupNameAbbr: "",
        price: 0,
        priceBefore: 0,
        elearningPrice: 0,
        hours: '',
        days: '',
        difficultLevel: "",
        workshop: false,
        certificate: false,
        news: false,
        promotion: false, 
        recommend: false,
        showOnHomepage: false,
        catalogURL: "",
        courseUrl: "",
        courseUrlAbbr: '',
        onlineUrl: "",
        skills: [],
        rating: 0,
        courseRoadmapPrevious: "",
        courseRoadmapNext: "",
        note: "",
        version: '',
        courseVDO: '',
        courseBenefit: [],
        courseObjective: [],
        courseRequirement: [],
        courseTopic: [],
        classDetails: [
            {
                courseId: '',
                classType: 'Classroom',
                classStartDate: '',
                classEndDate: '',
                classLocation: [],
                classTeamsURL: '',
                classStatus: '',
                classNote: '',
                classRoom: [],
                classCapacity: 0
            }
        ],
        article: [],
        relatedCourse: [],
    })

    return (
        <CreateCourseContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </CreateCourseContext.Provider>
    )
}