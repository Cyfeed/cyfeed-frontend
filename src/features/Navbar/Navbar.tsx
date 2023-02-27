import { Header, ResponsiveContext } from "grommet";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export const Navbar = () => {
  const { user, userIsFetching } = useAuth();

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
