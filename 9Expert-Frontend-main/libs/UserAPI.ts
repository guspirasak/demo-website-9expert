import { request } from "@/libs/axios"

export const searchCerificate = async (email: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate/email?query=${email}`, {
        method: 'GET',
    });

    callback(data, error);
}

export const getHomepageBanner = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getArticleBySearch = async (query: string, type: string, page: number | string | 1, callback: Function) => {
    const { data, error } = await request(`/api/v1/search/articles?page=${page}&search=${query}&type=${type}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllCourseCardByMultiId = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/card/multi/id`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getAllArticleByMultiId = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/card/multi/id`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getJob = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits/display`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllArticlesByMultiAreaName = async (ids: string[], type: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/area/multi/id?type=${type}`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getAllArticlesByMultiCourseGroupName = async (ids: string[], type: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/group/multi/id?type=${type}`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getBundleByMultiCourseId = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/multi/courseId`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getArticleByType = async (type: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/type/${type}?page=1`, {
        method: 'GET'
    })

    callback(data, error)
}