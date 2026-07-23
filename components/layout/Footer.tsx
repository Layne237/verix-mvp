import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="text-lg font-bold text-primary">Verix</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Verify your impact. Share your proof.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/submit" className="hover:text-primary">
                Submit Proof
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="hover:text-primary">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Account</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Connect</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="https://github.com/Layne237/verix-mvp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Verix. Built by Team NetZero.
      </div>
    </footer>
  )
}
