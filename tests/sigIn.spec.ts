import { test, expect } from '@playwright/test';

test.describe('ログイン画面のメールアドレス入力検証', () => {
  test('未入力で送信ボタンを押した際にエラーメッセージが表示される', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.fill('input[name="email"]', '');
    await page.click('button[type="submit"]');
    await expect(page.locator('p:has-text("メールアドレスは必須です")')).toBeVisible();
  });

  test('不正な形式の値を入力した際にエラーメッセージが表示される', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.fill('input[name="email"]', 'test');
    await page.click('button[type="submit"]');
    await expect(
      page.locator('p:has-text("正しいメールアドレスを入力してください")')
    ).toBeVisible();
  });

  test('正しい形式の値を入力した際にエラーメッセージが表示されない', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.fill('input[name="email"]', 'test@gmail.com');
    await page.click('button[type="submit"]');
    await expect(
      page.locator('p:has-text("正しいメールアドレスを入力してください")')
    ).not.toBeVisible();
  });
});
