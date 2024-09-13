'use client'

import { createContext, useContext, useState } from 'react'
import { TValidateRegisterPublic } from '../interfaces/RegisterInterface';

export interface IValidateRegisterPublicContext {
    validate: TValidateRegisterPublic
    setValidate: React.Dispatch<React.SetStateAction<TValidateRegisterPublic>>;
}

const defaultValue: IValidateRegisterPublicContext = {
    validate: {
        isFormId: false,
        isType: false,
        isFirstName: false,
        isLastName: false,
        isEmail: false,
        isNumberPerson: false,
        isApplyOnStatus: false,
        isTelephone: false,
        isCourseId: false,
        isClassId: false,
        isTaxType: false,
        isTax: {
            isTaxId: false,
            isAddressLine: false,
            isAddress: {
                isProvince: false,
                isDistrict: false,
                isSubdistrict: false,
                isPostcode: false,
            },
        },
    },
    setValidate: () => { }
}

const ValidateRegisterPublicContext = createContext<IValidateRegisterPublicContext>(defaultValue)

export const useValidateRegisterPublic = (): IValidateRegisterPublicContext => {
    const context = useContext(ValidateRegisterPublicContext)
    return context
}

export const ValidateRegisterPublicProvider = ({ children }: { children: React.ReactNode }) => {
    const [validate, setValidate] = useState<TValidateRegisterPublic>({
        isFormId: false,
        isType: false, //public or hybrid
        isFirstName: false,
        isLastName: false,
        isEmail: false,
        isNumberPerson: false,
        isApplyOnStatus: false,
        isTelephone: false,
        isCourseId: false,
        isClassId: false,
        isTaxType: false,
        isTax: {
            isTaxId: false,
            isAddressLine: false,
            isAddress: {
                isProvince: false,
                isDistrict: false,
                isSubdistrict: false,
                isPostcode: false,
            },
        },
    })

    return (
        <ValidateRegisterPublicContext.Provider
            value={{
                validate,
                setValidate,
            }}
        >
            {children}
        </ValidateRegisterPublicContext.Provider>
    )
}