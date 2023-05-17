import {IEventHandler} from './types'
import {useEffect} from 'react'

export const useOnEscape = (handler: IEventHandler) => {
  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if(ev.key == 'Escape'){
        handler(ev)
      }
    }

    document.addEventListener('keyup', listener)
    return () => {
      document.removeEventListener('keyup', listener)
    }
  }, [handler])
}