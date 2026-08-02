import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const

interface UserAvatarProps {
  /** Display name - first letter is used for the initials fallback. */
  name?: string | null
  /** Profile image URL, e.g. session.user.image or profiles.avatar_url. */
  image?: string | null
  size?: keyof typeof avatarSizes
  className?: string
}

/**
 * Convenience wrapper around Avatar/AvatarImage/AvatarFallback for the
 * common "show this user's picture" case: falls back to their initial, and
 * to a generic user icon if there's no name either.
 */
function UserAvatar({ name, image, size = 'md', className }: UserAvatarProps) {
  const initial = name?.trim().charAt(0).toUpperCase()

  return (
    <Avatar className={cn(avatarSizes[size], className)}>
      {image && <AvatarImage src={image} alt={name || 'User avatar'} />}
      <AvatarFallback>
        {initial || <User className="h-1/2 w-1/2 text-muted-foreground" />}
      </AvatarFallback>
    </Avatar>
  )
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar }
