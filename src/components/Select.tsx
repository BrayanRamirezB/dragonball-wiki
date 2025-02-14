import React, { useState } from 'react'

interface SelectFilterProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  isDisabled?: boolean
  variant?: 'default' | 'bordered' | 'light'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  value,
  onChange,
  placeholder,
  variant = 'default',
  color = 'default',
  rounded = 'md',
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleTriggerClick = () => {
    if (isDisabled) return

    setIsOpen(!isOpen)
  }

  const variants = {
    default: 'border-0 backdrop-blur-sm shadow-md',
    bordered: 'border border-current shadow-md',
    light: 'border-b border-current'
  }

  const colors = {
    default: 'bg-zinc-700/30',
    primary: 'bg-blue-500/20 ',
    secondary: 'bg-indigo-500/20 ',
    success: 'bg-green-500/30 ',
    warning: 'bg-yellow-500/20 ',
    danger: 'bg-red-500/20 '
  }

  const textColors = {
    default: 'text-gray-300',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  return (
    <div className='relative'>
      <select
        className={`appearance-none focus:outline-none transition p-2 border rounded-md w-[237px]  ${
          variants[variant]
        } ${variant === 'default' && colors[color]} ${textColors[color]} ${
          variant !== 'light' && roundeds[rounded]
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsOpen(false)} // Detecta cuando se cierra el select
        onClick={handleTriggerClick}
      >
        <option value='' className='backdrop-blur-sm bg-zinc-700 text-gray-300'>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className='backdrop-blur-sm bg-zinc-700 text-gray-300'
          >
            {option}
          </option>
        ))}
      </select>
      <svg
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none size-4 transition-transform duration-300 ${
          textColors[color]
        } ${isOpen ? 'rotate-180' : ''}`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </div>
  )
}

export default SelectFilter
