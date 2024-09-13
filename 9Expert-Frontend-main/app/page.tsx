import { getHomeCourses } from "@/services/api/home";
import { Homepage } from "./components/Homepage";
import { ClientRender } from "./components/Homepage/wraper/ClientWraper";

export default async function Home() {
    console.debug('fetch home courses')
    const courses = await getHomeCourses()

    return (
        <Homepage>
            <ClientRender courses={courses} />
        </Homepage>
    )
}
