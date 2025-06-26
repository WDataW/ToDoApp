import { useState } from 'react'
// contexts

// components
import {VerificationCodePage ,ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage} from './components/ui';

function App() {
  return (
    <>
      <SignUpPage/>
      <SetNewPasswordPage/>
      <ForgotPasswordPage/>
      <SignInPage/>
    </>
  );
}
export default App
