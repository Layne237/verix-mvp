import type { ReactNode } from 'react'

type ToggleSwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <div className="bg-surface-container-high peer h-6 w-11 rounded-full after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
      {label && (
        <span className="text-label-md font-label-md text-on-surface ml-3">
          {label}
        </span>
      )}
    </label>
  )
}
