import MaterialIcon from './MaterialIcon'

type GoldBadgeProps = {
  label: string
  icon?: string
}

// The elite/top-tier verification badge — distinct from StatusPill's verified/pending/flagged states.
// Seen on the landing hero card, public proof page ("GOLD VERIFIED"), and leaderboard.
export default function GoldBadge({
  label,
  icon = 'verified_user',
}: GoldBadgeProps) {
  return (
    <div className="bg-gold/10 border-gold flex items-center gap-1.5 rounded-full border px-3 py-1">
      <MaterialIcon name={icon} filled className="text-on-gold text-[16px]" />
      <span className="text-label-sm font-label-sm text-on-gold">{label}</span>
    </div>
  )
}
