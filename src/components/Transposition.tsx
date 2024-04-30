import React from 'react'
import {Button} from '@/components/Button'
import {TextBox} from '@/components/TextBox'
import {Label} from '@/components/Label'
import {useStore} from '@/store/store'

export const Transposition = () => {
  const [plaintext, ciphertext, key, setCiphertext, setPlaintext, setKey] =
    useStore(state => [
      state.plaintext,
      state.ciphertext,
      state.key,
      state.setCiphertext,
      state.setPlaintext,
      state.setKey,
    ])
  const polyalphabeticEncrypt = (plaintext: string, key: string) => {
    let ciphertext = ''
    let keyIndex = 0

    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i].toUpperCase()
      const keyChar = key[keyIndex].toUpperCase()

      if (plainChar.match(/[A-Z]/)) {
        // A = 0, B = 1, ..., Z = 25
        const shiftedIndex =
          (plainChar.charCodeAt(0) - 65 + keyChar.charCodeAt(0) - 65) % 26
        const shiftedChar = String.fromCharCode(shiftedIndex + 65)
        ciphertext += shiftedChar
        keyIndex = (keyIndex + 1) % key.length // Cycle through the key
      } else {
        ciphertext += plainChar // Keep non-alphabetic characters as is
      }
    }

    return ciphertext
  }

  const polyalphabeticDecrypt = (ciphertext: string, key: string) => {
    let plaintext = ''
    let keyIndex = 0

    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i].toUpperCase()
      const keyChar = key[keyIndex].toUpperCase()

      if (cipherChar.match(/[A-Z]/)) {
        // Reverse the shift (add 26 to avoid negative numbers)
        const shiftedIndex =
          (cipherChar.charCodeAt(0) - 65 - (keyChar.charCodeAt(0) - 65) + 26) %
          26
        const shiftedChar = String.fromCharCode(shiftedIndex + 65)
        plaintext += shiftedChar
        keyIndex = (keyIndex + 1) % key.length // Cycle through the key
      } else {
        plaintext += cipherChar // Keep non-alphabetic characters as is
      }
    }

    return plaintext
  }

  return (
    <div className='container'>
      <title>Transposition</title>
      <h2>Transposition</h2>
      <Label>
        Plain Text
        <TextBox
          onChange={e => setPlaintext(e.currentTarget.value)}
          value={plaintext}
        />
      </Label>
      <Label>
        Cipher Text
        <TextBox
          onChange={e => setCiphertext(e.currentTarget.value)}
          value={ciphertext}
        />
      </Label>
      <Label>
        Key
        <TextBox onChange={e => setKey(e.currentTarget.value)} value={key} />
      </Label>
      <div className='btn-container'>
        <Button
          onClick={() => setCiphertext(polyalphabeticEncrypt(plaintext, key))}>
          Encrypt
        </Button>
        <Button
          onClick={() => setPlaintext(polyalphabeticDecrypt(ciphertext, key))}>
          Decrypt
        </Button>
      </div>
    </div>
  )
}
