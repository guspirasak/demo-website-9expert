/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "../libs/axios"

export const session = async (accessToken: string, refreshToken: string, callback?: Function) => {
    const newSession = await request<{ user: any, accessToken: string, refreshToken: string }>('/api/auth/session', {
        method: 'POST',
        data: {
            refreshToken
        }
    })

    if (newSession.error) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresher')
        localStorage.removeItem('user')
        window.location.href = '/'
        return
    }

    if (newSession.data?.user) {
        localStorage.setItem('token', newSession.data.accessToken)
        localStorage.setItem('refresher', newSession.data.refreshToken)
        localStorage.setItem('user', JSON.stringify(newSession.data.user))
        if (typeof callback === 'function') {
            callback(newSession.data);
        }
        return newSession.data
    }

    if (typeof callback === 'function') {
        callback(newSession.data);
    }
    return newSession.data

}