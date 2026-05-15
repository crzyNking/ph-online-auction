import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { formatDistanceToNow } from '@/lib/utils'

interface CountdownTimerProps {
  endTime: string
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

export default function CountdownTimer({ endTime, size = 'medium', showLabel = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(endTime).getTime() - Date.now()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  if (timeLeft.expired) {
    return (
      <span className={getSizeClasses(size, 'text-red-500 font-bold')}>
        Ended
      </span>
    )
  }

  const isUrgent = timeLeft.hours < 1
  const colorClass = isUrgent ? 'text-red-500' : 'text-gray-700'

  return (
    <div className={`flex items-center gap-1 ${colorClass} font-display`}>
      <Clock className={getIconSize(size)} />
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <span className={getSizeClasses(size, '')}>{timeLeft.days}d</span>
            <span className={getSeparatorSize(size)}>:</span>
          </>
        )}
        <span className={getSizeClasses(size, '')}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className={getSeparatorSize(size)}>:</span>
        <span className={getSizeClasses(size, '')}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className={getSeparatorSize(size)}>:</span>
        <span className={`${getSizeClasses(size, '')} ${isUrgent ? 'animate-pulse' : ''}`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
      {showLabel && <span className="text-xs text-gray-500 ml-1">left</span>}
    </div>
  )
}

function getSizeClasses(size: string, extra: string) {
  switch (size) {
    case 'small':
      return `text-xs ${extra}`
    case 'large':
      return `text-2xl font-bold ${extra}`
    default:
      return `text-sm font-semibold ${extra}`
  }
}

function getIconSize(size: string) {
  switch (size) {
    case 'small':
      return 'w-3 h-3'
    case 'large':
      return 'w-6 h-6'
    default:
      return 'w-4 h-4'
  }
}

function getSeparatorSize(size: string) {
  switch (size) {
    case 'small':
      return 'text-xs'
    case 'large':
      return 'text-xl'
    default:
      return 'text-sm'
  }
}