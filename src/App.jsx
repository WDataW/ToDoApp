import { useEffect, useState } from 'react'
// contexts

// components
import { LandingPage, VerificationCodePage, StatsPage, ForgotPasswordPage, SignInPage, SetNewPasswordPage, SignUpPage, HomePage, TasksPage, SettingsPage } from "./Pages";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
export const appName = "DOMORE";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/app", element: <></> },
    { path: "/app/home", element: <HomePage /> },
    { path: "/app/tasks", element: <TasksPage /> },
    { path: "/app/stats", element: <StatsPage /> },
    { path: "/app/settings", element: <SettingsPage /> },
    { path: "/auth/sign-up", element: <SignUpPage /> },
    { path: "/auth/sign-in", element: <SignInPage /> },
    { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/auth/verification-code", element: <VerificationCodePage /> },
    { path: "/auth/new-password", element: <SetNewPasswordPage /> },

    { path: "*", element: <PageNotFound /> }
  ]);


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
