import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    token: window.localStorage.getItem("token"),
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider = (props) => {
//   const [auth, setAuth] = useState({
//     token: window.localStorage.getItem("token"),
//     user: window.localStorage.getItem("username"),
//   });
//   const [user, setUser] = useState({
//     token: window.localStorage.getItem("username"),
//   });
//   return (
//     <AuthContext.Provider value={({ auth, setAuth }, { user, setUser })}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };
