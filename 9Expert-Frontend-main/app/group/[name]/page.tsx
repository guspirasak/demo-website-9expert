import { GroupPage } from "./components/GroupPage";
import { GroupProvider } from "./context/GroupContext";

const getCourse = async (name: string) => {
    
    const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1/courses/courseGroup/${name}`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    const data = await res.json()
    return data

}

export default async function CourseGroup({ params }: { params: { name: string } }) {

    const course = await getCourse(params.name.replace(/-/g, ' '))
    return (
        <GroupProvider>
            <GroupPage course={course} />
        </GroupProvider>
    )
}