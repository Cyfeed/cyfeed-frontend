import { Header, ResponsiveContext } from "grommet";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cyfeedApi } from "../../api/cyfeedApi";
import { selectCurrentUser } from "../Login/authSlice";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const { isFetching: userIsFetching } = cyfeedApi.endpoints.me.useQueryState();

  return (
    <Header pad="medium">
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" || responsive === "xsmall" ? (
            <HeaderMobile user={user} userIsFetching={userIsFetching} />
          ) : (
            <HeaderDesktop user={user} userIsFetching={userIsFetching} />
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;
