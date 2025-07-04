import { useState } from 'react'
// contexts

// components
import {OutlinedImageAnchor, MainNav, BottomNav, SideNav} from './components/ui';
import {VerificationCodePage ,ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage} from "./Pages";

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
