import { useState } from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from '../../components/MaterialIcon'
import ToggleSwitch from '../../components/ToggleSwitch'

type Medal = 'gold' | 'silver' | 'bronze'

type Contributor = {
  rank: number
  name: string
  org: string
  avatar: string
  proofs: number
  score: number
  medal?: Medal
}

const medalClasses: Record<Medal, string> = {
  gold: 'bg-[#FFD700]/10 border-[#FFD700]/50 text-[#B8860B]',
  silver: 'bg-[#C0C0C0]/10 border-[#C0C0C0]/50 text-[#708090]',
  bronze: 'bg-[#CD7F32]/10 border-[#CD7F32]/50 text-[#8B4513]',
}

const CONTRIBUTORS: Contributor[] = [
  {
    rank: 1,
    name: 'Eleanor Vance',
    org: 'Oxford Research Initiative',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGn9EVakqHPJRn1f9zBqMDGuXAFOSZOlEY_fIlizUU4JlulS8mz49PXK13vBurbSUqxMfPbJF2SKGHOTJv9Q3t1Ok-ErIoJdO_Yl1byJAyHdawv_ZsJwDIajGUwFJMWS7DqMHRyL3jZLK6kznyG13J3IXm-4Kq2XA1aLAQekwycs1vxirVc82rVTG1hu90fPFaU4EZaOceRK9MP-tgy9ZtA2acBlndOP4six1uoAV14wnIJwzRySsjIHdgY-qN7nFXGz5t_CH9l-Ii',
    proofs: 1284,
    score: 98.4,
    medal: 'gold',
  },
  {
    rank: 2,
    name: 'Dr. Marcus Thorne',
    org: 'Global Sustainability Lab',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChDRh7WMjhA5dxUJR7WLxhJF_ypdKlYMlfDdM7f2hN9QXQO3zIgA0S7Dp07mNuIE1afw2e_ivdka6A7mCq5CZ1Rrz-RAi9WcyRRXja19qL2A8Y0Hvaz20piSfcCVu_n3PYbCSj7I11lkqD13aQHujP6oCdPoWgS1HrFIbxZXPeLQULXQEgKHn5vfx5TSQrbQtSrnlT_Cxr1j2CKNnJFrW3ZZyaGgdFXvqnbSL02tO27E_bPXYkBi6YARsB5EvQ9N43XXZieitDnhP5',
    proofs: 1102,
    score: 97.1,
    medal: 'silver',
  },
  {
    rank: 3,
    name: 'Sarah Jenkins',
    org: 'Independent Verifier',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3puxkxb68CPGYet4yWsNduY-d8UYo-W_EdpcJUUUMPMyUk3j5JddYaHwTAd6j2Ymbg1jrguOGvtiB6Gl2R4fTpHXe_YYpmkdfJTV_OjtsOlJawmdd1GWyYwuf6E4kjzRu0eIABrXLWvbUKmWaqJVYo6UJcn5W-GzoaRX03c70I520q1v77YB_DPVx5xzAS_ay6Zsjn0Y7btj_N6qcPfdT6OCMSOJxnk08jnuHgxo-ckNEx3_2HJO3bNumpmEyrK-uhn5bG932UGDM',
    proofs: 956,
    score: 96.8,
    medal: 'bronze',
  },
  {
    rank: 4,
    name: 'Julian Rossi',
    org: 'Civic Data Foundation',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMry5JlOdOz5gNHiDyedmZ3funk3_Kqw80fEXO5WCUMQjmHykmOQNMqZvFbm0juqJ6v9G6APoaMfw0tSwjBkIJM686fS6VwYLMQQqIRqr5LxHTh4nFNk5tdDlBupJZwAwE1n-TiN18KJDpOqnbZDOLRZqdd7xO7-OaDNHYkszlzXLywPrMt-TOfNdJjAOtY_T3d1zGNGhmS2VBTXyHvP0Dk0NcV7F78wPZcLZJSXLtK26MZ_DAwE7i6elxWksvwl0bCFXI3syOLX5q',
    proofs: 842,
    score: 94.2,
  },
  {
    rank: 5,
    name: 'Amara Okafor',
    org: 'West African Impact Hub',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJWQrzen8dIPVwqyEmFVmJa-A3IRA_xWms4NoHoJpItql5jkoL_Og-73QhcR2isYjtg73ZSC1kwmhqzPC1O-pSaZgL87xn3Mm5sYdy1PYB5YV8w5YSequE26bZ6HoIaoIwpWomXd5dG8yGe53FQbwIIxnXvXGdM3Q_BV10ELoKFoziyBJpZtpSSn9IjZz-W7dRqpsaifMrx42R6n56aP5Zqae_jIN1abmiq2lnlclfO-P1Y8hDRIrh_9uVR2iAy_pViuCmWFy2YnY1',
    proofs: 791,
    score: 93.9,
  },
]

