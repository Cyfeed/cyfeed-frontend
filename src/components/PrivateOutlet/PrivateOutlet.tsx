import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  resetCredentials,
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
  setCredentials,
  setUser,
} from "../../features/Login/authSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyMeQuery, useRefreshTokenMutation } from "../../api/cyfeedApi";

export function PrivateOutlet() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const [getMe, { isFetching: userIsFetching, isError: isGetMeError }] =
    useLazyMeQuery();
  const [
    refresh,
    { isLoading: tokenIsFetching, isError: isRefreshTokenError },
  ] = useRefreshTokenMutation();

  const refreshOnTokenExpire = useCallback(
    async (token: string) => {
      const newCredentials = await refresh(token).unwrap();

      if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN, newCredentials.accessToken);
        localStorage.setItem(REFRESH_TOKEN, newCredentials.refreshToken);
      }

      dispatch(
        setCredentials({
          accessToken: newCredentials.accessToken,
          refreshToken: newCredentials.refreshToken,
        })
      );
    },
    [dispatch, refresh]
  );

  const getUser = useCallback(async () => {
    const me = await getMe().unwrap();
    dispatch(setUser({ user: me }));
  }, [dispatch, getMe]);

  useEffect(() => {
    if (!user && accessToken) {
      getUser();
    }
  }, [accessToken, getUser, user]);

  useEffect(() => {
    if (isGetMeError && refreshToken) {
      refreshOnTokenExpire(refreshToken);
    }
  }, [isGetMeError, refreshOnTokenExpire, refreshToken]);

  useEffect(() => {
    if (isRefreshTokenError) {
      localStorage.clear();
      dispatch(resetCredentials());
    }
  }, [dispatch, isRefreshTokenError]);

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
