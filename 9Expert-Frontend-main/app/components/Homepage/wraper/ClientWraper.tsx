'use client'

import { HomepageOfflineCourse } from "../HomepageOfflineCourse"
import { HomepageOnlineCourse } from "../HomepageOnlineCourse"
import { TCourseCard } from "../../ContentCard/Card"


export const OnlineCourseRender = ({ courses }: { courses: TCourseCard[] }) => {
    return (
        <HomepageOnlineCourse courses={courses} />
    )
}

export const OfflineCourseRender = ({ courses }: { courses: TCourseCard[] }) => {

    return (
        <HomepageOfflineCourse courses={courses} />
    )
}

export const ClientRender = ({ courses }: { courses: TCourseCard[] }) => {

    return (
        <>
            <HomepageOfflineCourse
                courses={courses.filter((course) => course.courseType === 'Offline')}
            />
            <OnlineCourseRender
                courses={courses.filter((course) => course.courseType === 'Online')}
            />
        </>
    )
}


