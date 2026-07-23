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
const accentClasses: Record<
  Accent,
  { badge: string; label: string; bar: string }
> = {
  primary: {
    badge: 'bg-primary/10 text-primary',
    label: 'text-primary',
    bar: 'bg-primary',
  },
  secondary: {
    badge: 'bg-secondary/10 text-secondary',
    label: 'text-secondary',
    bar: 'bg-secondary',
  },
  tertiary: {
    badge: 'bg-tertiary/10 text-tertiary',
    label: 'text-tertiary',
    bar: 'bg-tertiary',
  },
}

const HONORABLE_MENTIONS: {
  label: string
  title: string
  description: string
  icon: string
  accent: Accent
  percent: number
}[] = [
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
    <header className="bg-surface border-outline-variant sticky top-0 z-50 border-b">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <MaterialIcon name="verified" filled className="text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            Verix
          </span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary-container font-label-md text-label-md transition-colors"
          >
            About
          </a>
          <Link
            to="/submit-proof"
            className="text-on-surface-variant hover:text-primary-container font-label-md text-label-md transition-colors"
          >
            Submit
          </Link>
          <span className="font-label-md text-label-md font-bold text-primary">
            Leaderboard
          </span>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <MaterialIcon name="search" />
          </button>
          <div className="border-outline-variant h-8 w-8 overflow-hidden rounded-full border">
            <img
              className="h-full w-full object-cover"
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
    <div className="text-on-background flex min-h-screen flex-col bg-background">
      <LeaderboardHeader />

      <main className="max-w-container-max px-margin-mobile md:px-margin-desktop mx-auto w-full flex-grow py-12">
        <div className="mb-12 max-w-3xl text-center md:text-left">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">
            Top Impact Contributors
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Recognizing those leading the way in verifiable global impact
            through transparent reporting and rigorous civic duty.
          </p>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="border-outline-variant flex items-center gap-2 rounded-xl border bg-white/70 px-4 py-2 backdrop-blur-md">
            <span className="text-label-md font-label-md text-on-surface-variant">
              Privacy Settings
            </span>
            <div className="bg-outline-variant mx-2 h-4 w-px" />
            <ToggleSwitch
              checked={showOnLeaderboard}
              onChange={setShowOnLeaderboard}
              label="Show me on leaderboard"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="border-outline-variant hover:bg-surface-container text-label-md font-label-md flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
            >
              <MaterialIcon name="filter_list" className="text-sm" />
              All Time
            </button>
            <button
              type="button"
              className="border-outline-variant hover:bg-surface-container text-label-md font-label-md flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
            >
              <MaterialIcon name="download" className="text-sm" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border-outline-variant overflow-hidden overflow-x-auto rounded-xl border">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low border-outline-variant border-b">
                <th className="text-label-md font-label-md text-on-surface-variant px-6 py-4 uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-label-md font-label-md text-on-surface-variant px-6 py-4 uppercase tracking-wider">
                  Contributor
                </th>
                <th className="text-label-md font-label-md text-on-surface-variant px-6 py-4 text-center uppercase tracking-wider">
                  Verified Proofs
                </th>
                <th className="text-label-md font-label-md text-on-surface-variant px-6 py-4 text-right uppercase tracking-wider">
                  Average Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-outline-variant divide-y">
              {CONTRIBUTORS.map((contributor) => (
                <tr
                  key={contributor.rank}
                  onClick={() => setSelectedRank(contributor.rank)}
                  className={`hover:bg-surface-container-low cursor-pointer transition-colors ${
                    selectedRank === contributor.rank
                      ? 'bg-surface-container'
                      : ''
                  }`}
                >
                  <td className="px-6 py-6">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border font-bold ${
                        contributor.medal
                          ? medalClasses[contributor.medal]
                          : 'bg-surface-container-high text-on-surface-variant border-transparent font-medium'
                      }`}
                    >
                      {contributor.rank}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        className="border-outline-variant h-10 w-10 rounded-full border object-cover"
                        alt={contributor.name}
                        src={contributor.avatar}
                      />
                      <div>
                        <p className="text-on-surface font-bold">
                          {contributor.name}
                        </p>
                        <p className="text-label-sm font-label-sm text-on-surface-variant">
                          {contributor.org}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-label-sm font-label-sm rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                      {contributor.proofs.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right font-bold text-primary">
                    {contributor.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between px-2">
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            Showing 5 of 1,248 contributors
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="border-outline-variant hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-lg border transition-colors disabled:opacity-50"
            >
              <MaterialIcon name="chevron_left" />
            </button>
            <div className="flex gap-1">
              <button
                type="button"
                className="text-on-primary h-10 w-10 rounded-lg bg-primary font-bold"
              >
                1
              </button>
              <button
                type="button"
                className="border-outline-variant hover:bg-surface-container h-10 w-10 rounded-lg border font-medium transition-colors"
              >
                2
              </button>
              <button
                type="button"
                className="border-outline-variant hover:bg-surface-container h-10 w-10 rounded-lg border font-medium transition-colors"
              >
                3
              </button>
              <span className="flex h-10 w-10 items-center justify-center">
                ...
              </span>
            </div>
            <button
              type="button"
              className="border-outline-variant hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
            >
              <MaterialIcon name="chevron_right" />
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-headline-md font-headline-md mb-8">
            Honorable Mentions
          </h2>
          <div className="gap-gutter grid grid-cols-1 md:grid-cols-3">
            {HONORABLE_MENTIONS.map((mention) => {
              const classes = accentClasses[mention.accent]
              return (
                <div
                  key={mention.title}
                  className="bg-surface-container border-outline-variant relative overflow-hidden rounded-xl border p-6"
                >
                  <div
                    className={`absolute right-4 top-4 rounded-full p-2 ${classes.badge}`}
                  >
                    <MaterialIcon
                      name={mention.icon}
                      filled
                      className="text-sm"
                    />
                  </div>
                  <p
                    className={`text-label-sm font-label-sm mb-2 uppercase tracking-widest ${classes.label}`}
                  >
                    {mention.label}
                  </p>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-1">
                    {mention.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant mb-4">
                    {mention.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-outline-variant h-1 flex-grow overflow-hidden rounded-full">
                      <div
                        className={`h-full ${classes.bar}`}
                        style={{ width: `${mention.percent}%` }}
                      />
                    </div>
                    <span className="text-label-sm font-label-sm text-on-surface font-bold">
                      {mention.percent}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-outline-variant mt-16 border-t">
        <div className="gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 py-12 md:grid-cols-2">
          <div>
            <span className="text-headline-md font-headline-md mb-4 block font-bold text-primary">
              Verix
            </span>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              © 2026 Verix. Dedicated to institutional transparency and civic
              duty. Leveraging AI for a verifiable future.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex gap-8">
              <a
                href="#"
                className="text-on-tertiary-fixed-variant text-label-md font-label-md transition-colors hover:text-secondary"
              >
                About
              </a>
              <Link
                to="/submit-proof"
                className="text-on-tertiary-fixed-variant text-label-md font-label-md transition-colors hover:text-secondary"
              >
                Submit
              </Link>
              <span className="text-label-md font-label-md text-primary underline">
                Leaderboard
              </span>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="border-outline-variant flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:bg-primary/5"
              >
                <MaterialIcon
                  name="language"
                  className="text-on-surface-variant"
                />
              </a>
              <a
                href="#"
                className="border-outline-variant flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:bg-primary/5"
              >
                <MaterialIcon
                  name="shield"
                  className="text-on-surface-variant"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
