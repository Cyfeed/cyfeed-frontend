import {
  selectAccessToken,
  selectCurrentUser,
  setUser,
} from "./../features/Login/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { useLazyMeQuery } from "../api/cyfeedApi";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [me, { data }] = useLazyMeQuery();

  useEffect(() => {
    if (!user && token) {
      me();
    }

    if (data) {
      dispatch(setUser({ user: data }));
    }
  }, [data, dispatch, me, token, user]);

  return useMemo(() => ({ user: user || data }), [user, data]);
};
