import { useAuthRequired } from "hooks/useAuthRequired";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth: FC = () => {
  const { auth, from } = useAuthRequired();

  if (!auth) {
    return <Navigate to="/login" state={from} replace />;
  }

  return <Outlet />;
};
