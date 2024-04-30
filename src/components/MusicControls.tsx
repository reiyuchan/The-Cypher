import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import {Disc3} from 'lucide-react'
import './MusicControls.scss'
import track from '/(NO COPYRIGHT) Soviet Connection (GTA IV theme) Extended.mp3'

interface MusicControlsProps {
  isPlayable?: boolean
}

export const MusicControls: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & MusicControlsProps
> = ({isPlayable}) => {
  const [muted, setMuted] = useState<boolean>(false)
  const ref = useRef<HTMLAudioElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const discIconRef = useRef<SVGSVGElement>(null)

  const mute = (option: boolean) => {
    if (ref.current && option === true) {
      ref.current.muted = true
      lineRef.current?.classList.add('line')
      setMuted(option)
    }
    if (ref.current && option === false) {
      ref.current.muted = false
      lineRef.current?.classList.remove('line')
      setMuted(option)
    }
  }

  const animation = (option: string) => {
    if (option === 'start') {
      discIconRef.current?.classList.add('anim')
    }
    if (option === 'end') {
      discIconRef.current?.classList.remove('anim')
    }
  }

  const handleVisibilityChange = () => {
    if (window.document.hidden) {
      ref.current?.pause()
    } else {
      ref.current?.play()
    }
  }

  useEffect(() => {
    if (ref.current && isPlayable) {
      ref.current.play()
      ref.current.loop = true
    }
    window.document.addEventListener('visibilitychange', handleVisibilityChange)
  }, [isPlayable])

  return (
    <>
      <audio ref={ref} src={track}></audio>
      <div className='controls' onClick={() => mute(!muted)}>
        <Disc3
          size={30}
          ref={discIconRef}
          onMouseEnter={() => animation('end')}
          onMouseLeave={() => animation('start')}
          aria-label='button'
          className='music anim'
        />
        <div ref={lineRef}></div>
      </div>
    </>
  )
}
