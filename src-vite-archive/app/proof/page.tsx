import { useState } from 'react'
import GoldBadge from '../../components/GoldBadge'
import Header from '../../components/Header'
import MaterialIcon from '../../components/MaterialIcon'

const PROOF_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Z3ey2swEPqueKSTNHZ8ASFEqJhX4DghOr47IKSVpPd0NzcJbE6OyiDRB_vJ3RIr7CGHMyaPcUNWbMJBsL5p6HZWEITRAVAegIJhGbDWDvnco4AJEBhCR9hOVv9zrEBzsh1Tqz4hxNHgEDgZg26GSzIkc4Gt6GsOzoG47sm1gsetc-DoYwMbrhsOBQRUl5iFsFevKlmPIj8MyuV1NyXuw4KesvVdNU_g4yzS66jKgmsLglSNArFvYKH4Us7nLn66BHnNjJVB9tkd6'

const SHARE_ACTIONS = [
  { label: 'Twitter', icon: 'share', iconClassName: 'text-[#1DA1F2]' },
  { label: 'WhatsApp', icon: 'chat', iconClassName: 'text-[#25D366]' },
]

// TODO: fetch real proof data by :proofId once the Backend APIs lead ships the endpoint.
export default function PublicProofPage() {
  const [copied, setCopied] = useState(false)

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen">
      <Header avatarUrl={PROOF_AVATAR} showNav={false} position="fixed" />

      <main className="px-margin-mobile mx-auto flex min-h-screen max-w-[480px] flex-col gap-6 pb-24 pt-20">
        <section className="flex flex-col gap-2">
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface tracking-tight">
            City Park Cleanup
          </h1>
          <div className="text-on-surface-variant flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MaterialIcon name="location_on" className="text-[18px]" />
              <span className="text-label-md font-label-md">Paris, France</span>
            </div>
            <span className="text-outline">•</span>
            <div className="flex items-center gap-1">
              <MaterialIcon name="calendar_today" className="text-[18px]" />
              <span className="text-label-md font-label-md">Oct 24, 2026</span>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border-outline-variant flex flex-col items-center justify-center rounded-xl border p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <GoldBadge label="GOLD VERIFIED" icon="verified" />
            <div className="mt-2 text-center">
              <span className="text-display-lg font-display-lg leading-none text-primary">
                94%
              </span>
              <p className="text-label-md font-label-md text-on-surface-variant mt-1 uppercase tracking-widest">
                Confidence Score
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="border-outline-variant bg-surface-container relative overflow-hidden rounded-xl border">
            <div className="bg-surface/90 border-outline-variant absolute left-4 top-4 z-10 rounded-full border px-3 py-1 backdrop-blur-md">
              <span className="text-label-sm font-label-sm text-on-surface uppercase tracking-wider">
                Before
              </span>
            </div>
            <div className="h-64 w-full">
              <img
                className="h-full w-full object-cover"
                alt="City park before cleanup, littered with plastic waste"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrayRQCzhAUFPYrCwejACOKnVQfk04MuTxbNYOrXI2V0cspyDImc_gYhPt45Mkv3oWZbbosLLRSErQQ_pFb4xVBV69_8RDdC8yW8At7qdksHxfbeREmLv2h7lXBkfpcFkccQZlLOLDRyF83Fk56yDunE468BpGlqHLn5Wx0GNO8lDN6VCggSJG0g8wMkMHJGkM8yT5TUcOEP2ketd-htkFjCrGZplXkS5bbT81BTHujs2IdxBLSi1vkcKS87bj61Vn7ujbaYYds9mc"
              />
            </div>
          </div>
          <div className="bg-surface-container relative overflow-hidden rounded-xl border border-primary/20">
            <div className="text-on-primary absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 shadow-lg">
              <span className="text-label-sm font-label-sm uppercase tracking-wider">
                After
              </span>
            </div>
            <div className="h-64 w-full">
              <img
                className="h-full w-full object-cover"
                alt="Same city park, pristine after cleanup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl4WnuknZecRuoDJG4CQ53vKldJy7qD6xbHzk7h7TeqFDzk7gLQ8AnJELS_d0Uopb1WKWvH5m-R1XIfZ3BSmbTZTaDLrPuaY0HP6GNwAfO9AACZOPXPNy4Rw_Hbly1I0w4Q3-GHn0uDJIzCOGdci5Obqm-qQNtOv6oaisJ6xyyw47E_yHHkcVV7Uu0SD6pSbCfZrHUrJiUdl45deFEO9uOuWKCidlq84QlfhcNAd0zcmNkPKaA38TVDarWDSDG85pCOGqCztpn3Jgs"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface-container border-outline-variant flex flex-col gap-3 rounded-xl border p-6">
          <div className="flex items-center gap-2 text-primary">
            <MaterialIcon name="psychology" />
            <h3 className="text-label-md font-bold uppercase tracking-wider">
              AI Analysis
            </h3>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            AI Analysis confirms significant waste removal from the park area.
            The before image shows plastic debris which is absent in the after
            image, showing high environmental impact. Verification logic
            processed multi-angle spatial consistency to rule out digital
            alteration.
          </p>
        </section>

        <section className="bg-surface-container-low border-outline-variant flex items-center justify-between rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
              <img
                className="h-full w-full object-cover"
                alt="John Doe"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1vtEZ5sKaLgnfyhpksOqXj_w1sPTK1vwnhytbOtB5vggs4ai-A-5foKsRjH1mzMoAJGo7bnn0YK8-ef_xQ_8mgMl0pC_ZkoPoQTawLPf8sxYZh-jbrcoaAa7T5eRJil4cdfOWyqN-sB2HfsFtQ3c96Vnm68PjmYKMnbObNpBw3QTEdmeeBisicsXk-odRpITAYMxd8j0MUob2OzPiUqRkXQiBTtuGARqQAzW1yJrz6Miw6sE-UkRUs6onq3B3cozbVVOG_f-TBoeW"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-label-sm font-label-sm text-on-surface-variant">
                Verified for
              </span>
              <span className="text-body-md text-on-surface font-bold">
                John Doe
              </span>
            </div>
          </div>
          <MaterialIcon name="verified_user" className="text-primary" />
        </section>

        <section className="flex flex-col gap-4 py-4">
          <h3 className="text-label-md text-on-surface-variant px-1 font-bold">
            Share this proof
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {SHARE_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                className="bg-surface border-outline-variant hover:bg-surface-container flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors active:scale-95"
              >
                <MaterialIcon
                  name={action.icon}
                  className={action.iconClassName}
                />
                <span className="text-label-sm font-label-sm">
                  {action.label}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`border-outline-variant flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors active:scale-95 ${
                copied
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface hover:bg-surface-container'
              }`}
            >
              <MaterialIcon
                name={copied ? 'check' : 'content_copy'}
                className={copied ? '' : 'text-on-surface-variant'}
              />
              <span className="text-label-sm font-label-sm">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low border-outline-variant border-t">
        <div className="px-margin-mobile flex flex-col items-center gap-6 py-8 text-center">
          <span className="text-headline-md font-bold text-primary">Verix</span>
          <p className="text-body-md font-body-md text-on-tertiary-fixed-variant max-w-xs">
            © 2026 Verix. Dedicated to institutional transparency and civic
            duty.
          </p>
          <div className="flex gap-6">
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
        </div>
      </footer>
    </div>
  )
}
