import { useState } from 'react'
import MaterialIcon from '../../components/MaterialIcon'
import ToggleSwitch from '../../components/ToggleSwitch'

type SaveState = 'idle' | 'saving' | 'saved'

function SettingsHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-surface border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-3">
          <MaterialIcon name="verified" className="text-primary text-[28px]" />
          <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors">
              Impact
            </a>
            <a href="#" className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors">
              Explore
            </a>
            <span className="text-label-md font-label-md text-primary font-bold">Profile</span>
          </nav>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Your profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYDh0se0p6egi_0egPm5gukMDpskfb3oq8IGqn82qDi5GjVjRSNoqKJvaVjY6fEHSiIJgjvFdebJrfQq6PEKQ6JGWNMsrcLEQ2Zb7v-PRpzqkZPQjcjmJDQ7q3fHC2f7nlICcVcJQS_5JeeF3bbjQfQv2H2TdoIop9A7Hw_h755Rzkr0oqmbO53cxRgxHPOJ2_ebvMUNFG4aHfQBoZe_r0KIZGEpmh3PbhJb2EwtkIY53SWW3lO5zUEEeM_gqEylCM_XeryLQqMz7b"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('Alexander Verity')
  const [bio, setBio] = useState('Environmental verification specialist focused on carbon credit transparency and civic auditing since 2021.')
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(false)
  const [anonymousByDefault, setAnonymousByDefault] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  function handleSave() {
    setSaveState('saving')
    // TODO: PATCH the profile endpoint once the Backend APIs lead ships it.
    setTimeout(() => {
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2000)
    }, 1000)
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <SettingsHeader />

      <main className="flex-grow pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">Profile Settings</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Manage your institutional identity and verification preferences.</p>
        </div>

        <div className="space-y-gutter">
          <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Current profile picture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByiqZuavEuvqGDAOwBa6tdMMyiDd9-2LMRk5fc5PAEKjwFYU19mc4iTUfXDEqOOnm4Vw7gRsTfQUPwpbni9iLcNPnNqK2Ug7AQoyA2s95UXyurGULLmrv4mfcW3mmSodstfJ9w8IVj9ocunVKa1mt0V8mpaqtNVOe_fdmZ3AkcvXywD3cLN9Mk10t_4u86155FUjeTviUYrJsHezikVqvOJHVvbXHMvDdZwoDUawKA5HelflxCI5RJdnIpbexgrRE7ASn2W11Ub9eK"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:bg-primary-container transition-all"
                >
                  <MaterialIcon name="edit" className="text-[18px]" />
                </button>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h3 className="text-headline-md font-headline-md text-on-surface">Your Identity</h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-4">Verification tiers are higher with a complete profile.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <button type="button" className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:opacity-90 transition-all">
                    Upload New
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-label-md font-label-md hover:bg-surface-container-low transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label htmlFor="display-name" className="text-label-md font-label-md text-on-surface">
                  Display Name
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-label-md font-label-md text-on-surface">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Briefly describe your focus on civic impact..."
                  className="w-full px-4 py-3 rounded-xl border border-outline text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface transition-all resize-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-6">Transparency Controls</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div className="max-w-[80%]">
                  <p className="text-label-md font-label-md text-on-surface">Show me on the public leaderboard</p>
                  <p className="text-body-md font-body-md text-on-surface-variant">Allow your impact score to be visible to the Verix community.</p>
                </div>
                <ToggleSwitch checked={showOnLeaderboard} onChange={setShowOnLeaderboard} />
              </div>

              <div className="pt-6 border-t border-outline-variant">
                <h4 className="text-label-md font-label-md text-on-surface mb-4">Anonymity Preferences</h4>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={anonymousByDefault}
                      onChange={(event) => setAnonymousByDefault(event.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-outline checked:bg-primary checked:border-primary transition-all"
                    />
                    <MaterialIcon
                      name="check"
                      className="absolute text-white opacity-0 peer-checked:opacity-100 text-[16px] pointer-events-none left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="select-none">
                    <p className="text-body-md font-body-md text-on-surface group-hover:text-primary transition-colors">
                      Submit proofs anonymously by default
                    </p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Your identity will be hidden from the public impact log even for verified claims.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-low p-6 rounded-xl border border-error/20">
            <h3 className="text-label-md font-label-md text-error mb-4 flex items-center gap-2">
              <MaterialIcon name="warning" className="text-[20px]" />
              Danger Zone
            </h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-body-md font-body-md text-on-surface-variant">
                Permanently delete your account and all associated verification history. This action cannot be undone.
              </p>
              <button type="button" className="text-error font-bold text-label-md hover:underline transition-all flex items-center gap-1 whitespace-nowrap">
                Delete Account
              </button>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === 'saving'}
              className={`px-8 py-3 rounded-xl font-bold text-label-md transition-all shadow-sm active:scale-[0.98] flex items-center gap-2 disabled:opacity-80 ${
                saveState === 'saved' ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
            >
              {saveState === 'saving' && <MaterialIcon name="sync" className="animate-spin" />}
              {saveState === 'saved' && <MaterialIcon name="done" />}
              {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved!' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon name="verified" className="text-primary text-[24px]" />
              <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              © 2026 Verix. Dedicated to institutional transparency and civic duty.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between">
            <div className="flex gap-8 mb-8 md:mb-0">
              <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
                About
              </a>
              <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
                Submit
              </a>
              <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
                Leaderboard
              </a>
            </div>
            <div className="flex gap-4">
              <MaterialIcon name="share" className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
              <MaterialIcon name="policy" className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
