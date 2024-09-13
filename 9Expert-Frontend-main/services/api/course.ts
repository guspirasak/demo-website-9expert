import { TCourseGroup, TTechnologyArea } from '@/app/admin/interface/CreateCourseInterface'
import { get, post } from './api'
import { TCertificateCard } from '@/app/components/ContentCard/Card'

export const getCourses = () => get('/courses', fetch)
export const getGroups = (): Promise<TCourseGroup[]> => get('/groups', fetch)
export const getTechAreas = (): Promise<TTechnologyArea[]> => get('/technology/areas', fetch)
export const getCoursesByArea = (body: string[], type: string) => post(`/courses/technologyAreas?type=${type}`, body, fetch)
export const getCourseCertificateCard = (id: string): Promise<TCertificateCard> => get(`/courses/certificate/id/${id}`, fetch)