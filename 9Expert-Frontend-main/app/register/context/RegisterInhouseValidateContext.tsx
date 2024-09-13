'use client'

import { createContext, useContext, useState } from 'react'
import { TValidateRegisterInhouse } from '../interfaces/RegisterInterface';

export interface IValidateRegisterInhouseContext {
    validate: TValidateRegisterInhouse
    setValidate: React.Dispatch<React.SetStateAction<TValidateRegisterInhouse>>;
}

const defaultValue: IValidateRegisterInhouseContext = {
    validate: {
        isCourseId: false,
        isNumberPerson: false,
        isMonthRequest: false,
        isTypeForTrain: false,
        isTrainAddressLine: false,
        isTrainAddress: {
            isProvince: false,
            isDistrict: false,
            isSubdistrict: false,
            isPostcode: false,
        },
        isFirstName: false,
        isLastName: false,
        isPosition: false,
        isDepartment: false,
        isCompanyTaxId: false,
        isCompanyAddressLine: false,
        isCompanyName: false,
        isCompanyBranchName: false,
        isCompanyEmail: false,
        isCompanyAddress: {
            isProvince: false,
            isDistrict: false,
            isSubdistrict: false,
            isPostcode: false,
        },
        isPersonalEmail: false,
        isCompanyTelephone: false,
        isTelephone: false,
    },
    setValidate: () => { }
}

const ValidateRegisterInhouseContext = createContext<IValidateRegisterInhouseContext>(defaultValue)

export const useValidateRegisterInhouse = (): IValidateRegisterInhouseContext => {
    const context = useContext(ValidateRegisterInhouseContext)
    return context
}

export const ValidateRegisterInhouseProvider = ({ children }: { children: React.ReactNode }) => {
    const [validate, setValidate] = useState<TValidateRegisterInhouse>({
        isCourseId: false,
        isNumberPerson: false,
        isMonthRequest: false,
        isTypeForTrain: false,
        isTrainAddressLine: false,
        isTrainAddress: {
            isProvince: false,
            isDistrict: false,
            isSubdistrict: false,
            isPostcode: false,
        },
        isFirstName: false,
        isLastName: false,
        isPosition: false,
        isDepartment: false,
        isCompanyTaxId: false,
        isCompanyAddressLine: false,
        isCompanyName: false,
        isCompanyBranchName: false,
        isCompanyEmail: false,
        isCompanyAddress: {
            isProvince: false,
            isDistrict: false,
            isSubdistrict: false,
            isPostcode: false,
        },
        isPersonalEmail: false,
        isCompanyTelephone: false,
        isTelephone: false,
    })

    return (
        <ValidateRegisterInhouseContext.Provider
            value={{
                validate,
                setValidate,
            }}
        >
            {children}
        </ValidateRegisterInhouseContext.Provider>
    )
}