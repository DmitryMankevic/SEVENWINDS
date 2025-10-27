import { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  MainPage,
  LoginPage,
  SignUpPage,
} from "@/pages";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";


export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />

          {/* <Route path="/add" element={<AddPhonesPage user={user}/>} /> */}
          {/* <Route path="/admin" element={<AdminPage/>}/> */}
          <Route path="*" element={<h1>Нет контента</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