type Accent = 'primary' | 'secondary' | 'tertiary'

// Tailwind can't see classes built by string interpolation (e.g. `bg-${accent}`), so
// each accent's full class set is spelled out statically here.
const accentClasses: Record<Accent, { badge: string; label: string; bar: string }> = {
  primary: { badge: 'bg-primary/10 text-primary', label: 'text-primary', bar: 'bg-primary' },
  secondary: { badge: 'bg-secondary/10 text-secondary', label: 'text-secondary', bar: 'bg-secondary' },
  tertiary: { badge: 'bg-tertiary/10 text-tertiary', label: 'text-tertiary', bar: 'bg-tertiary' },
}

const HONORABLE_MENTIONS: { label: string; title: string; description: string; icon: string; accent: Accent; percent: number }[] = [
  {
    label: 'Fastest Grower',
    title: 'EcoWatch AI',
    description: '+240% proofs this month',
    icon: 'trending_up',
    accent: 'primary',
    percent: 75,
  },
  {
    label: 'Perfect Verifier',
    title: 'OpenCivic',
    description: '100/100 Accuracy Score',
    icon: 'stars',
    accent: 'secondary',
    percent: 100,
  },
  {
    label: 'Community MVP',
    title: 'RuralLink Net',
    description: 'Largest geographic reach',
    icon: 'public',
    accent: 'tertiary',
    percent: 50,
  },
]

