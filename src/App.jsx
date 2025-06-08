import React from "react";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import PlainPage from "./pages/PlainPage";
import NoteSettings from "./components/NoteSettings/NoteSettings";
import ToolBarSection from "./pages/Home/ToolBarSection/ToolBarSection";
import NoteSection from "./pages/Home/NoteSection/NoteSection";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const plainPages = [
    {
      path: "/login",
      component: <Login></Login>,
    },
    {
      path: "/signup",
      component: <SignUp></SignUp>,
    },
    {
      path: "/profile",
      component: (
        <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      ),
    },
    {
      path: "/reset-password",
      component: (
        <PrivateRoute>
          <ResetPassword></ResetPassword>
        </PrivateRoute>
      ),
    },
    {
      path: "/forgot-password",
      component: <ForgotPassword></ForgotPassword>,
    },
  ];
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage></HomePage>
          </PrivateRoute>
        }
      ></Route>
      {plainPages.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={<PlainPage>{component}</PlainPage>}
        ></Route>
      ))}
    </Routes>
  );
};

export default App;
