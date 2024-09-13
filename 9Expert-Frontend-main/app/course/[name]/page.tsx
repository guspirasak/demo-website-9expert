import { TCourseCard } from "@/app/components/ContentCard/Card"
import { LivePage } from "./class/components/LivePage"
import { ELPage } from "./e-learning/components/ELPage"
import { SingleCourseProvider } from "../context/SingleCourseContext"


const getCourse = async (name: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1/courses/name/${name}`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function CoursePage({ params }: { params: { name: string } }) {

    const course: TCourseCard = await getCourse(params.name)

    return (
        <SingleCourseProvider>
            {
                course && course.courseType === 'Offline' ?
                    <LivePage course={course} />
                    :
                    <ELPage course={course} />
            }
        </SingleCourseProvider>
    )
}