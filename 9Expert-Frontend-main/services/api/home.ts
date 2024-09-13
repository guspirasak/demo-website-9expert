import { get } from './api'

export const getReview = () => get('/setting/review?limit=15', fetch)
export const getBanner = () => get('/setting/banner', fetch)
export const getHomeCourses = () => get('/courses/homepage', fetch)