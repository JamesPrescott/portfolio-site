import { test, expect, Locator } from '@playwright/test'

let main: Locator;

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    main = page.getByRole('main')
  })

  test('should display home page', async ({ page }) => {
    await expect(main.getByRole('heading', { name: "Hi, I'm James" })).toBeVisible()
  })

  test('should have button to navigate to showcase', async ({ page }) => {
    await main.getByRole('link', { name: /View my work/i }).click()
    await expect(page).toHaveURL('/showcase')
  })

  test('should have button to navigate to blog', async ({ page }) => {
    await main.getByRole('link', { name: /Read My Blog/i }).click()
    await expect(page).toHaveURL('/blog')
  })

  test('should have button to navigate to about', async ({ page }) => {
    await main.getByRole('link', { name: /Learn More About Me/i }).click()
    await expect(page).toHaveURL('/about')
  })
})