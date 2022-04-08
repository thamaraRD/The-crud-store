import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLogin, setLogin] = useState();

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};
