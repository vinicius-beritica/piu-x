import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from ".";
import { MainLayout } from "../pages/MainLayout";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { ProfileLayout } from "../pages/ProfileLayout";
import { Profile } from "../pages/Profile";
import { SinglePiupiu } from "../pages/SinglePiupiu";
import { isAuthenticated } from "./isAuthentication";

export const PiupiuRoutes = () => {
  const auth = isAuthenticated();
  return (
    <Routes>
      {auth ? (
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.following} element={<Home />} />
          <Route path={routes.profile(":handle")} element={<ProfileLayout />}>
            <Route
              path={routes.profile(":handle")}
              element={<Profile postsRoute={"posts"} />}
            />
            <Route
              path={routes.userLikes(":handle")}
              element={<Profile postsRoute={"likes"} />}
            />
          </Route>
          <Route path={routes.singlePiupiu(":id")} element={<SinglePiupiu />} />
          <Route path="/*" element={<Navigate replace to={routes.home} />} />
        </Route>
      ) : (
        <>
          <Route path="/*" element={<Navigate replace to="/" />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<SignUp />} />
        </>
      )}
    </Routes>
  );
};
