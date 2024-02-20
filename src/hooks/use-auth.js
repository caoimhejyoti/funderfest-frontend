import { useContext } from "react";

// COMPONENTS
import { AuthContext } from "../components/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};
