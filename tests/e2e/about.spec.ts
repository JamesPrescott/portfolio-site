import { test, expect } from '@playwright/test'

test.describe('About', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('should display about page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
  })

  test('should have introduction section', async ({ page }) => {  
    await expect(page.getByRole('heading', { name: 'My Story' })).toBeVisible()
  })

  test('should have experience section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
  })

  test('should have skills section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Skills & Technologies' })).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible()
  })

  test('should have get in touch section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible()

    const main = page.getByRole('main')

    await expect(main.getByRole('link', { name: 'Send Email' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })
})