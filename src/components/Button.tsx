import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'onPrimary' | 'onPrimaryOutline'
type ButtonSize = 'md' | 'lg'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-8 py-4',
  lg: 'px-10 py-5',
}

// DESIGN.md: Primary = solid Forest Green, Secondary = ghost Ocean Blue.
// onPrimary/onPrimaryOutline cover CTA buttons placed on a primary-colored section background.
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container',
  secondary: 'border border-secondary text-secondary hover:bg-secondary/5',
  onPrimary: 'bg-on-primary text-primary hover:bg-primary-fixed',
  onPrimaryOutline: 'border border-on-primary/30 text-on-primary hover:bg-white/10',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  type = 'button',
  disabled,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const classes = `rounded-xl font-label-md text-label-md transition-all active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
