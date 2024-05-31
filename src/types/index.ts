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

export type ICard = {
    number: string
    dateEnd: string
    cvv: string
}

export interface ISession {
    id: string,
    userId: string,
    userName: string,
    psychId: string,
    psychName: string,
    psychPhoto: string
    status: string,
    dateSession: string
    sessionNumber: number,
    price: number
}

export interface IProfile {
    savedPsychs: ISpecialist[]
    status: number
    themes: any,
    userInfo: {
        name: string,
        age: number,
        therapyExperience: boolean,
        gender: string,
        familyTherapy: boolean,
        type: string,
        email?: string
        phone?: string
    }
}

export interface ICreatePsyh {
    sid: string,
    fio: string,
    "gender": string,
    "bday": string,
    "phone": string,
    "email": string,
    "contact": string,
    "citizenship": string,
    "socailMedia": string,
    "bio": string,
    "educ": string[],
    "promComm": boolean,
    "mainMethod": string,
    "extraMethod": string,
    "consultStart": string,
    "onlineExp": boolean,
    "onlineExpInfo": string,
    "clients": number,
    "longestSession": string,
    "personalTreopia": boolean,
    "supervisions": boolean,
    "anotherJob": string,
    "vmesteClients": string,
    "psychProcess": string,
    "onlineTherapy": string,
    "familyTherapy": boolean,
    "foundUs": string,
    "docs": string,
    "photos": string
}