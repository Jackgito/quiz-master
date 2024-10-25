import React, { useState, useEffect } from 'react'

const AnimatedTimerBar = ({
  time,
  height = '32px',
  backgroundColor = 'bg-gray-200',
  foregroundColor = 'bg-blue-500'
}) => {
  const [remainingTime, setRemainingTime] = useState(time)

  useEffect(() => {
    if (remainingTime <= 0) return

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 0.1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [remainingTime])

  const progress = (remainingTime / time) * 100

  return (
    <div
      className={`w-full ${height} ${backgroundColor} rounded-full overflow-hidden`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full ${foregroundColor} transition-all duration-100 ease-linear`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default AnimatedTimerBar