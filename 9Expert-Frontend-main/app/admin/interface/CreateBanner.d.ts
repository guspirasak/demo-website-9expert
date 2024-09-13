export type TCreateBanner = {
    _id?: string
    createAt?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    type: string
    url: string
    name: string
    page: string
    file: {
        name: string
        size: number
    }
}

export type TBanner = {} & TCreateBanner