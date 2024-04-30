import {create} from 'zustand'
import {State} from '../types'

const initialState = {
  key: '',
  plaintext: '',
  ciphertext: '',
  method: 'Playfair' as const,
  isPlayfair: false,
}

export const useStore = create<State>(set => ({
  ...initialState,
  prev: initialState,
  switchMethod: (isPlayfair: State['isPlayfair']) => {
    set({isPlayfair: !isPlayfair})
    if (!isPlayfair) {
      set({method: 'Transposition'})
    } else {
      set({method: 'Playfair'})
    }
  },
  setCiphertext: (context: string) => set({ciphertext: context}),
  setPlaintext: (context: string) => set({plaintext: context}),
  setKey: (context: string) => set({key: context}),
  reset: () => set({plaintext: '', ciphertext: ''}),
}))
