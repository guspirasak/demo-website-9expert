import type { Metadata } from 'next'
import { AdminClientLayout } from './components/AdminClientLayout'

export const metadata: Metadata = {
    title: '9Expert Training | Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <AdminClientLayout>
            {children}
        </AdminClientLayout>
    )
}
