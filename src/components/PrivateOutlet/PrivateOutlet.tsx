import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { cyfeedApi } from "../../api/cyfeedApi";
import {
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
} from "../../features/Login/authSlice";

export function PrivateOutlet() {
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const { isFetching: userIsFetching } = cyfeedApi.endpoints.me.useQueryState();
  const [, { isLoading: tokenIsFetching }] =
    cyfeedApi.endpoints.refreshToken.useMutation();

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
