import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  selectAccessToken,
  selectCurrentUser,
  setCredentials,
  setUser,
} from "../../features/Login/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useMeQuery } from "../../api/cyfeedApi";

export function PrivateOutlet() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const { data, error, isFetching } = useMeQuery(undefined, {
    skip: !token || Boolean(user),
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser({ user: data }));
    }

    if (error) {
      localStorage.clear();
      dispatch(setCredentials({ accessToken: null }));
    }
  }, [data, dispatch, error, token, user]);

  const location = useLocation();

  if (user) {
    return <Outlet />;
  }

  if (isFetching) {
    return <div>LOADING</div>;
  }

  if (error || !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
