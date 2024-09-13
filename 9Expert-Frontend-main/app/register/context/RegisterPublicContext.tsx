'use client'

import { createContext, useContext, useState } from 'react'
import { TRegisterPublic } from '../interfaces/RegisterInterface';

export interface IRegisterPublicContext {
    state: TRegisterPublic
    setState: React.Dispatch<React.SetStateAction<TRegisterPublic>>;
}

const defaultValue: IRegisterPublicContext = {
    state: {
        formId: "",
        type: "", // public or hybrid
        firstName: "",
        lastName: "",
        email: "",
        numberPerson: 0,
        applyOnStatus: false,
        telephone: "",
        courseId: "",
        classId: "",
        requestInvoice: false,
        requestReceipt: false,
        promotionId: "",
        note: "",
        taxType: "personal",
        tax: {
            taxId: "",
            firstName: "",
            lastName: "",
            companyName: "",
            addressLine: "",
            address: {
                province: "",
                district: "",
                subdistrict: "",
                postcode: "",
            },
            telephone: "",
            note: "",
        },
        member: {
            count: 0,
            memberData: [],
        },
        status: "Pending",
    },
    setState: () => { }
}

const RegisterPublicContext = createContext<IRegisterPublicContext>(defaultValue)

export const useRegisterPublic = (): IRegisterPublicContext => {
    const context = useContext(RegisterPublicContext)
    return context
}

export const RegisterPublicProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TRegisterPublic>({
        formId: "",
        type: "", // public or hybrid
        firstName: "",
        lastName: "",
        email: "",
        numberPerson: 1,
        applyOnStatus: false,
        telephone: "",
        courseId: "",
        classId: "",
        requestInvoice: false,
        requestReceipt: false,
        promotionId: "",
        note: "",
        taxType: "personal",
        tax: {
            taxId: "",
            firstName: "",
            lastName: "",
            companyName: "",
            addressLine: "",
            address: {
                province: "",
                district: "",
                subdistrict: "",
                postcode: "",
            },
            telephone: "",
            note: "",
        },
        member: {
            count: 0,
            memberData: [],
        },
        status: "Pending",
    })

    return (
        <RegisterPublicContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </RegisterPublicContext.Provider>
    )
}