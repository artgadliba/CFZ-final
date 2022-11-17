import { useEffect, useLayoutEffect, useRef } from 'react'

function useEventListener(
  eventName,
  handler,
  element
) {
  const Effect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
  const savedHandler = useRef(handler)

  Effect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }
    const eventListener = event => savedHandler.current(event)
    targetElement.addEventListener(eventName, eventListener)
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
