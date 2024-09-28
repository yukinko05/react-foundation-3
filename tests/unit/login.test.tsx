import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SignIn from '../../src/features/auth/SignIn';
import { BrowserRouter } from 'react-router-dom';

describe('ログイン画面コンポーネント', () => {
  it('メールアドレスとパスワードの入力フォームが表示されるログイン画面のレンダリング', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();

  });
});

console.log(screen.debug());
