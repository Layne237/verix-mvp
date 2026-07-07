import { test, expect } from '@playwright/test'

test.describe('Proof Submission Flow', () => {
  test('should display landing page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Verify Your Impact')).toBeVisible()
  })

  test('should navigate to login', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Welcome back')).toBeVisible()
  })

  test('should navigate to register', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByText('Create an account')).toBeVisible()
  })

  test('should show leaderboard', async ({ page }) => {
    await page.goto('/leaderboard')
    await expect(page.getByText('Top Contributors')).toBeVisible()
  })
})
