'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { UserAvatar } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/useToast'
import type { Profile } from '@/types'

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-lg border bg-muted/40"
        />
      ))}
    </div>
  )
}

export default function SettingsPage() {
  const toast = useToast()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [displayName, setDisplayName] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  const [showOnLeaderboard, setShowOnLeaderboard] = useState(false)
  const [savingPrivacy, setSavingPrivacy] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile')
        const body = await res.json()

        if (!res.ok) throw new Error(body.error || 'Failed to load profile')

        const data: Profile = body.data
        setProfile(data)
        setDisplayName(data.display_name || data.name || '')
        setShowOnLeaderboard(data.show_on_leaderboard)
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Failed to load profile'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  async function saveProfile() {
    setSavingProfile(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName }),
      })
      const body = await res.json()

      if (!res.ok) throw new Error(body.error || 'Failed to save profile')

      toast.success('Profile updated')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save profile'
      )
    } finally {
      setSavingProfile(false)
    }
  }

  async function savePrivacy(nextValue: boolean) {
    setShowOnLeaderboard(nextValue)
    setSavingPrivacy(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showOnLeaderboard: nextValue }),
      })
      const body = await res.json()

      if (!res.ok) throw new Error(body.error || 'Failed to save preference')

      toast.success(
        nextValue
          ? "You're now visible on the leaderboard"
          : 'Hidden from the leaderboard'
      )
    } catch (error) {
      setShowOnLeaderboard(!nextValue) // revert the optimistic toggle
      toast.error(
        error instanceof Error ? error.message : 'Failed to save preference'
      )
    } finally {
      setSavingPrivacy(false)
    }
  }

  async function deleteAccount() {
    setDeleting(true)
    try {
      const res = await fetch('/api/profile', { method: 'DELETE' })
      const body = await res.json()

      if (!res.ok) throw new Error(body.error || 'Failed to delete account')

      toast.success('Account deleted')
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete account'
      )
      setDeleting(false)
      setDeleteOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and account preferences
          </p>
        </div>
        <SettingsSkeleton />
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {loadError}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How your name appears across Verix</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={profile?.display_name || profile?.name}
              image={profile?.avatar_url}
              size="lg"
            />
            <p className="text-sm text-muted-foreground">
              {profile?.display_name || profile?.name || 'Anonymous'}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <Button
            onClick={saveProfile}
            disabled={savingProfile || !displayName.trim()}
          >
            {savingProfile ? 'Saving...' : 'Save'}
          </Button>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
          <CardDescription>Control what other people can see</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Show on Leaderboard</p>
              <p className="text-sm text-muted-foreground">
                Allow your verified impact score to be visible to the Verix
                community. Turn this off to keep your activity private.
              </p>
            </div>
            <Switch
              checked={showOnLeaderboard}
              onCheckedChange={savePrivacy}
              disabled={savingPrivacy}
              aria-label="Show on leaderboard"
            />
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email || ''} readOnly disabled />
          </div>

          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm font-semibold text-destructive">
              Danger Zone
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Permanently delete your account and all associated proofs. This
              action cannot be undone.
            </p>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="mt-4">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete your account?</DialogTitle>
                  <DialogDescription>
                    This permanently deletes your account, profile, and every
                    proof you&apos;ve submitted. This cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteOpen(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={deleteAccount}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting...' : 'Delete Account'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
