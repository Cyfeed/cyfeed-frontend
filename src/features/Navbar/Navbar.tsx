import { Header, ResponsiveContext } from "grommet";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { cyfeedApi } from "../../api/cyfeedApi";
import { logout, selectCurrentUser } from "../Login/authSlice";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";
import { useCallback } from "react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { isFetching: userIsFetching } = cyfeedApi.endpoints.me.useQueryState();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <Header pad="medium">
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" || responsive === "xsmall" ? (
            <HeaderMobile
              onLogout={handleLogout}
              user={user}
              userIsFetching={userIsFetching}
            />
          ) : (
            <HeaderDesktop
              onLogout={handleLogout}
              user={user}
              userIsFetching={userIsFetching}
            />
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;
