import { AdminAuthProvider } from "./components/AdminAuthProvider"
import { AdminMainPage } from "./components/AdminMainPage"
import { IAdminPageProps } from "./interface/AdminInterface"

export default function AdminPage({ searchParams }: IAdminPageProps) {

    return (
        <AdminAuthProvider>
            <AdminMainPage query={searchParams.tab} />
        </AdminAuthProvider>
    )
}
