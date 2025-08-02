import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to showcase page', async ({ page }) => {
    await page.goto('/')
    
    // Check that we're on the home page
    await expect(page.getByRole('heading', { name: "Hi, I'm James" })).toBeVisible()
    
    // Navigate to showcase using the navigation link specifically
    await page.getByRole('navigation').getByRole('link', { name: 'Showcase' }).click()
    await expect(page).toHaveURL('/showcase')
    await expect(page.getByRole('heading', { name: 'Showcase' })).toBeVisible()
  })

  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to blog using the navigation link specifically
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL('/blog')
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to about using the navigation link specifically
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.goto('/showcase')
    
    // Navigate back to home using the navigation link specifically
    await page.getByRole('navigation').getByRole('link', { name: 'James Portfolio' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: "Hi, I'm James" })).toBeVisible()
  })

  test('should show mobile menu on mobile devices', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Menu should be hidden initially - check navigation links specifically
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Showcase' })).not.toBeVisible()
    
    // Click hamburger menu - target the navigation button specifically
    await page.getByRole('navigation').getByRole('button').click()
    
    // Menu should now be visible
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Showcase' })).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Blog' })).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('should highlight active page in navigation', async ({ page }) => {
    await page.goto('/showcase')
    
    // Showcase link should be active - check the correct CSS class
    const showcaseLink = page.getByRole('navigation').getByRole('link', { name: 'Showcase' })
    await expect(showcaseLink).toHaveClass(/bg-blue-50/)
    
    await page.goto('/blog')
    
    // Blog link should be active - check the correct CSS class
    const blogLink = page.getByRole('navigation').getByRole('link', { name: 'Blog' })
    await expect(blogLink).toHaveClass(/bg-blue-50/)
  })
}) 