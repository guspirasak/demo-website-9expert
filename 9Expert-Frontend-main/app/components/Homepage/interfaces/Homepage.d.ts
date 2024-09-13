export type TDifficultLevelCheckBox = {
    All: boolean
    Beginner: boolean
    Intermediate: boolean
    Advance: boolean
    Expert: boolean
    [key: string]: boolean
}

export type TProgramCheckBox = {
    All: boolean
    Excel: boolean
    'Power BI': boolean
    'Power Automate (Cloud)': boolean
    'Power Apps': boolean
    'Access': boolean
    [key: string]: boolean
}

export type THomepageBanner = {
    url: string
    type: string
    name: string
}

export type THomepageReview = {
    name: string;
    description: string;
    image: string;
};
