export const AUTH_VALIDATION_MESSAGES = {
  email: {
    required: "メールアドレスは必須です",
    invalid: "有効なメールアドレスを入力してください",
  },
  password: {
    required: "パスワードは必須です",
    minLength: "パスワードは8文字以上で入力してください",
  },
  confirmPassword: {
    required: "確認用パスワードは必須です",
    match: "パスワードが一致しません",
  },
};
