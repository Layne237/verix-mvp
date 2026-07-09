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
    <footer className="bg-surface-container-low border-t border-outline-variant py-12 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MaterialIcon name="verified" filled className="text-primary" />
            <span className="text-headline-md font-headline-md font-bold text-primary">Verix</span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-sm">
            © 2026 Verix. Dedicated to institutional transparency and civic duty. Empowering global impact through
            verifiable data.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <span className="text-label-md font-label-md text-on-surface font-bold">{heading}</span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-label-md font-label-md text-on-tertiary-fixed-variant hover:text-secondary transition-colors"
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
