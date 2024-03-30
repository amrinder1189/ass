import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <MainLayout>
        <LoginForm redirectUrl={redirectUrl} />
      </MainLayout>
    </>
  );
};

export default Login;
