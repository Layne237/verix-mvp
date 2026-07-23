import { useState } from 'react'
import MaterialIcon from '../../components/MaterialIcon'
import ToggleSwitch from '../../components/ToggleSwitch'

type SaveState = 'idle' | 'saving' | 'saved'

function SettingsHeader() {
  return (
    <header className="bg-surface border-outline-variant fixed top-0 z-50 w-full border-b">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <MaterialIcon name="verified" className="text-[28px] text-primary" />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            Verix
          </span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Impact
            </a>
            <a
              href="#"
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Explore
            </a>
            <span className="text-label-md font-label-md font-bold text-primary">
              Profile
            </span>
          </nav>
          <div className="bg-surface-container-high border-outline-variant flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border">
            <img
              className="h-full w-full object-cover"
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
  const [bio, setBio] = useState(
    'Environmental verification specialist focused on carbon credit transparency and civic auditing since 2021.'
  )
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
    <div className="text-on-background flex min-h-screen flex-col bg-background">
      <SettingsHeader />

      <main className="px-margin-mobile md:px-margin-desktop mx-auto w-full max-w-[800px] flex-grow pb-16 pt-24">
        <div className="mb-8">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">
            Profile Settings
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Manage your institutional identity and verification preferences.
          </p>
        </div>

        <div className="space-y-gutter">
          <section className="bg-surface-container-lowest border-outline-variant rounded-xl border p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="group relative">
                <div className="border-outline-variant bg-surface-container h-24 w-24 overflow-hidden rounded-full border-2">
                  <img
                    className="h-full w-full object-cover"
                    alt="Current profile picture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByiqZuavEuvqGDAOwBa6tdMMyiDd9-2LMRk5fc5PAEKjwFYU19mc4iTUfXDEqOOnm4Vw7gRsTfQUPwpbni9iLcNPnNqK2Ug7AQoyA2s95UXyurGULLmrv4mfcW3mmSodstfJ9w8IVj9ocunVKa1mt0V8mpaqtNVOe_fdmZ3AkcvXywD3cLN9Mk10t_4u86155FUjeTviUYrJsHezikVqvOJHVvbXHMvDdZwoDUawKA5HelflxCI5RJdnIpbexgrRE7ASn2W11Ub9eK"
                  />
                </div>
                <button
                  type="button"
                  className="text-on-primary hover:bg-primary-container absolute bottom-0 right-0 rounded-full bg-primary p-2 shadow-lg transition-all"
                >
                  <MaterialIcon name="edit" className="text-[18px]" />
                </button>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-headline-md font-headline-md text-on-surface">
                  Your Identity
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-4">
                  Verification tiers are higher with a complete profile.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <button
                    type="button"
                    className="text-on-primary text-label-md font-label-md rounded-lg bg-primary px-4 py-2 transition-all hover:opacity-90"
                  >
                    Upload New
                  </button>
                  <button
                    type="button"
                    className="border-outline-variant text-on-surface-variant text-label-md font-label-md hover:bg-surface-container-low rounded-lg border px-4 py-2 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border-outline-variant rounded-xl border p-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="display-name"
                  className="text-label-md font-label-md text-on-surface"
                >
                  Display Name
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="border-outline text-body-md font-body-md bg-surface w-full rounded-xl border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="text-label-md font-label-md text-on-surface"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Briefly describe your focus on civic impact..."
                  className="border-outline text-body-md font-body-md bg-surface w-full resize-none rounded-xl border px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border-outline-variant rounded-xl border p-6">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-6">
              Transparency Controls
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div className="max-w-[80%]">
                  <p className="text-label-md font-label-md text-on-surface">
                    Show me on the public leaderboard
                  </p>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Allow your impact score to be visible to the Verix
                    community.
                  </p>
                </div>
                <ToggleSwitch
                  checked={showOnLeaderboard}
                  onChange={setShowOnLeaderboard}
                />
              </div>

              <div className="border-outline-variant border-t pt-6">
                <h4 className="text-label-md font-label-md text-on-surface mb-4">
                  Anonymity Preferences
                </h4>
                <label className="group flex cursor-pointer items-start gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={anonymousByDefault}
                      onChange={(event) =>
                        setAnonymousByDefault(event.target.checked)
                      }
                      className="border-outline peer h-5 w-5 cursor-pointer appearance-none rounded border transition-all checked:border-primary checked:bg-primary"
                    />
                    <MaterialIcon
                      name="check"
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[16px] text-white opacity-0 peer-checked:opacity-100"
                    />
                  </div>
                  <div className="select-none">
                    <p className="text-body-md font-body-md text-on-surface transition-colors group-hover:text-primary">
                      Submit proofs anonymously by default
                    </p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Your identity will be hidden from the public impact log
                      even for verified claims.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-low border-error/20 rounded-xl border p-6">
            <h3 className="text-label-md font-label-md text-error mb-4 flex items-center gap-2">
              <MaterialIcon name="warning" className="text-[20px]" />
              Danger Zone
            </h3>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="text-body-md font-body-md text-on-surface-variant">
                Permanently delete your account and all associated verification
                history. This action cannot be undone.
              </p>
              <button
                type="button"
                className="text-error text-label-md flex items-center gap-1 whitespace-nowrap font-bold transition-all hover:underline"
              >
                Delete Account
              </button>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === 'saving'}
              className={`text-label-md flex items-center gap-2 rounded-xl px-8 py-3 font-bold shadow-sm transition-all active:scale-[0.98] disabled:opacity-80 ${
                saveState === 'saved'
                  ? 'text-on-secondary bg-secondary'
                  : 'text-on-primary hover:bg-primary-container bg-primary'
              }`}
            >
              {saveState === 'saving' && (
                <MaterialIcon name="sync" className="animate-spin" />
              )}
              {saveState === 'saved' && <MaterialIcon name="done" />}
              {saveState === 'saving'
                ? 'Saving...'
                : saveState === 'saved'
                  ? 'Saved!'
                  : 'Save All Changes'}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-outline-variant mt-auto border-t">
        <div className="gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 py-12 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <MaterialIcon
                name="verified"
                className="text-[24px] text-primary"
              />
              <span className="text-headline-md font-headline-md font-bold text-primary">
                Verix
              </span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
              © 2026 Verix. Dedicated to institutional transparency and civic
              duty.
            </p>
          </div>
          <div className="flex flex-col justify-between md:items-end">
            <div className="mb-8 flex gap-8 md:mb-0">
              <a
                href="#"
                className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                About
              </a>
              <a
                href="#"
                className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                Submit
              </a>
              <a
                href="#"
                className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
              >
                Leaderboard
              </a>
            </div>
            <div className="flex gap-4">
              <MaterialIcon
                name="share"
                className="text-on-surface-variant cursor-pointer transition-colors hover:text-primary"
              />
              <MaterialIcon
                name="policy"
                className="text-on-surface-variant cursor-pointer transition-colors hover:text-primary"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
