import { useState } from 'react'
// contexts

// components
import { OutlinedImageAnchor, MainNav, BottomNav, SideNav } from './components/ui';
import { FloatingContainer } from './components/ui/containers';
import { Page, VerificationCodePage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage, TasksPage } from "./Pages";
import ActionsContainer from './components/ui/Tasks/ActionsContainer';
function App() {
  return (
    <>


      {/*
     <VerificationCodePage></VerificationCodePage>
    <ForgotPasswordPage></ForgotPasswordPage>
    <SignInPage></SignInPage>
    
    */}
      <TasksPage></TasksPage>
      {/* <HomePage></HomePage> */}
    </>
  );
}
export default App