function LeaderboardHeader() {
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-2">
          <MaterialIcon name="verified" filled className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-on-surface-variant hover:text-primary-container transition-colors font-label-md text-label-md">
            About
          </a>
          <Link to="/submit-proof" className="text-on-surface-variant hover:text-primary-container transition-colors font-label-md text-label-md">
            Submit
          </Link>
          <span className="text-primary font-bold font-label-md text-label-md">Leaderboard</span>
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" className="text-on-surface-variant hover:text-primary transition-colors">
            <MaterialIcon name="search" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              className="w-full h-full object-cover"
              alt="Signed-in user avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-PqNWxuy8GXNOwqfrNZarNLuWzTN3fM0p-ukusmydKE5Y3dzrdkAAsp68Wb4Hl8RD4xfjXE_HAf4l7ln5KERimAmUBh5DWX-PE5l35VegofRtVNajwxDmohroXNU5tdy_yJmAhnX3U_wkgl9haGnX9a9vHrIq81Y4I8_lhhfnzRwo6JQdhzV7t6GT0bOmJlgokLnt21E5CbYyHX8Mne6TlzH5Xz0GLpqXgxyv2i6UHGOIewndPzC_OLJE4xZrCDb9JX-ytMaIDUwd"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default function PublicLeaderboardPage() {
  const [selectedRank, setSelectedRank] = useState<number | null>(null)
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true)

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <LeaderboardHeader />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="mb-12 text-center md:text-left max-w-3xl">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-2 text-on-surface">Top Impact Contributors</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Recognizing those leading the way in verifiable global impact through transparent reporting and rigorous civic duty.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-outline-variant px-4 py-2 rounded-xl">
            <span className="text-label-md font-label-md text-on-surface-variant">Privacy Settings</span>
            <div className="h-4 w-px bg-outline-variant mx-2" />
            <ToggleSwitch checked={showOnLeaderboard} onChange={setShowOnLeaderboard} label="Show me on leaderboard" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-label-md font-label-md"
            >
              <MaterialIcon name="filter_list" className="text-sm" />
              All Time
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-label-md font-label-md"
            >
              <MaterialIcon name="download" className="text-sm" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Contributor</th>
                <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-center">
                  Verified Proofs
                </th>
                <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">
                  Average Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {CONTRIBUTORS.map((contributor) => (
                <tr
                  key={contributor.rank}
                  onClick={() => setSelectedRank(contributor.rank)}
                  className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                    selectedRank === contributor.rank ? 'bg-surface-container' : ''
                  }`}
                >
                  <td className="px-6 py-6">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold border ${
                        contributor.medal ? medalClasses[contributor.medal] : 'bg-surface-container-high text-on-surface-variant border-transparent font-medium'
                      }`}
                    >
                      {contributor.rank}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                        alt={contributor.name}
                        src={contributor.avatar}
                      />
                      <div>
                        <p className="font-bold text-on-surface">{contributor.name}</p>
                        <p className="text-label-sm font-label-sm text-on-surface-variant">{contributor.org}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-label-sm font-label-sm">
                      {contributor.proofs.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right font-bold text-primary">{contributor.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between px-2">
          <p className="text-label-sm font-label-sm text-on-surface-variant">Showing 5 of 1,248 contributors</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              <MaterialIcon name="chevron_left" />
            </button>
            <div className="flex gap-1">
              <button type="button" className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold">
                1
              </button>
              <button type="button" className="w-10 h-10 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-medium">
                2
              </button>
              <button type="button" className="w-10 h-10 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-medium">
                3
              </button>
              <span className="flex items-center justify-center w-10 h-10">...</span>
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
            >
              <MaterialIcon name="chevron_right" />
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-headline-md font-headline-md mb-8">Honorable Mentions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {HONORABLE_MENTIONS.map((mention) => {
              const classes = accentClasses[mention.accent]
              return (
                <div key={mention.title} className="bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden">
                  <div className={`absolute top-4 right-4 rounded-full p-2 ${classes.badge}`}>
                    <MaterialIcon name={mention.icon} filled className="text-sm" />
                  </div>
                  <p className={`text-label-sm font-label-sm uppercase tracking-widest mb-2 ${classes.label}`}>{mention.label}</p>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-1">{mention.title}</h3>
                  <p className="text-body-md text-on-surface-variant mb-4">{mention.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-grow bg-outline-variant rounded-full overflow-hidden">
                      <div className={`h-full ${classes.bar}`} style={{ width: `${mention.percent}%` }} />
                    </div>
                    <span className="text-label-sm font-label-sm font-bold text-on-surface">{mention.percent}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div>
            <span className="text-headline-md font-headline-md font-bold text-primary block mb-4">Verix</span>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              © 2026 Verix. Dedicated to institutional transparency and civic duty. Leveraging AI for a verifiable future.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-8">
              <a href="#" className="text-on-tertiary-fixed-variant hover:text-secondary transition-colors text-label-md font-label-md">
                About
              </a>
              <Link to="/submit-proof" className="text-on-tertiary-fixed-variant hover:text-secondary transition-colors text-label-md font-label-md">
                Submit
              </Link>
              <span className="text-primary underline text-label-md font-label-md">Leaderboard</span>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-primary/5 transition-all"
              >
                <MaterialIcon name="language" className="text-on-surface-variant" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-primary/5 transition-all"
              >
                <MaterialIcon name="shield" className="text-on-surface-variant" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
