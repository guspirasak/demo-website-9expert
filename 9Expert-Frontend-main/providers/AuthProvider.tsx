'use client'
// import { setUser } from "@/redux/UserSlice"
import { useEffect, useState } from "react"
// import { useDispatch } from "react-redux"
// import { Fallback } from "./Fallback"
import { session } from "@/utils/session"

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {

    const [ isLoading, setIsLoading ] = useState(true)

    //const dispatch = useDispatch()

    useEffect(() => {
        const local = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        const refresher = localStorage.getItem('refresher')

        if (!local) {
            return setIsLoading(false)
        }

        const user = JSON.parse(local || '')

        if (!user) {
            return setIsLoading(false)
        }

        session(token as string, refresher as string, () => {

            // dispatch(setUser(newUsr.user))
        
            setIsLoading(false)
        })

    }, [])

    return isLoading ? <></> : children
}
