import { ELBundleInclude } from "../../course/[name]/e-learning/components/ELBundle/ELBundleInclude";
import { BundelPage } from "./component/BundlePage";

const getBundle = async (name: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1/bundles/name/${name}`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Bundle({ params }: { params: { name: string } }) {

    const bundles = await getBundle(params.name)

    return (
        <>
            <BundelPage bundles={bundles} />
        </>
    )
}