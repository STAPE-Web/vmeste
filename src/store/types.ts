import { ICard, IPsyhProfile } from "@/types";

export default interface State {
    cardList: ICard[],
    callId: string
    callJoined: boolean
    psychId: string,
    changeEmailModal: boolean,
    sessionJoined: boolean
    opponentName: string
    leftTime: string
    psychData: IPsyhProfile | null

    changeCardList: (value: ICard[]) => void
    changeCallId: (value: string) => void
    changeCallJoined: (value: boolean) => void
    changePsychId: (value: string) => void
    actionChangeEmailModal: (value: boolean) => void
    changeSessionJoined: (value: boolean) => void
    changeOpponentName: (value: string) => void
    changeLeftTime: (value: string) => void
    changePsychData: (value: IPsyhProfile) => void
}