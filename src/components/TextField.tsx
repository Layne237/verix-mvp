import type { InputHTMLAttributes, ReactNode } from 'react'
import MaterialIcon from './MaterialIcon'

type TextFieldProps = {
  id: string
  label: string
  labelRight?: ReactNode
  icon?: string
  rightElement?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>

// DESIGN.md: "Input Fields: 12px rounded corners, white background, with a 1px gray
// border that transitions to Primary Green on focus." Standardizes the icon-prefixed
// input styling that appeared with two slightly different treatments across the
// sign_in/sign_up Stitch mockups.
export default function TextField({ id, label, labelRight, icon, rightElement, className = '', ...inputProps }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-label-sm font-label-sm text-on-surface-variant ml-1">
          {label}
        </label>
        {labelRight}
      </div>
      <div className="relative">
        {icon && <MaterialIcon name={icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />}
        <input
          id={id}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant text-body-md font-body-md ${className}`}
          {...inputProps}
        />
        {rightElement && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>}
      </div>
    </div>
  )
}
