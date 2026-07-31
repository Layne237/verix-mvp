import { DashboardSkeleton } from '@/components/ui/Skeleton'

// Next.js renders this automatically while the async DashboardPage server
// component (and its Supabase queries) resolve - e.g. on client-side
// navigation to /dashboard. There's no in-component "loading" state to key
// off directly since stats/proofs are fetched server-side before the page
// itself ever renders.
export default function DashboardLoading() {
  return <DashboardSkeleton />
}
