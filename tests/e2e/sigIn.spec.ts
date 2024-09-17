import { test, expect } from '@playwright/test';

test.describe('ログイン画面のメールアドレス入力検証', () => {
  test('入力フィールドをクリックして未入力のままフォーカスを外した際にエラーメッセージが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="email"]', '');
    await page.locator('input[name="email"]').blur();
    await expect(page.locator('p:has-text("メールアドレスは必須です")')).toBeVisible();
  });

  test('不正な形式の値を入力した際にエラーメッセージが表示される', async ({ page }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="email"]', 'test');
    await page.locator('input[name="email"]').blur();
    await expect(
      page.locator('p:has-text("正しいメールアドレスを入力してください")')
    ).toBeVisible();
  });

  test('正しい形式の値を入力した際にエラーメッセージが表示されない', async ({ page }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="email"]', 'test@gmail.com');
    await page.locator('input[name="email"]').blur();
    await expect(
      page.locator('p:has-text("正しいメールアドレスを入力してください")')
    ).not.toBeVisible();
  });
});

test.describe('ログイン画面のパスワード入力検証', () => {
  test('入力フィールドをクリックして未入力のままフォーカスを外した際にエラーメッセージが表示される', async ({
    page,
  }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="password"]', '');
    await page.locator('input[name="password"]').blur();
    await expect(page.locator('p:has-text("パスワードは必須です")')).toBeVisible();
  });

  test('8文字未満の値を入力した際にエラーメッセージが表示される', async ({ page }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="password"]', 'test');
    await page.locator('input[name="password"]').blur();
    await expect(
      page.locator('p:has-text("パスワードは8文字以上で入力してください")')
    ).toBeVisible();
  });

  test('8文字以上の値を入力した際にエラーメッセージが表示されない', async ({ page }) => {
    await page.goto('http://localhost:4000/login');
    await page.fill('input[name="password"]', 'testdesu');
    await page.locator('input[name="password"]').blur();
    await expect(
      page.locator('p:has-text("パスワードは8文字以上で入力してください")')
    ).not.toBeVisible();
  });
});
