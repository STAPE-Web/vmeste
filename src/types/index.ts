export interface ITests {
    id: string,
    name: string,
    extendedDescription: string,
    description: string,
    questions: IQuestion[],
    isFavorite?: boolean,
    countTime?: number,
}

export interface IOption {
    option: string
    point: number
}

export interface IQuestion {
    question: string
    options: IOption[]
}

export interface IArticle {
    id: string,
    createdAt: number,
    title: string,
    tags: number[]
    text: string,
    preview: string,
    isFavorite: boolean
}

export interface IVideo {
    id: string;
    link: string;
    title: string;
    descr: string;
    preview: string;
    isFavorite: boolean;
}

export interface IBlog {
    tests: ITests[];
    articles: IArticle[];
    videos: { videos: IVideo[] };
}

export interface IMethod {
    description: string,
    title: string
}

export interface ISpecialist {
    id: string,
    name: string,
    isFavourite: boolean,
    individualSession: {
        countTime: number,
        price: number
    },
    urlAvatar: string,
    exp: number,
    education: [
        {
            name: string,
            year: number
        }
    ],
    sameThemesCount: number,
    description: string,
    methods: IMethod[],
    freeTime: string[]
}