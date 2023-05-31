import {IEventHandler} from './types'
import {useEffect} from 'react'

export const useOnResize = (handler: IEventHandler) => {
  useEffect(() => {
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [handler])
}