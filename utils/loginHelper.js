import { signIn, signOut } from 'next-auth/react';

export async function doLogout() {
  await signOut({ callbackUrl: '/', redirect: true });
}

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}
