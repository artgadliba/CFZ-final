import { useState, useEffect, useLayoutEffect } from 'react'
import useEventListener from 'hooks/useEventListener';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const Effect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)

  Effect(() => {
    handleSize()
  }, [])
  return windowSize
}

export default useWindowSize
