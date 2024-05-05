import { ICard } from "@/types";

export default interface State {
    cardList: ICard[],
    callId: string
    callJoined: boolean
    psychId: string,
    changeEmailModal: boolean,

    changeCardList: (value: ICard[]) => void
    changeCallId: (value: string) => void
    changeCallJoined: (value: boolean) => void
    changePsychId: (value: string) => void
    actionChangeEmailModal: (value: boolean) => void
}