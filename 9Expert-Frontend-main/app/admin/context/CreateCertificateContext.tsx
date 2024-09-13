'use client'

import { createContext, useContext, useState } from 'react'
import { TCreateCertificate } from '../interface/CreateCertificate';

export interface ICreateCertificateContext {
    state: TCreateCertificate
    setState: React.Dispatch<React.SetStateAction<TCreateCertificate>>;
}

const defaultValue: ICreateCertificateContext = {
    state: {
        classDetailId: '',
        courseName: '',
        classStartDate: '',
        courseId: '',
        courseInstructor: '',
        qrcode: '',
        validId: '',
        user: [],
        status: 'PENDING',
        file: { name: '', size: 0 }
    },
    setState: () => { }
}

const CreateCertificateContext = createContext<ICreateCertificateContext>(defaultValue)

export const useCreateCertificate = (): ICreateCertificateContext => {
    const context = useContext(CreateCertificateContext)
    return context
}

export const CreateCertificateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TCreateCertificate>({
        classDetailId: '',
        courseName: '',
        classStartDate: '',
        courseId: '',
        courseInstructor: '',
        qrcode: '',
        validId: '',
        user: [],
        status: 'PENDING',
        file: { name: '', size: 0 }
    })

    return (
        <CreateCertificateContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </CreateCertificateContext.Provider>
    )
}