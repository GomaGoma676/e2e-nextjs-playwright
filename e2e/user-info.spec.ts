import { test, expect } from '@playwright/test'

test('Shall github username not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Hello World🚀')
  await expect(page.getByText('userA')).not.toBeVisible()
})

test('Shall github username visible with session token', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Hello World🚀')
  await expect(page.getByText('userA')).toBeVisible()
})
