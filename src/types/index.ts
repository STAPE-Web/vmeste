export interface ITests {
    id: string,
    name: string,
    extendedDescription: string,
    description: string,
    questions: IQuestion[]
}

export interface IOption {
    option: string
    point: number
}

export interface IQuestion {
    question: string
    options: IOption[]
}