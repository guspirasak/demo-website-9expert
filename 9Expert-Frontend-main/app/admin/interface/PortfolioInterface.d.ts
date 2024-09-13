export type TPortfolio = {
    _id?: string;
    imageUrl: string;
    createAt?: string;
    isDeleted?: boolean;
};

export type TCreatePortfolio = {
    file: {
        name: string;
        size: number;
    }
} & TPortfolio