import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from './MaterialIcon'

const PLACEHOLDER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD0HAeOrkduHd8GFn1ofAoVDS2rZxQ_AeFZmKzmaQEkeNtSrnOrzr20CfEaopVHIJGi0bwtqheajlUA2CCOxvj3zZhPO4-Pognz1f9Q9KSc60EnJwGlu6f2tng9u9k_uTxMHfPpFPJFijFyXEyE_9bO2_FoHhyq_gKGmMl5_wzN6L9rpTBqyEGp-Y1rmqOqsRIq17IaeoH00Kqs1EKCF6jhtn_FKD6d5pu0ETu49kxq8Xnc7rtmK1NV-p-FeEukbw3pY6HJlv9EYkRs'

type HeaderProps = {
  avatarUrl?: string
}

export default function Header({ avatarUrl = PLACEHOLDER_AVATAR }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant transition-shadow ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <Link to="/" className="flex items-center gap-2">
          <MaterialIcon name="verified" filled className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/leaderboard"
            className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors hidden md:block"
          >
            Leaderboard
          </Link>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" alt="Signed-in user avatar" src={avatarUrl} />
          </div>
        </div>
      </div>
    </header>
  )
}
