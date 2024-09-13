

import { TCertificate } from '@/app/admin/interface/CreateCertificate'
import { get } from './api'

export const searchCoursesAndArticles = (keyword: string) => get(`/search?search=${keyword}`, fetch)
export const searchUserCertificates = (email: string): Promise<TCertificate[]> => get(`/certificate/email?query=${email}`, fetch)