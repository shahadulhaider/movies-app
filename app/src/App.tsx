import { RequireAuth } from "components/auth";
import { FullPageError } from "components/error/fullPageError";
import { FullPageSpinner } from "components/ui/spinner/fullPageSpinner";
import { Footer } from "layouts/Footer";
import { Header } from "layouts/Header";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Profile } from "pages/Profile";
import { Register } from "pages/Register";
import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getCurrentUser } from "store/slices/userSlice";
import { ResponseStatus } from "types/api";
import { ResError } from "types/error";
import css from "./App.module.css";

const App: FC = () => {
  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [error, setError] = useState<ResError | null>(null);
  const token = localStorage.getItem("jwt");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && status === "idle") {
      (async () => {
        try {
          setStatus("loading");
          await dispatch(getCurrentUser(token)).unwrap();
          setStatus("success");
        } catch (error) {
          setStatus("failed");
          setError(error as ResError);
        }
      })();
    }
  }, [token, dispatch, status]);

  if (token && (status === "idle" || status === "loading")) {
    return <FullPageSpinner />;
  }

  if (token && status === "failed") {
    return <FullPageError error={error} />;
  }

  return (
    <div className={css["main-container"]}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="profile/:username" element={<Profile />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
