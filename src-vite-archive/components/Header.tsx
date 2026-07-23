import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from './MaterialIcon'

const PLACEHOLDER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD0HAeOrkduHd8GFn1ofAoVDS2rZxQ_AeFZmKzmaQEkeNtSrnOrzr20CfEaopVHIJGi0bwtqheajlUA2CCOxvj3zZhPO4-Pognz1f9Q9KSc60EnJwGlu6f2tng9u9k_uTxMHfPpFPJFijFyXEyE_9bO2_FoHhyq_gKGmMl5_wzN6L9rpTBqyEGp-Y1rmqOqsRIq17IaeoH00Kqs1EKCF6jhtn_FKD6d5pu0ETu49kxq8Xnc7rtmK1NV-p-FeEukbw3pY6HJlv9EYkRs'

type HeaderProps = {
  avatarUrl?: string
  showNav?: boolean
  // 'fixed' overlays page content (landing hero, public proof page) and needs the
  // caller to add matching top padding. 'sticky' occupies normal layout flow — the
  // safe default for app-shell pages (dashboard, submit-proof, etc).
  position?: 'fixed' | 'sticky'
}

export default function Header({
  avatarUrl = PLACEHOLDER_AVATAR,
  showNav = true,
  position = 'sticky',
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const positionClasses =
    position === 'fixed'
      ? 'fixed top-0 bg-surface/80 backdrop-blur-md'
      : 'sticky top-0 bg-surface'

  return (
    <header
      className={`${positionClasses} border-outline-variant z-50 w-full border-b transition-shadow ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex h-16 w-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MaterialIcon name="verified" filled className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            Verix
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {showNav && (
            <Link
              to="/leaderboard"
              className="text-label-md font-label-md text-on-surface-variant hidden transition-colors hover:text-primary md:block"
            >
              Leaderboard
            </Link>
          )}
          <div className="bg-surface-container-high border-outline-variant flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border">
            <img
              className="h-full w-full object-cover"
              alt="Signed-in user avatar"
              src={avatarUrl}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
