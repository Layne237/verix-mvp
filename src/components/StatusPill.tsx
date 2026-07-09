import MaterialIcon from './MaterialIcon'

type Status = 'verified' | 'pending' | 'flagged'

// Matches the status pill styling used consistently in user_dashboard/code.html
const statusConfig: Record<Status, { icon: string; label: string; classes: string }> = {
  verified: { icon: 'check_circle', label: 'Verified', classes: 'bg-primary/10 text-primary border-primary/20' },
  pending: { icon: 'schedule', label: 'Pending', classes: 'bg-secondary/10 text-secondary border-secondary/20' },
  flagged: { icon: 'error', label: 'Flagged', classes: 'bg-error/10 text-error border-error/20' },
}

type StatusPillProps = {
  status: Status
  label?: string
}

export default function StatusPill({ status, label }: StatusPillProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${config.classes}`}
    >
      <MaterialIcon name={config.icon} filled className="text-[12px]" />
      {label ?? config.label}
    </span>
  )
}
