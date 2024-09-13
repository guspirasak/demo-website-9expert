'use client'

import { createContext, useContext, useState } from 'react'
import { TRegisterInhouse } from '../interfaces/RegisterInterface';

export interface IRegisterInhouseContext {
    state: TRegisterInhouse
    setState: React.Dispatch<React.SetStateAction<TRegisterInhouse>>;
}

const defaultValue: IRegisterInhouseContext = {
    state: {
        courseId: "",
        numberPerson: 1,
        monthRequest: "",
        typeForTrain: "", // Onsite or Live
        trainAddressLine: "",
        trainAddress: {
            province: "",
            district: "",
            subdistrict: "",
            postcode: "",
        },
        firstName: "",
        lastName: "",
        position: "",
        department: "",
        companyTaxId: "",
        companyAddressLine: "",
        companyName: "",
        companyBranchName: "",
        companyEmail: "",
        companyAddress: {
            province: "",
            district: "",
            subdistrict: "",
            postcode: "",
        },
        personalEmail: "",
        companyTelephone: "",
        telephone: "",
        note: "",
    },
    setState: () => { }
}

const RegisterInhouseContext = createContext<IRegisterInhouseContext>(defaultValue)

export const useRegisterInhouse = (): IRegisterInhouseContext => {
    const context = useContext(RegisterInhouseContext)
    return context
}

export const RegisterInhouseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<TRegisterInhouse>({
        courseId: "",
        numberPerson: 1,
        monthRequest: "",
        typeForTrain: "", 
        trainAddressLine: "",
        trainAddress: {
            province: "",
            district: "",
            subdistrict: "",
            postcode: "",
        },
        firstName: "",
        lastName: "",
        position: "",
        department: "",
        companyTaxId: "",
        companyAddressLine: "",
        companyName: "",
        companyBranchName: "",
        companyEmail: "",
        companyAddress: {
            province: "",
            district: "",
            subdistrict: "",
            postcode: "",
        },
        personalEmail: "",
        companyTelephone: "",
        telephone: "",
        note: "",
    })

    return (
        <RegisterInhouseContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </RegisterInhouseContext.Provider>
    )
}