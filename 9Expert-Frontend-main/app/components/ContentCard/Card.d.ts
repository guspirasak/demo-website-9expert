import { TClassDetails, Skills, TechnologyAreas } from "@/app/admin/interface/CreateCourseInterface"

export interface ICardStatus {
    status?: string
    color: string
    border?: boolean
}

export interface IMiniCalendar extends ICardStatus {
    id?: string
    date: {
        startDate: string
        endDate: string
    }
    onClick?: MouseEventHandler<HTMLDivElement>
    course: TCourseCard
    classDetail: TClassDetails
    isActive?: boolean
}

export type TCourseCard = {
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
    technologyArea: TechnologyAreas
    courseGroupName: string
    courseGroupNameAbbr: string
    price: number
    priceBefore: number
    elearningPrice: number
    hours: string
    days: string,
    difficultLevel: string
    workshop: boolean
    certificate: boolean
    news: boolean
    promotion: boolean
    recommend: boolean
    catalogURL: string
    skills: Skills[]
    rating: number
    courseUrl?: string
    onlineUrl?: string
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
    classDetails: TClassDetails[]
    relatedCourse: TCourseCard[]
    isDeleted?: boolean
    article?: string[]
}

export type TCertificateCard = {
    _id?: string
    courseId: string
    courseName: string
    courseNameAbbr?: string
    courseColor: string[]
    courseTeaser: string
    courseTeaserAbbr: string
    technologyArea: string
    courseGroupName: string
    courseGroupNameAbbr: string
    difficultLevel: string
    workshop: boolean
    certificate: boolean
    skills: string[]
}