import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export function PrivateOutlet() {
  const location = useLocation();

  const { user, userIsFetching, tokenIsFetching, accessToken, refreshToken } =
    useAuth();

  if (user) {
    return <Outlet />;
  }

  if (userIsFetching || tokenIsFetching) {
    return <div>LOADING</div>;
  }

  if (!user && !accessToken && !refreshToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return null;
}
