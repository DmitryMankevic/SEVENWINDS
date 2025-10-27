import { useContext } from "react";
import { UserConText, type UserContextType } from "../providers/UserProvider";

 function useUser(): UserContextType {
  const context = useContext(UserConText);
  if (!context) throw new Error("context is null");
  return context;
}

export default useUser;