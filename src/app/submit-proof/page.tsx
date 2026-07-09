import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Header from '../../components/Header'
import MaterialIcon from '../../components/MaterialIcon'

const RESEARCHER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVjsF3hm3Ye3gOoVb_t6uSd0JYX-PIif4GDmkkRax2-LWyfifvU6oABjJVQ3qdihC3XAMK4Cc7Mz5cAv6VbDxW8jm5DyPp8_z1-3BYczOSyg3Hr6kbYzeaXeD9VTjuFh4_i7ETRNfE4Amtn54KXUk-ldwve-Ht8NSi99-SZK_tTeo72--mQ4AVmZHE3poShB2047h2_G2dBNT4g9IEFyGvoVb2Dzhnin3fQlzee2ydI8tOPE4TpP3v1_lWsrM1gPPP7pCU1n5D-0-U'

type Step = 1 | 2

function PhotoDropzone({ label, file, onChange }: { label: string; file: File | null; onChange: (file: File | null) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-label-md font-label-md text-on-surface-variant">{label}</label>
      <div className="relative group cursor-pointer border-2 border-dashed border-outline-variant rounded-xl aspect-square flex flex-col items-center justify-center gap-3 bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary transition-all overflow-hidden">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
        {file ? (
          <>
            <MaterialIcon name="check_circle" filled className="text-primary text-4xl" />
            <p className="text-label-md font-label-md text-on-surface px-4 text-center truncate max-w-full">{file.name}</p>
          </>
        ) : (
          <>
            <MaterialIcon name="camera" className="text-outline group-hover:text-primary transition-colors text-4xl" />
            <div className="text-center px-4">
              <p className="text-label-md font-label-md text-on-surface">Upload {label} Photo</p>
              <p className="text-label-sm font-label-sm text-outline">Drag and drop or click</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function SubmitProofPage() {
  const [step, setStep] = useState<Step>(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [beforePhoto, setBeforePhoto] = useState<File | null>(null)
  const [afterPhoto, setAfterPhoto] = useState<File | null>(null)

  function goToStep(next: Step) {
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // TODO: POST to the submit-proof endpoint once the Backend APIs lead ships it.
    alert('Your proof has been submitted for AI verification. You will receive an update shortly.')
  }

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen">
      <Header avatarUrl={RESEARCHER_AVATAR} showNav={false} />

      <div className="w-full bg-surface-container-low px-margin-mobile py-4 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Step {step} of 2</span>
            <h1 className="text-headline-md font-headline-md text-primary">{step === 1 ? 'Impact Details' : 'Photo Evidence'}</h1>
          </div>
          <div className="flex gap-2">
            <div className={`w-8 h-2 rounded-full transition-colors ${step === 1 ? 'bg-primary' : 'bg-surface-variant'}`} />
            <div className={`w-8 h-2 rounded-full transition-colors ${step === 2 ? 'bg-primary' : 'bg-surface-variant'}`} />
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-2xl mx-auto px-margin-mobile py-8">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {step === 1 && (
            <section className="space-y-6">
              <div className="space-y-2">
                <label className="text-label-md font-label-md text-on-surface-variant">Title</label>
                <input
                  className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-all text-body-md font-body-md placeholder:text-outline"
                  maxLength={100}
                  placeholder="e.g., Reforestation at Sector G-4"
                  required
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <div className="flex justify-end">
                  <span className="text-label-sm font-label-sm text-outline">Max 100 characters</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-md font-label-md text-on-surface-variant">Description</label>
                <textarea
                  className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-all text-body-md font-body-md placeholder:text-outline"
                  maxLength={500}
                  placeholder="Describe the verified impact and specific actions taken..."
                  required
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <div className="flex justify-end">
                  <span className="text-label-sm font-label-sm text-outline">Max 500 characters</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-md font-label-md text-on-surface-variant">Location (Optional)</label>
                <div className="relative">
                  <input
                    className="w-full p-4 pl-12 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary transition-all text-body-md font-body-md placeholder:text-outline"
                    placeholder="Enter coordinates or address"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                  <MaterialIcon name="location_on" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                </div>
              </div>

              <Button type="button" size="lg" className="w-full" onClick={() => goToStep(2)}>
                Next: Photo Evidence
              </Button>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6">
              <div className="bg-secondary-fixed/10 p-4 rounded-xl flex items-start gap-3 border border-secondary-container">
                <MaterialIcon name="lightbulb" className="text-secondary" />
                <p className="text-label-md font-label-md text-on-secondary-fixed-variant">
                  Make sure both photos are from the same angle for better AI confidence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhotoDropzone label="Before" file={beforePhoto} onChange={setBeforePhoto} />
                <PhotoDropzone label="After" file={afterPhoto} onChange={setAfterPhoto} />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button type="submit" size="lg" className="w-full">
                  Submit for AI Verification
                </Button>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="w-full bg-transparent text-outline-variant border border-outline-variant py-4 rounded-xl font-label-md text-label-md hover:bg-surface-container transition-colors"
                >
                  Back to Details
                </button>
              </div>
            </section>
          )}
        </form>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="space-y-2">
            <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
            <p className="text-body-md font-body-md text-on-tertiary-fixed-variant">
              © 2026 Verix. Dedicated to institutional transparency and civic duty.
            </p>
          </div>
          <div className="flex gap-6 md:justify-end items-center">
            <a href="#" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
              About
            </a>
            <span className="text-label-md font-label-md text-primary font-bold">Submit</span>
            <Link to="/leaderboard" className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors">
              Leaderboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
