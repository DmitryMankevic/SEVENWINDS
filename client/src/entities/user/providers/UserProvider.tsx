/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type JSX } from "react";
import type { IUserDB } from "../model";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import { UserApi } from "../api/UserApi";

// создаем тип состояния пользотеля
export type UserStateType = {
  status: "logging" | "logged" | "guest";
  data: IUserDB | null;
};
// создаем тип контекста
export type UserContextType = {
  user: UserStateType;
  setUser: React.Dispatch<React.SetStateAction<UserStateType>>;
};
// создаем контекст пользователя
export const UserConText = createContext<UserContextType | null>(null);

// создаем провайдер для пользователя
export function UserProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<UserStateType>({
    status: "logging",
    data: null,
  });
  useEffect(() => {
    UserApi.refreshTokens()
      .then((res) => {
        if (!res.data) return;
        setUser({ status: "logged", data: res.data.user });
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);
  return (
    <UserConText.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserConText.Provider>
  );
}
