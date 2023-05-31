import { RefObject, useEffect } from 'react'

type IEventHandler = (ev: UIEvent) => any

export const useOnClickOutside = (
    refs: RefObject<HTMLElement | null>[],
    handler: IEventHandler,
) => {
    useEffect(() => {
        const listener = (event: UIEvent) => {
            const clickedRef = refs?.find(
                ref => !ref.current || ref.current.contains(event.target as HTMLElement),
            )
            if (clickedRef) {
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

export const useOnResize = (handler: IEventHandler) => {
    useEffect(() => {
        window.addEventListener('resize', handler)
        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [handler])
}

export const useOnEscape = (handler: IEventHandler) => {
    useEffect(() => {
        const listener = (ev: KeyboardEvent) => {
            if (ev.key == 'Escape') {
                handler(ev)
            }
        }

        document.addEventListener('keyup', listener)
        return () => {
            document.removeEventListener('keyup', listener)
        }
    }, [handler])
}
