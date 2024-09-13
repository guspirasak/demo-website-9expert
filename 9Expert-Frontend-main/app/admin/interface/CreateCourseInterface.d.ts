'use client'

import { TArticle } from "./CreateArticleInterface"

export interface ITypes {
    type: string
    enum: ["Online", "Offline"]
    default: "Offline"
}

export type TTechnologyArea = {
    _id?: string
    technologyName: string,
    technologyNameAbbr: string[],
    courseGroup: string[],
    icon: string
    order: number
}

export const TechnologyAreas: ITechnologyAreas = {
    type: "TechnologyAreas",
    enum: [
        "Data Platform",
        "Business Application",
        "Robotic Process Automation",
        "Microsoft 365 Apps and Service",
        "Developer Technologies",
        "Cloud Technology",
        "Google",
        "Security",
    ],
    default: "Data Platform",
}

export const Skills: ISkills = {
    type: "Skills",
    enum: [
        "Data",
        "Visualization",
        "Productivity",
        "Automation",
        "Business",
        "Design",
        "Dev",
        "Tech",
        "AI",
        "Security",
        "Management",
    ],
    default: "Data",
}

export type TReservation = {
    courseId: string
    classDetailId: string
    startDate: Date
    endDate: Date
}

export type TClassRoom = {
    _id?: string
    roomId: string
    roomName: string
    roomStatus: string
    roomCapacity: number
    roomNote: string
    reserved?: TReservation[]
}

export type TClassDetails = {
    _id?: string
    classId?: string
    courseId: string
    classType: 'Classroom' | 'Live' | ' Hybrid' | string
    classStartDate?: string | Date
    classEndDate?: string | Date
    classStartTime?: string
    classEndTime?: string
    classCapacity: number
    classLocation?: string[]
    classTeamsURL: string
    classStatus: string
    classNote: string
    classRoom?: string[]
}

export type TCreateCourse = {
    _id?: string
    courseId: string
    courseName: string
    courseNameAbbr?: string
    courseType: Types
    courseColor: string[]
    courseTeaser: string
    courseTeaserAbbr: string
    courseStatus: string
    courseImage: string,
    courseInstructor: string
    courseInstructorTitle: string
    courseInstructorProfile: string
    courseTarget: string[]
    technologyArea: string
    courseGroupName: string,
    courseGroupNameAbbr: string,
    technologyNameAbbr: string,
    price: number
    priceBefore: number
    elearningPrice: number
    hours: string
    days: string
    difficultLevel: string
    workshop: boolean
    certificate: boolean
    news: boolean
    promotion: boolean
    recommend: boolean
    showOnHomepage: boolean
    catalogURL: string
    skills: string[]
    rating: number
    courseUrl: string
    courseUrlAbbr: string
    onlineUrl: string
    courseRoadmapPrevious: string
    courseRoadmapNext: string
    note: string
    version: string
    courseVDO: string
    courseBenefit: Array<string>
    courseObjective: Array<string>
    courseRequirement: Array<string>
    courseTopic: {
        header: string
        description?: string[]
    }[]
    classDetails?: TClassDetails[]
    article?: TArticle[]
    relatedCourse?: string[]
}

export type TTimeAndStatus = {
    time?: boolean
    status?: boolean
}

export type TCourseGroup = {
    _id?: string
    courseGroupId: string
    courseGroupName: string
    courseGroupNameAbbr: string
    courseGroupIcon: string
    courseGroupTeaser: string
    courseGroupTeaserAbbr: string
    courseGroupRoadmap?: string
    courseGroupColor: string[],
    courseGroupBanner: string
    course?: string[]
    note?: string
    __v?: number | string
}

export type TCourseTable = {
    _id?: string
    courseId: string
    courseName: string
    days: string
    price: number
    priceBefore: number
    elearningPrice: number
    courseStatus: string
}

export type TCreateOfflineCourseValidateData = {
    isCourseId: boolean
    isCourseName: boolean
    isCourseType: boolean
    isCourseColor: boolean
    isCourseStatus: boolean
    isCourseImage: boolean
    isCourseTarget: boolean
    isTechnologyArea: boolean
    isCourseGroupName: boolean
    isCourseGroupNameAbbr: boolean
    isTechnologyNameAbbr: boolean
    isPrice: boolean
    isHours: boolean
    isDays: boolean
    isDifficultLevel: boolean
    isSkills: boolean
}