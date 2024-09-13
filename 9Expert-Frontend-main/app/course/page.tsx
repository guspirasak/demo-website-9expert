import { CoursePage } from "./components/CoursePage";
import { CourseProvider } from "./context/CourseContext";

const getCourse = async () => {
    const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1/courses`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Course() {

    const courses = await getCourse()

    return (
        <CourseProvider>
            <CoursePage courses={courses} />
        </CourseProvider>
    )
}