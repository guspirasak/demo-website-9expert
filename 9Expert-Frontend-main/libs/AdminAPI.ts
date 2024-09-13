import { TBundle } from "@/app/admin/interface/BundleInterface"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { TBanner, TCreateBanner } from "@/app/admin/interface/CreateBanner"
import { TCertificate, TCertificateHours, TCreateCertificate } from "@/app/admin/interface/CreateCertificate"
import { TClassDetails, TCourseGroup, TCreateCourse } from "@/app/admin/interface/CreateCourseInterface"
import { TFaq } from "@/app/admin/interface/CreateFaqInterface"
import { TCreatePortfolio } from "@/app/admin/interface/PortfolioInterface"
import { TPromotion } from "@/app/admin/interface/PromotionInterface"
import { TRecruitment } from "@/app/admin/interface/RecruitmentInterface"
import { TCreateReview, TReview } from "@/app/admin/interface/ReviewInterface"
import { TCreateCourseGroup, TCreateTechnologyArea } from "@/app/admin/interface/TechnologyAreaInterface"
import { request } from "@/libs/axios"
import { TRegisterInhouse, TRegisterPublic } from "@/app/register/interfaces/RegisterInterface"
import { TUserRegister } from "@/app/admin/interface/AdminInterface"

export const GetEmptyRoom = async (startDate: Date | string, endDate: Date | string, callback: Function) => {
    const { data, error } = await request(`/api/v1/rooms/available?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllCourseGroup = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/groups`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllArticles = async (page: number | string | 1, callback: Function, query?: string) => {
    const { data, error } = await request<{ data: TArticle[], error: string }>(`/api/v1/articles/all?page=${page}&query=${query}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getCourseDetail = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/class/details?id=${id}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const createCourseGroup = async (group: TCourseGroup, callback: Function) => {
    const { data, error } = await request(`/api/v1/groups`, {
        method: 'POST',
        data: group
    })

    callback(data, error)
}

export const getAllTechnologyArea = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllCourse = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/courses`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getCourseById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/id/${id}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const adminGetCourseById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/admin/id/${id}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const registerInhouseCourse = async (form: TRegisterInhouse, callback: Function) => {
    const { data, error } = await request(`/api/v1/register/inhouse`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const registerPublicCourse = async (form: TRegisterPublic, callback: Function) => {
    const { data, error } = await request(`/api/v1/register/public`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getCourseDataForRegister = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/register/public/class/${id}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const searchCourse = async (keyword: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/search/courses?search=${keyword}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getSchedule = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/schedule`, {
        method: 'GET'
    })

    callback(data, error)
}

export const searchCourseAndArticle = async (keyword: string, pageCourse: number=1, pageArticle: number=1, callback: Function) => {
    const { data, error } = await request(`/api/v1/search?search=${keyword}&coursepage=${pageCourse}&articlepage=${pageArticle}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const searchCourseAndArticleWithPage = async (keyword: string, page: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/search?search=${keyword}&page=${page}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getCourseByCourseGroup = async (id: string, type: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/courseGroup/id/${id}?type=${type}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getCoursesByCourseGroupNameAbbr = async (name: string, callback: Function, type?: string) => {
    const { data, error } = await request(`/api/v1/courses/courseGroup/${name}?type=${type}`, {
        method: 'GET'
    })

    callback(data, error)
}


export const getArticleById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/id/${id}`, {
        method: 'GET'
    })

    callback(data, error)
}

export const getAllCourseNameByMultiId = async (id: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/courseName/multi/id`, {
        method: 'POST',
        data: {
            id
        }
    })

    callback(data, error)
}

export const getAllCourseName = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/courseName/multi/all`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getAllClassDetailAndCourseName = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/class/details/course/name`, {
        method: 'GET',
    })

    callback(data, error)
}

export const createNewCertificate = async (form: TCreateCertificate, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getAllCertificate = async (page: number | string | 1, callback: Function, query?: string) => {
    const { data, error } = await request(`/api/v1/certificate?page=${page}&limit=5&query=${query}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getCertificateWithClassDetailId = async (id: string, callback: Function, query?: string) => {
    const { data, error } = await request(`/api/v1/certificate/id/${id}?query=${query}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getCertificateWithCerNo = async (id: string, no: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate/no/${id}?no=${no}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updateCertificateUser = async (id: string, form: TCreateCertificate, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const createBanner = async (form: TCreateBanner, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getAllBanner = async (page: number | string | 1, sort: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner/all?page=${page}&sort=${sort}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updateBanner = async (id: string, form: TBanner, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getBannerById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const createPortfolio = async (form: TCreatePortfolio, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/portfolio`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getAllPortfolio = async (page: number | string | 1, sort: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/portfolio?page=${page}&sort=${sort}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deletePortfolio = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/portfolio/id/${id}`, {
        method: 'PATCH',
    })

    callback(data, error)
}

export const updatePortfolio = async (id: string, form: TCreatePortfolio, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/portfolio/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getAllReview = async (page: number | string | 1, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/review?page=${page}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const createReview = async (form: TCreateReview, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/review`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const updateReview = async (id: string, form: TReview, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/review/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const deleteReview = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/review/id/${id}`, {
        method: 'PATCH',
    })

    callback(data, error)
}

export const createTechnologyArea = async (form: TCreateTechnologyArea, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const adminGetAllTechnologyArea = async (page: number | string | 1, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/admin?page=${page}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const adminUpdateTechnologyArea = async (id: string, form: TCreateTechnologyArea, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/admin/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)

}

export const adminDeleteTechnologyArea = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/admin/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const adminGetAllCourseGroupWithTechnologyAreaId = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/id/${id}/groups`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getTechnologyAreaById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const adminCreateCourseGroup = async (areaId: string, form: TCreateCourseGroup, callback: Function) => {
    const { data, error } = await request(`/api/v1/groups`, {
        method: 'POST',
        data: { areaId, ...form }
    })

    callback(data, error)
}

export const adminUpdateCourseGroup = async (id: string, form: TCreateCourseGroup, callback: Function) => {
    const { data, error } = await request(`/api/v1/groups/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const activeTechnologyArea = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/active/${id}`, {
        method: 'PATCH',
    })

    callback(data, error)
}

export const activeCourseGroup = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/groups/active/${id}`, {
        method: 'PATCH',
    })

    callback(data, error)
}

export const adminDeleteCourseGroup = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/groups/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const getAllOfflineCourseTable = async (page: number | string | 1, callback: Function, query?: string, sort?: { price: string, amount: string }) => {
    const { data, error } = await request(`/api/v1/courses/table/all/offline?page=${page}&query=${query}&sort=${JSON.stringify(sort)}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getAllOnlineCourseTable = async (page: number | string | 1, callback: Function, query?: string, sort?: { price: string, amount: string }) => {
    const { data, error } = await request(`/api/v1/courses/table/all/online?page=${page}&query=${query}&sort=${JSON.stringify(sort)}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const adminDeleteCourse = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/admin/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const adminDeleteMultipleCourse = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/admin/multiple`, {
        method: 'DELETE',
        data: ids
    })

    callback(data, error)
}

export const CreateCourse = async (form: TCreateCourse, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const updateCourse = async (id: string, form: TCreateCourse, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const adminGetAllPromotion = async (page: number | string | 1, callback: Function, query?: string) => {
    const { data, error } = await request(`/api/v1/promotions?page=${page}&query=${query}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const adminDeletePromotion = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/promotions/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const adminDeleteMultiplePromotion = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/promotions/multiple`, {
        method: 'DELETE',
        data: ids
    })

    callback(data, error)
}

export const createPromotion = async (form: TPromotion, callback: Function) => {
    const { data, error } = await request(`/api/v1/promotions`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getPromotionById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/promotions/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updatePromotion = async (id: string, form: TPromotion, callback: Function) => {
    const { data, error } = await request(`/api/v1/promotions/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getAllBundle = async (page: number | string | 1, callback: Function, query?: string, sort?: { price: string, createAt: string }) => {
    const { data, error } = await request(`/api/v1/bundles?page=${page}&query=${query}&sort=${JSON.stringify(sort)}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deleteBundle = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const deleteMultipleBundle = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/multiple`, {
        method: 'DELETE',
        data: ids
    })

    callback(data, error)
}

export const getAllCourseDataForBundleByCourseGroup = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/bundle/courseGroup/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getAllCourseDataForBundle = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/bundle/course/all`, {
        method: 'GET',
    })

    callback(data, error)
}

export const createBundle = async (form: TBundle, callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const updateBundle = async (id: string, form: TBundle, callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getBundle = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getBundleByCourseId = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/bundles/course/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getArticleByCourseGroup = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/courseGroup/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}


export const getAllAricleTitleByMultiId = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/multi/id`, {
        method: 'POST',
        data: ids
    })

    callback(data, error)
}

export const getLatestCourse = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/latest`, {
        method: 'GET',
    })

    callback(data, error)
}

export const sendEmailCertificate = async (mailData: TCreateCertificate | TCertificate, callback: Function) => {
    const { data, error } = await request(`/api/v1/mail/certificate`, {
        method: 'POST',
        data: mailData
    })

    callback(data, error)
}

export const createRecruitment = async (form: TRecruitment, callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getAllRecruitment = async (page : number | string | 1, callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits?page=${page}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const createFaq = async (form: TFaq, callback: Function) => {
    const { data, error } = await request(`/api/v1/faq`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getFaq = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/faq`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updateFaq = async (id: string, form: TFaq, callback: Function) => {
    const { data, error } = await request(`/api/v1/faq/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getFaqById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/faq/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deleteArticle = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const deleteArticelByMultipleId = async (ids: string[], callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/multi/id`, {
        method: 'DELETE',
        data: ids
    })

    callback(data, error)
}

export const getThreeLatestArticle = async (callback: Function) => {
    const { data, error } = await request(`/api/v1/articles/recommend/latest`, {
        method: 'GET',
    })

    callback(data, error)
}

export const changeTechnologyAreaOrder = async (id: string, order: number, callback: Function) => {
    const { data, error } = await request(`/api/v1/technology/areas/order/${id}`, {
        method: 'PATCH',
        data: {
            order
        }
    })

    callback(data, error)
}

export const deleteClassDetail = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/class/details/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const createClassDetails = async (form: TClassDetails, callback: Function) => {
    const { data, error } = await request(`/api/v1/class/details`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const editClassDetail = async (id: string, form: TClassDetails, callback: Function) => {
    const { data, error } = await request(`/api/v1/class/details/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const deleteCertificate = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const deleteBanner = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/setting/banner/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const getAllUserRegister = async (callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/dashboard`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getUserRegisterByFilter = async (filter: string, callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/dashboard/filter?query=${filter}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const uploadArticleDesctiption = async (file: string[], callback: Function) => {
    const { data, error } = await request<{ data: string, error: unknown }>(`/api/v1/articles/image/description`, {
        method: 'POST',
        data: file
    })

    callback(data, error)
}

export const getAllArticlesByCourseGroupId = async (id: string, callback: Function) => {
    const { data, error } = await request<{ data: TArticle[], error: unknown }>(`/api/v1/articles/group/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getPinArticle = async (callback: Function) => {
    const { data, error } = await request<{ data: TArticle[], error: unknown }>(`/api/v1/articles/pinned`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deleteUserCertificate = async (id: string, name: string, surname: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/certificate/user/id/${id}`, {
        method: 'DELETE',
        data: {
            name,
            surname
        }
    })

    callback(data, error)
}

export const getRecruitmentById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits/id/${id}`, {
        method: 'GET',
    }) 

    callback(data, error)
}

export const updateRecruitmentById = async (id: string, form: TRecruitment, callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits/id/${id}`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const deleteRecruitmentById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/recruits/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const deleteFaqById = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/faq/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const adminLogin = async (form: { username: string, password: string }, callback: Function) => {
    const { data, error } = await request(`/api/v1/admins/login`, {
        method: 'POST',
        data: form
    })

    callback(data, error)
}

export const getAdmin = async (username: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/admins/username`, {
        method: 'POST',
        data: {
            username
        }
    })

    callback(data, error)
}

export const adminResetPassword = async (form: { username: string, password: string, newPassword: string }, callback: Function) => {
    const { data, error } = await request(`/api/v1/admins/password`, {
        method: 'PUT',
        data: form
    })

    callback(data, error)
}

export const getAllUserRegisterPublicData = async (callback: Function, page?: number, limit?: number) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/public?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deleteRegisterPublic = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/register/public/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const getCourseDetailForRegister = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/courses/register/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getAllUserRegisterInhouseData = async (callback: Function, page?: number, limit?: number) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/inhouse?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const deleteRegisterInhouse = async (id: string, callback: Function) => {
    const { data, error } = await request(`/api/v1/register/inhouse/id/${id}`, {
        method: 'DELETE',
    })

    callback(data, error)
}

export const getRegisterInhouseWithFilter = async (query: { startDate: string, endDate: string }, callback: Function, search?: string, page?: number, limit?: number) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/inhouse/filter?search=${search}&page=${page}&limit=${limit}`, {
        method: 'POST',
        data: query
    })

    callback(data, error)
}

export const getRegisterPublicWithFilter = async (query: { startDate: string, endDate: string }, callback: Function, search?: string, page?: number, limit?: number) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/public/filter?search=${search}&page=${page}&limit=${limit}`, {
        method: 'POST',
        data: query
    })

    callback(data, error)
}

export const getUserRegisterPublicById = async (id: string, callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/public/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updateStatusRegisterPublicById = async (id: string, status: string, callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/public/id/${id}`, {
        method: 'PUT',
        data: {
            status
        }
    })

    callback(data, error)
}

export const getUserRegisterInhouseById = async (id: string, callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/inhouse/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const updateStatusRegisterInhouseById = async (id: string, status: string, callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/register/inhouse/id/${id}`, {
        method: 'PUT',
        data: {
            status
        }
    })

    callback(data, error)
}

export const checkEmailStatus = async (email: string[], callback: Function) => {
    const { data, error } = await request<{ data: TUserRegister, error: unknown }>(`/api/v1/certificate/email/status`, {
        method: 'PATCH',
        data: {
            email
        }
    })

    callback(data, error)
}

export const getCourseHours = async (id: string, callback: Function) => {
    const { data, error } = await request<{ data: TCertificateHours, error: unknown }>(`/api/v1/courses/hours/id/${id}`, {
        method: 'GET',
    })

    callback(data, error)
}

export const getCourseHoursByCourseId = async (id: string, callback: Function) => {
    const { data, error } = await request<{ data: TCertificateHours, error: unknown }>(`/api/v1/courses/hours/course/id`, {
        method: 'POST',
        data: {
            id
        }
    })

    callback(data, error)
}