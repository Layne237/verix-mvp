import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface LeaderboardEntry {
  rank: number
  user: {
    name: string | null
    avatar_url: string | null
  }
  totalProofs: number
  verifiedProofs: number
  averageScore: number
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Proofs</TableHead>
          <TableHead className="text-right">Verified</TableHead>
          <TableHead className="text-right">Avg. Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.rank}>
            <TableCell className="font-medium">
              {entry.rank <= 3 ? (
                <Badge variant={entry.rank === 1 ? 'default' : 'secondary'}>
                  #{entry.rank}
                </Badge>
              ) : (
                `#${entry.rank}`
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.user.avatar_url || ''} />
                  <AvatarFallback>
                    {entry.user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.user.name || 'Anonymous'}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">{entry.totalProofs}</TableCell>
            <TableCell className="text-right">{entry.verifiedProofs}</TableCell>
            <TableCell className="text-right">
              {entry.averageScore > 0 ? `${entry.averageScore}%` : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
