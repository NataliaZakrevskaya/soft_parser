import {IEventHandler} from './types'
import {RefObject, useEffect} from 'react'

export const useOnClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handler: IEventHandler,
) => {
  useEffect(() => {
    const listener = (event: UIEvent) => {
      const clickedRef = refs?.find(
        ref => !ref.current || ref.current.contains(event.target as HTMLElement),
      )
      if(clickedRef){
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}