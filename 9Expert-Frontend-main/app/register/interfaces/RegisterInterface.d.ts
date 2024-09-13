import { TClassDetails } from "@/app/admin/interface/CreateCourseInterface"
import { HTMLInputTypeAttribute } from "react"

export type TRegisterInput = {
    children: ReactNode
    placeholder?: string
    onBlur?: () => void
    onFocus?: () => void
    value?: string
    defaultValue?: string
    onChange?: ChangeEventHandler<HTMLSelectElement>
    isRequired?: boolean
    type?: HTMLInputTypeAttribute
    isInvalid?: boolean
    isDisabled?: boolean
}

export type TRegisterSelect = {
    children: ReactNode
    placeholder?: string
    value?: string
    isRequired?: boolean
    onChange?: ChangeEventHandler<HTMLSelectElement>
    heading: string
    isInvalid?: boolean
    isDisabled?: boolean
}

export type TRegisterInhouse = {
    _id?: string
    formInhouseId?: string,
    courseId: string,
    numberPerson: Number,
    monthRequest: string,
    typeForTrain: string, //Onsite or Online
    trainAddressLine: string, //แก้
    trainAddress: { //แก้
        province: string,
        district: string,
        subdistrict: string,
        postcode: string
    }
    firstName: string,
    lastName: string,
    position: string,
    department: string,
    companyTaxId: string,
    companyAddressLine: string,
    companyName: string,
    //companyBranchId: string,
    companyEmail: string,
    companyBranchName: string,
    companyAddress: {
        province: string,
        district: string,
        subdistrict: string,
        postcode: string
    }
    personalEmail: string, //แก้
    companyTelephone: string, //แก้
    telephone: string,
    note: string,
    createAt?: string
    isDeleted?: Boolean
    status?: string
}

export type TValidateRegisterInhouse = {
    isFormInhouseId?: boolean,
    isCourseId: boolean,
    isNumberPerson: boolean,
    isMonthRequest: boolean,
    isTypeForTrain: boolean,
    isTrainAddressLine: boolean,
    isTrainAddress: {
        isProvince: boolean,
        isDistrict: boolean,
        isSubdistrict: boolean,
        isPostcode: boolean
    }
    isFirstName: boolean,
    isLastName: boolean,
    isPosition: boolean,
    isDepartment: boolean,
    isCompanyTaxId: boolean,
    isCompanyAddressLine: boolean,
    isCompanyName: boolean,
    isCompanyBranchName: boolean,
    isCompanyEmail: boolean,
    isCompanyAddress: {
        isProvince: boolean,
        isDistrict: boolean,
        isSubdistrict: boolean,
        isPostcode: boolean
    }
    isPersonalEmail: boolean,
    isCompanyTelephone: boolean,
    isTelephone: boolean,
}

export type TRegisterPublic = {
    _id?: string
    formId: string,
    type: string, //public or hybrid
    firstName: string,
    lastName: string,
    email: string,
    numberPerson: Number,
    applyOnStatus: boolean,
    telephone: string,
    courseId: string,
    classId: string,
    requestInvoice: boolean,
    requestReceipt: boolean,
    promotionId: string, //
    status: string,
    note: string,
    taxType: string,
    tax: {
        firstName?: string, //non require
        lastName?: string, //non require
        companyName?: string, //non require
        taxId: string,
        addressLine: string,
        address: {
            province: string,
            district: string,
            subdistrict: string,
            postcode: string
        }
        telephone?: string,
        note: string,
    },
    member: {
        count: Number
        memberData: Array
    }
    createAt?: string
    isDeleted?: Boolean
}

export type TRegisterPublicTable = {
    course?: {
        _id?: string
        courseId: string
        courseName: string
        courseType: string
        price: Number
        courseStatus
    },
    classDetail?: TClassDetails,
} & TRegisterPublic

export type TValidateRegisterPublic = {
    isFormId: boolean,
    isType: boolean,
    isFirstName: boolean,
    isLastName: boolean,
    isEmail: boolean,
    isNumberPerson: boolean,
    isApplyOnStatus: boolean,
    isTelephone: boolean,
    isCourseId: boolean,
    isClassId: boolean,
    isTaxType: boolean,
    isTax: {
        isTaxId: boolean,
        isAddressLine: boolean,
        isAddress: {
            isProvince: boolean,
            isDistrict: boolean,
            isSubdistrict: boolean,
            isPostcode: boolean
        }
    },
}
export type TClassDetailWithCourse = {
    classDetail: TClassDetails
    course: {
        _id?: string
        courseId: string
        courseName: string
        courseNameAbbr?: string
        courseType: string
    }
}

export type TRegisterInhouseTable = {
    course?: {
        _id?: string
        courseId: string
        courseName: string
        courseType: string
        price: Number
        courseStatus
    },
    classDetail?: TClassDetails,
} & TRegisterInhouse