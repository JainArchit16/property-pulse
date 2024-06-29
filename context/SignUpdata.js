'use client';
import { createContext, useContext, useState } from 'react';

// Create context
const SignUpContext = createContext();

// Create a provider
export function SignupDataProvider({ children }) {
  const [signupData, setSignUpData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <SignUpContext.Provider
      value={{
        signupData,
        setSignUpData,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

// Create a custom hook to access context
export function useSignUpContext() {
  return useContext(SignUpContext);
}
