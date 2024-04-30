import React from 'react'
import {Button} from '@/components/Button'
import {TextBox} from '@/components/TextBox'
import {Label} from '@/components/Label'
import {useStore} from '@/store/store'

export const Playfair = () => {
  const [plaintext, ciphertext, key, setCiphertext, setPlaintext, setKey] =
    useStore(state => [
      state.plaintext,
      state.ciphertext,
      state.key,
      state.setCiphertext,
      state.setPlaintext,
      state.setKey,
    ])

  const playfairEncrypt = (plaintext: string, key: string) => {
    const keyMatrix = generateKeyMatrix(key) as []
    const pairs = preparePlaintext(plaintext)

    let ciphertext = ''
    for (const pair of pairs) {
      const char1Pos = findCharInMatrix(keyMatrix, pair[0])
      const char2Pos = findCharInMatrix(keyMatrix, pair[1])

      if (!char1Pos || !char2Pos) return
      if (char1Pos?.row === char2Pos?.row) {
        // Same row: shift to the right (wrap around)
        ciphertext += keyMatrix[char1Pos?.row][(char1Pos.col + 1) % 5]
        ciphertext += keyMatrix[char2Pos?.row][(char2Pos.col + 1) % 5]
      } else if (char1Pos.col === char2Pos.col) {
        // Same column:ل shift down (wrap around)
        ciphertext += keyMatrix[(char1Pos.row + 1) % 5][char1Pos.col]
        ciphertext += keyMatrix[(char2Pos.row + 1) % 5][char2Pos.col]
      } else {
        // Different row and column: take opposite corners of the rectangle
        ciphertext += keyMatrix[char1Pos.row][char2Pos.col]
        ciphertext += keyMatrix[char2Pos.row][char1Pos.col]
      }
    }

    return ciphertext
  }

  const playfairDecrypt = (ciphertext: string, key: string) => {
    const keyMatrix = generateKeyMatrix(key) as []
    const pairs = []
    for (let i = 0; i < ciphertext.length; i += 2) {
      pairs.push([ciphertext[i], ciphertext[i + 1]])
    }

    let plaintext = ''
    for (const pair of pairs) {
      const char1Pos = findCharInMatrix(keyMatrix, pair[0])
      const char2Pos = findCharInMatrix(keyMatrix, pair[1])

      if (!char1Pos || !char2Pos) return
      if (char1Pos?.row === char2Pos?.row) {
        // Same row: shift to the left (wrap around)
        plaintext += keyMatrix[char1Pos.row][(char1Pos.col + 4) % 5]
        plaintext += keyMatrix[char2Pos.row][(char2Pos.col + 4) % 5]
      } else if (char1Pos.col === char2Pos.col) {
        // Same column: shift up (wrap around)
        plaintext += keyMatrix[(char1Pos.row + 4) % 5][char1Pos.col]
        plaintext += keyMatrix[(char2Pos.row + 4) % 5][char2Pos.col]
      } else {
        // Different row and column: take opposite corners of the rectangle
        plaintext += keyMatrix[char1Pos.row][char2Pos.col]
        plaintext += keyMatrix[char2Pos.row][char1Pos.col]
      }
    }

    return plaintext
  }
  const generateKeyMatrix = (key: string) => {
    const matrix = []
    const keyChars = key.toUpperCase().replace(/J/g, 'I').split('') // Remove J, treat it as I
    const usedChars = new Set()

    // Add key characters to the matrix
    for (const char of keyChars) {
      if (!usedChars.has(char)) {
        matrix.push(char)
        usedChars.add(char)
      }
    }

    // Add remaining alphabet characters
    for (let charCode = 65; charCode <= 90; charCode++) {
      const char = String.fromCharCode(charCode)
      if (char !== 'J' && !usedChars.has(char)) {
        matrix.push(char)
      }
    }

    // Create 5x5 matrix from the character array
    return matrix.reduce((rows: Array<[] | any>, char, index: number) => {
      const rowIndex = Math.floor(index / 5)
      if (!rows[rowIndex]) {
        rows[rowIndex] = []
      }
      rows[rowIndex].push(char)
      return rows
    }, [])
  }
  const findCharInMatrix = (matrix: [], char: any) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) {
          return {row, col}
        }
      }
    }
    return null // Character not found
  }
  const preparePlaintext = (plaintext: string) => {
    plaintext = plaintext.toUpperCase().replace(/J/g, 'I') // Remove J, treat it as I
    const pairs = []
    let i = 0

    while (i < plaintext.length) {
      // If same letter, insert X or Z (if X is the same letter) after the first occurrence
      if (i + 1 < plaintext.length && plaintext[i] === plaintext[i + 1]) {
        pairs.push(plaintext[i] + (plaintext[i] === 'X' ? 'Z' : 'X'))
        i++
      } else {
        pairs.push(plaintext.substring(i, i + 2))
        i += 2
      }
    }

    // If last pair is incomplete, add X or Z
    if (pairs[pairs.length - 1].length === 1) {
      pairs[pairs.length - 1] += pairs[pairs.length - 1] === 'X' ? 'Z' : 'X'
    }

    return pairs
  }

  return (
    <div className='container'>
      <title>Playfair</title>
      <h2>Playfair</h2>
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
          onClick={() => setCiphertext(playfairEncrypt(plaintext, key) ?? '')}>
          Encrypt
        </Button>
        <Button
          onClick={() => setPlaintext(playfairDecrypt(ciphertext, key) ?? '')}>
          Decrypt
        </Button>
      </div>
    </div>
  )
}
