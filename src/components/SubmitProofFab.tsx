import { Link } from 'react-router-dom'
import MaterialIcon from './MaterialIcon'

export default function SubmitProofFab() {
  return (
    <Link
      to="/submit-proof"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
    >
      <MaterialIcon name="add" className="text-[32px]" />
      <span className="absolute right-full mr-4 px-4 py-2 bg-on-surface text-surface text-label-sm font-label-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Submit Proof
      </span>
    </Link>
  )
}
