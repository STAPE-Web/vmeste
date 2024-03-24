import { ICard } from "@/types";

export default interface State {
    cardList: ICard[],

    changeCardList: (value: ICard[]) => void
}