import './App.scss'
import {Playfair} from '@/components/Playfair'
import {Transposition} from '@/components/Transposition'
import {useStore} from '@/store/store'
import {Button} from '@/components/Button'
import {MusicControls} from '@/components/MusicControls'
import {useCallback, useEffect, useRef, useState} from 'react'

function App() {
  const [method, isPlayFair, switchMethod, reset] = useStore(state => [
    state.method,
    state.isPlayfair,
    state.switchMethod,
    state.reset,
  ])
  const [isPlayable, setIsPlayable] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const animate = (option: string) => {
    if (option === 'start') {
      ref.current?.classList.add('anim')
    }
    if (option === 'end') {
      ref.current?.classList.remove('anim')
    }
  }
  const play = useCallback(() => {
    if (isPlayable) {
      return
    } else {
      setIsPlayable(!isPlayable)
    }
  }, [isPlayable])

  useEffect(() => {
    const root = document.documentElement
    root.addEventListener('click', play)
  }, [play])

  return (
    <>
      <div
        onAnimationEnd={() => animate('end')}
        ref={ref}
        className='container main shadow anim'>
        <MusicControls isPlayable={isPlayable} />
        {!isPlayFair ? <Transposition /> : <Playfair />}
        <Button
          onClick={() => {
            switchMethod(isPlayFair)
            animate('start')
            reset()
          }}>
          {'Switch to ' + method}
        </Button>
      </div>
    </>
  )
}

export default App
