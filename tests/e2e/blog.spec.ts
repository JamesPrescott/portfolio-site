import { test, expect, Locator } from '@playwright/test'

let main: Locator;

test.describe('Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
    main = page.getByRole('main')
  })

  test('should display blog page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
  })

  test('should see a list of blog posts', async ({ page }) => {
    await expect(main.getByRole('article')).toHaveCount(2)
  });

  test('should have filter pills', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'All Posts' })).toBeVisible()
  });

  test('should be able to filter posts by category', async ({ page }) => {
    await page.getByRole('button', { name: 'Architecture' }).click()
    await expect(main.getByRole('article')).toHaveCount(1)
  });

  test('should be able to search for a post', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search' }).fill('Tools')
    await expect(main.getByRole('article')).toHaveCount(1)
  });

  test('should be able to see a fallback message when no posts are found', async ({ page }) => {
    await page.waitForURL('/blog')
    await page.getByRole('textbox', { name: 'Search' }).fill('Not a real post')
    await expect(main.getByRole('article')).toHaveCount(0)
    await expect(page.getByText(/No articles found/)).toBeVisible()
  });
})