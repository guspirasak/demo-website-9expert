export type TCreateTechnologyArea = {
    _id?: string,
    technologyName: string,
    technologyNameAbbr: Array<string>,
    courseGroup: Array<string>,
    icon: string
    note?: string
    isActive?: boolean
    isDeleted?: boolean
    order?: number
}

export type TCreateCourseGroup = {
    _id?: string
    courseGroupId: string
    courseGroupName: string
    courseGroupNameAbbr: string
    courseGroupBanner: string
    courseGroupIcon: string
    courseGroupTeaser: string
    courseGroupTeaserAbbr: string
    courseGroupColor: Array<string>
    course: Array<string>
    note?: string
    isActive?: boolean
    isDeleted?: boolean
}