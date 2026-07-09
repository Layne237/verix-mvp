import { Route, Routes } from 'react-router-dom'
import LandingPage from './app/landing/page'
import SignInPage from './app/sign-in/page'
import SignUpPage from './app/sign-up/page'
import SubmitProofPage from './app/submit-proof/page'
import DashboardPage from './app/dashboard/page'
import PublicProofPage from './app/proof/page'
import PublicLeaderboardPage from './app/leaderboard/page'
import SettingsPage from './app/settings/page'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/submit-proof" element={<SubmitProofPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/proof/:proofId" element={<PublicProofPage />} />
      <Route path="/leaderboard" element={<PublicLeaderboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}
