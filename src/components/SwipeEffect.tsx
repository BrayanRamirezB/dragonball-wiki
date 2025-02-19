import { useEffect, useState, type CSSProperties } from 'react'

interface SwipeCardProps {
  leftPageUrl?: string
  rightPageUrl?: string
  children: React.ReactNode
}

const SwipeEffect = ({
  leftPageUrl,
  rightPageUrl,
  children
}: SwipeCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Esperar a la hidratación
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const MAX_ROTATION = 45
  const SWIPE_THRESHOLD = 180
  const ANIMATION_DURATION = 300

  const handleStart = (clientX: number) => {
    setStartX(clientX)
    setIsDragging(true)
  }

  const handleMove = (clientX: number) => {
    if (!isHydrated) return
    const delta = clientX - startX
    setCurrentPosition(delta)
  }

  const handleSwipeAction = (direction: 'left' | 'right') => {
    if (!isHydrated) return

    setIsExiting(true)
    const exitPosition =
      direction === 'right' ? window.innerWidth : -window.innerWidth
    setCurrentPosition(exitPosition)

    setTimeout(() => {
      if (direction === 'right' && rightPageUrl) {
        window.location.href = rightPageUrl
      } else if (direction === 'left' && leftPageUrl) {
        window.location.href = leftPageUrl
      }
    }, ANIMATION_DURATION)
  }

  const handleEnd = () => {
    if (!isHydrated) return

    if (Math.abs(currentPosition) > SWIPE_THRESHOLD) {
      handleSwipeAction(currentPosition > 0 ? 'right' : 'left')
    } else {
      setIsDragging(false)
      setCurrentPosition(0)
    }
  }

  const getCardStyle = (): CSSProperties => {
    if (!isHydrated) return { opacity: 0 }

    const rotation = (currentPosition / window.innerWidth) * MAX_ROTATION
    const opacity = 1 - Math.abs(currentPosition) / window.innerWidth
    const scale = 1 - Math.abs(currentPosition) / 2000

    return {
      transform: `translateX(${currentPosition}px) 
                  rotate(${rotation}deg)
                  scale(${scale})`,
      opacity: isExiting ? 0 : opacity,
      transition: isDragging ? 'none' : `all ${ANIMATION_DURATION}ms ease-out`,
      cursor: isDragging ? 'grabbing' : 'grab'
    }
  }

  return (
    <div
      className='w-full h-full select-none'
      onTouchStart={(e) => {
        handleStart(e.touches[0].clientX)
      }}
      onTouchMove={(e) => {
        handleMove(e.touches[0].clientX)
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        handleEnd()
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        handleStart(e.clientX)
      }}
      onMouseMove={(e) => {
        e.preventDefault()
        if (isDragging) handleMove(e.clientX)
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        handleEnd()
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        handleEnd()
      }}
    >
      <div className='relative' style={getCardStyle()}>
        {children}
      </div>
    </div>
  )
}

export default SwipeEffect
