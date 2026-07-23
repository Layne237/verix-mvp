import { Link } from 'react-router-dom'
import MaterialIcon from './MaterialIcon'

export default function SubmitProofFab() {
  return (
    <Link
      to="/submit-proof"
      className="text-on-primary group fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:scale-110 active:scale-95 md:bottom-10 md:right-10"
    >
      <MaterialIcon name="add" className="text-[32px]" />
      <span className="bg-on-surface text-surface text-label-sm font-label-sm pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg px-4 py-2 opacity-0 transition-opacity group-hover:opacity-100">
        Submit Proof
      </span>
    </Link>
  )
}
