import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State from './types'
import { ICard } from '@/types'

const useGlobalStore = create<State>()(devtools((set) => ({
    cardList: [],

    changeCardList: (value: ICard[]) => set({ cardList: value }),
})))

export default useGlobalStore