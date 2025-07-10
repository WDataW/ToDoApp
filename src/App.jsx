import { useState } from 'react'
// contexts

// components
import { OutlinedImageAnchor, MainNav, BottomNav, SideNav } from './components/ui';
import { Page, VerificationCodePage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage } from "./Pages";
import ActionsContainer from './components/ui/Tasks/ActionsContainer';
function App() {
  return (
    <>


      {/*
     <VerificationCodePage></VerificationCodePage>
    <ForgotPasswordPage></ForgotPasswordPage>
    <SignInPage></SignInPage>
    <SetNewPasswordPage></SetNewPasswordPage>
    <SignUpPage></SignUpPage>
    <HomePage></HomePage>
     */}
      <HomePage></HomePage>
    </>
  );
}
export default App
