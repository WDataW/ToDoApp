import { useState } from 'react'
// contexts

// components
import { OutlinedImageAnchor, MainNav, BottomNav, SideNav } from './components/ui';
import { FloatingContainer } from './components/ui/containers';
import { Page, VerificationCodePage, StatsPage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage, TasksPage, SettingsPage } from "./Pages";
import ActionsContainer from './components/ui/Tasks/ActionsContainer';
import { LandingPage } from './Pages/landing';
function App() {
  return (
    <>


      {/* <SettingsPage></SettingsPage> */}
      {/* <ForgotPasswordPage ></ForgotPasswordPage > */}
      {/* <SetNewPasswordPage></SetNewPasswordPage> */}
      {/* <VerificationCodePage></VerificationCodePage> */}
      {/* <SignInPage></SignInPage> */}
      {/* <SignUpPage></SignUpPage> */}
      <TasksPage></TasksPage>
      {/* <StatsPage></StatsPage> */}
      {/* <HomePage></HomePage> */}
      {/* <LandingPage></LandingPage> */}
    </>
  );
}
export default App
