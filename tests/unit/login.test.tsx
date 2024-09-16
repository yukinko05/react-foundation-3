import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SignIn from '../../src/pages/SignIn';


describe('ログイン画面コンポーネント', () => {
  it('メールアドレスとパスワードの入力フォームが表示されるログイン画面のレンダリング', () => {
    render(<SignIn />);
    const emailInputLabel = screen.getByText('メールアドレス');
    expect(emailInputLabel).toBeInTheDocument();

    const emailInput = screen.getByLabelText('メールアドレス');
    expect(emailInput).toBeInTheDocument();

    const passwordInputLabel = screen.getByText('パスワード');
    expect(passwordInputLabel).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('パスワード');
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();

  });
});
