import React from "react";
import AuthForm from "../Auth/AuthForm";
import { useAuth } from "../contexts/AuthContextProvider";

const Login = () => {
  const { loginUser } = useAuth();
  return (
    <div>
      <AuthForm
        title={"Войдите чтобы делать покупки"}
        btnText={"Логин"}
        link={"/register"}
        linkText={"Нету ещё аккаунта? Зарегистрируйтесь! "}
        handleSave={loginUser}
      />
    </div>
  );
};

export default Login;
