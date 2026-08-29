import { useEffect, useState } from 'react'
// contexts

// components
import { LandingPage, VerificationCodePage, StatsPage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage, TasksPage, SettingsPage, CheckYourEmail } from "./Pages";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import LoginChecker from './Pages/auth/LoginChecker';
export const appName = "DOMORE";
function App() {
  const router = createBrowserRouter([{
    path: "/",
    Component: LoginChecker,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth/sign-up", element: <SignUpPage /> },
      { path: "/auth/sign-in", element: <SignInPage /> },
      { path: "/app", element: <></> },
      { path: "/app/home", element: <HomePage /> },
      { path: "/app/tasks", element: <TasksPage /> },
      { path: "/app/stats", element: <StatsPage /> },
      { path: "/app/settings", element: <SettingsPage /> },

    ]
  },
  { path: "/auth/email-sent", element: <CheckYourEmail /> },
  { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/auth/verify-email", element: <VerificationCodePage /> },
  { path: "/auth/reset-password", element: <SetNewPasswordPage /> },
  { path: "*", element: <PageNotFound /> }
  ]
  );


  return (<>
    <RouterProvider router={router}>
      {/* <SettingsPage></SettingsPage> */}
      {/* <ForgotPasswordPage ></ForgotPasswordPage > */}
      {/* <SetNewPasswordPage></SetNewPasswordPage> */}
      {/* <VerificationCodePage></VerificationCodePage> */}
      {/* <SignInPage></SignInPage> */}
      {/* <SignUpPage></SignUpPage> */}
      {/* <TasksPage></TasksPage> */}
      {/* <StatsPage></StatsPage> */}
      {/* <HomePage></HomePage> */}
      {/* <LandingPage></LandingPage> */}
    </RouterProvider>
  </>

  );
}
export default App
