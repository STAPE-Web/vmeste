import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types'
import { ICard } from '@/types'

const useGlobalStore = create<State>()(devtools((set) => ({
    cardList: [],
    callId: "",
    callJoined: false,
    psychId: "",
    changeEmailModal: false,
    sessionJoined: false,
    opponentName: "",

    changeCardList: (value: ICard[]) => set({ cardList: value }),
    changeCallId: (value: string) => set({ callId: value }),
    changeCallJoined: (value: boolean) => set({ callJoined: value }),
    changePsychId: (value: string) => set({ psychId: value }),
    actionChangeEmailModal: (value: boolean) => set({ changeEmailModal: value }),
    changeSessionJoined: (value: boolean) => set({ sessionJoined: value }),
    changeOpponentName: (value: string) => set({ opponentName: value }),
})))

export default useGlobalStore