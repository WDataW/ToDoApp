import { useState } from 'react'
// contexts

// components
import {VerificationCodePage ,ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage} from './components/ui';

function App() {
  return (
    <>
      <VerificationCodePage/>
      <SignUpPage/>
      <SetNewPasswordPage/>
      <ForgotPasswordPage/>
      <SignInPage/>
    </>
  );
}
export default App
