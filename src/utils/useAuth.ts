import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
  setUser,
} from "./../features/Login/authSlice";

import { useLazyMeQuery } from "../api/cyfeedApi";

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const [getMe, { isFetching: userIsFetching }] = useLazyMeQuery();

  const getUser = useCallback(async () => {
    const me = await getMe().unwrap();
    dispatch(setUser({ user: me }));
  }, [dispatch, getMe]);

  useEffect(() => {
    if (!user && (accessToken || refreshToken)) {
      getUser();
    }
  }, [accessToken, getUser, refreshToken, user]);

  return {
    user,
    userIsFetching,
    accessToken,
  };
};
