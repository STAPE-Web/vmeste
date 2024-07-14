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

export interface IEduc {
    "name": string,
    "year": number,
    "faculty": string,
    "degree": number
}

export interface ICreatePsyh {
    "sid": string,
    "fio": string,
    "gender": string,
    "bday": string,
    "phone": string,
    "email": string,
    "contact": string,
    "citizenship": string,
    "socailMedia": string,
    "bio": string,
    "educ": IEduc[],
    "profComm": boolean,
    "mainMethod": string[],
    "extraMethod": number[],
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
    "familyTherapy": string,
    "foundUs": number,
    "docs": string[],
    "photos": string[]
}

export interface IPsyhProfile {
    "status": number,
    "id": string,
    "level": number,
    "isApproved": boolean,
    "name": string,
    "photoUrl": string,
    "gender": string,
    "bday": string,
    "bio": string,
    "methods": string[],
    "therapy": string,
    "educ": IEduc[],
    "language": string[]
}

export interface IEditProfile {
    "sid": string,
    "languages": string[],
    "photo": string,
    "bio": string,
    "methods": string[],
    "therapy": string
}

export interface IPsychSession {
    "sesId": string,
    "dateSession": string,
    "sessionNumber": number,
    "userId": string,
    "userName": string,
    "status": string
}

export interface IPsychSessions {
    "freeTimetables": string[],
    "sessions": IPsychSession[]
}

export interface IClient {
    "userId": string,
    "name": string,
    "lastSession": string,
    "futureSession": string | null,
    "sessionsCount": number,
    "themes": string[]
    "notes": string[]
}

export interface IPsychStats {
    "status": number,
    "createdAt": string,
    "totalSessions": number,
    "repeatedSessions": number,
    "repeatedSessionsTarget": number
}

export interface IPayment {
    "id": string,
    "sesId": string,
    "psychId": string,
    "userId": string,
    "userName": string,
    "price": number,
    "dateSession": string,
    "themes": string[]
    "notes": string[]
}