import { AuthAPI } from "@/api";
import { authRoutes, notAuthRoutes, psychRoutes } from "@/router";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const AppRouter = () => {
  const sid = JSON.parse(localStorage.getItem("sid") as string);
  const userType = localStorage.getItem("userType");
  const [profileFetched, setProfileFetched] = useState(false);

  const getProfile = useCallback(async () => {
    const result = await AuthAPI.getProfile(sid);
    if (result.status === 404) {
      localStorage.removeItem("sid");
      localStorage.removeItem("userType")
      window.location.reload();
    } else {
      setProfileFetched(true);
      {
        userType !== "psych"
          ? localStorage.setItem("userData", JSON.stringify({ id: result.id, ...result.userInfo }))
          : localStorage.setItem("userData", JSON.stringify(result))
      }
    }
  }, [sid]);

  useEffect(() => {
    if (!profileFetched && sid) {
      getProfile();
    }
  }, [profileFetched, sid, getProfile, userType]);

  return (
    <>
      <ScrollToTop />
      {sid ? (
        <Routes>
          {userType === "psych" ? (
            psychRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.id}
              />
            ))
          ) : (
            authRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.id}
              />
            ))
          )}
        </Routes>
      ) : (
        <Routes>
          {notAuthRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.id}
            />
          ))}
        </Routes>
      )}
    </>
  );
};

export default AppRouter;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
