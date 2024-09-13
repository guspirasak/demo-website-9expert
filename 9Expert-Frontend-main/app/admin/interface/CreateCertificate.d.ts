export type TCertificateUser = {
    name: string
    surname: string
    email: string
    status: string
    certificateNo?: string
    certificate?: string
    userType?: string
    isSending: boolean
    startDate: string
}

export type TCreateCertificate = {
    classDetailId: string
    courseName: string
    courseId: string
    courseInstructor: string
    qrcode: string
    validId: string
    classStartDate: string
    user: TCertificateUser[]
    status: string
    file: {
        name: string
        size: number
    }
}

export type TClassDetailWithCourseName = {
    _id: string
    courseId: string,
    classType: string,
    classStartDate: string,
    classEndDate: string,
    classStartTime: string,
    classEndTime: string,
    classCapacity: number,
    classLocation: string,
    classTeamsURL: string,
    classStatus: string,
    classNote: string,
    classRoom: Array<string>,
    course: {
        _id?: string
        courseId: string
        courseName: string
        courseNameAbbr?: string
        courseInstructor: string
        hours?: string
        days?: string
    }
}

export type TCertificate = {
    _id?: string
    classDetailId: string
    courseName: string
    courseId: string
    courseInstructor: string
    qrcode: string
    validId: string
    user: TCertificateUser[]
    createDate: string
    status: string
}

export type TEmailCertificate = {
    name: string
    surname: string
    email: string
    courseName: string
    certificateNo: string
}

export type TCertificateHours = {
    _id?: string
    courseName: string
    hours: string
    days: string
}