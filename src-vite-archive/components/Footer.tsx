import MaterialIcon from './MaterialIcon'

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: 'About', href: '#' },
    { label: 'Submit', href: '#' },
    { label: 'Leaderboard', href: '#' },
  ],
  Resources: [
    { label: 'API Docs', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
  Social: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-outline-variant px-margin-mobile md:px-margin-desktop border-t py-12">
      <div className="max-w-container-max gap-gutter mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MaterialIcon name="verified" filled className="text-primary" />
            <span className="text-headline-md font-headline-md font-bold text-primary">
              Verix
            </span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
            © 2026 Verix. Dedicated to institutional transparency and civic
            duty. Empowering global impact through verifiable data.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <span className="text-label-md font-label-md text-on-surface font-bold">
                {heading}
              </span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-label-md font-label-md text-on-tertiary-fixed-variant transition-colors hover:text-secondary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
