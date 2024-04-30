export interface State {
  method: 'Transposition' | 'Playfair'
  isPlayfair: boolean
  key: string
  plaintext: string
  ciphertext: string
  switchMethod: (isPlayfair: State['isPlayfair']) => void
  setCiphertext: (context: State['ciphertext']) => void
  setPlaintext: (context: State['plaintext']) => void
  setKey: (context: State['key']) => void
  reset: () => void
}
