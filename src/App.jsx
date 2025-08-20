import { useState } from 'react'
// contexts

// components
import { OutlinedImageAnchor, MainNav, BottomNav, SideNav } from './components/ui';
import { FloatingContainer } from './components/ui/containers';
import { Page, VerificationCodePage, StatsPage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage, TasksPage } from "./Pages";
import ActionsContainer from './components/ui/Tasks/ActionsContainer';
function App() {
  return (
    <>



      <ForgotPasswordPage ></ForgotPasswordPage >
      <SetNewPasswordPage></SetNewPasswordPage>
      <VerificationCodePage></VerificationCodePage>
      <SignInPage></SignInPage>
      <SignUpPage></SignUpPage>
      {/* <TasksPage></TasksPage> */}
      {/* <StatsPage></StatsPage> */}
      {/* <HomePage></HomePage> */}
    </>
  );
}
export default App
