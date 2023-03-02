import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCredentials,
  selectAccessToken,
  selectAccessTokenExpiresAt,
  selectCurrentUser,
  selectRefreshToken,
  setCredentials,
  setUser,
} from "./../features/Login/authSlice";

import { useLazyMeQuery, useRefreshTokenMutation } from "../api/cyfeedApi";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
} from "../constants";

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const accessTokenExpiryTime = useSelector(selectAccessTokenExpiresAt);

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
        localStorage.setItem(
          ACCESS_TOKEN,
          JSON.stringify(newCredentials.accessToken)
        );
        localStorage.setItem(
          REFRESH_TOKEN,
          JSON.stringify(newCredentials.refreshToken)
        );
        localStorage.setItem(
          ACCESS_TOKEN_EXPIRES_AT,
          JSON.stringify(newCredentials.accessTokenExpiresAt)
        );
      }

      const { accessToken, refreshToken, accessTokenExpiresAt } =
        newCredentials;

      dispatch(
        setCredentials({
          accessToken,
          refreshToken,
          accessTokenExpiresAt,
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!refreshToken) {
        return;
      }

      if (
        accessTokenExpiryTime &&
        new Date(accessTokenExpiryTime).getTime() - Date.now() < 5 * 60 * 1000
      ) {
        !tokenIsFetching && refreshOnTokenExpire(refreshToken);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [
    accessTokenExpiryTime,
    refreshOnTokenExpire,
    refreshToken,
    tokenIsFetching,
  ]);

  return {
    user,
    userIsFetching,
    tokenIsFetching,
    accessToken,
    refreshToken,
  };
};
