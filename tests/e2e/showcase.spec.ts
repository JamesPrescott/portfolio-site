import { test, expect } from '@playwright/test'

test.describe('Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/showcase')
  })

  test('should display showcase page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Showcase' })).toBeVisible()
  })

  test('should display showcase projects', async ({ page }) => {
    const grid = page.locator('main div.grid');
    const projectCards = grid.getByRole('heading', { level: 3 })
    await expect(projectCards).toHaveCount(6)
  })

  test('should be able to filter with pills', async ({ page }) => {
    await page.getByRole('button', { name: 'Tools', exact: true }).click()

    const grid = page.locator('main div.grid');
    const projectCards = grid.getByRole('heading', { level: 3 })

    await expect(projectCards).toHaveCount(3)
  })

  test('should be able to search with search bar', async ({ page }) => {
    await page.waitForURL('/showcase')
    await page.getByRole('textbox', { name: /Search/ }).fill('CLI')

    const grid = page.locator('main div.grid');
    const projectCards = grid.getByRole('heading', { level: 3 })

    await expect(projectCards).toHaveCount(1)
  })

  test('should be able to see a fallback message when no projects are found', async ({ page }) => {
    await page.waitForURL('/showcase')
    await page.getByRole('textbox', { name: /Search/ }).fill('Not a real project')

    const grid = page.locator('main div.grid');
    const projectCards = grid.getByRole('heading', { level: 3 })

    await expect(projectCards).toHaveCount(0)
    await expect(page.getByText(/No projects found/)).toBeVisible()
  })
})