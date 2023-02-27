import { Box, Nav, Text } from "grommet";
import { IGetUserByIdResponse } from "../../api/types/getUserById";
import { Goose24 } from "../About/assets/Goose24";
import { CustomNavLink } from "./Navbar";

export const HeaderDesktop = ({
  user,
  userIsFetching,
}: {
  user: IGetUserByIdResponse | null;
  userIsFetching: boolean;
}) => {
  const isLoggedIn = Boolean(user);

  return (
    <Nav fill="horizontal" direction="row">
      <Logo />
      <Box fill="horizontal" direction="row" justify="between">
        <Box direction="row" gap="small">
          <CustomNavLink to="/">
            {({ isActive }) => (
              <Text size="small" color={isActive ? "brand" : "white"}>
                [ГЛАВНАЯ]
              </Text>
            )}
          </CustomNavLink>
          <CustomNavLink to="about">
            {({ isActive }) => (
              <Text size="small" color={isActive ? "brand" : "white"}>
                [О СООБЩЕСТВЕ]
              </Text>
            )}
          </CustomNavLink>
          {isLoggedIn && (
            <CustomNavLink to="new-post">
              {({ isActive }) => (
                <Text size="small" color={isActive ? "brand" : "white"}>
                  [+][НАПИСАТЬ]
                </Text>
              )}
            </CustomNavLink>
          )}
        </Box>
        <Box direction="row" gap="small">
          {!isLoggedIn && !userIsFetching && (
            <CustomNavLink to="login">
              {({ isActive }) => (
                <Text size="small" color={isActive ? "brand" : "white"}>
                  [ВХОД]
                </Text>
              )}
            </CustomNavLink>
          )}
          {!isLoggedIn && !userIsFetching && (
            <CustomNavLink to="join">
              {({ isActive }) => (
                <Text size="small" color={isActive ? "brand" : "white"}>
                  [ПРИСОЕДИНИТЬСЯ]
                </Text>
              )}
            </CustomNavLink>
          )}
        </Box>
      </Box>
    </Nav>
  );
};

export const Logo = () => {
  return (
    <Box direction="row" gap="small" flex={{ shrink: 0 }} align="center">
      <Goose24 />
      <Box
        pad={{ horizontal: "small" }}
        color="brand"
        border={{ color: "brand", size: "1px" }}
        direction="row"
        align="center"
      >
        <Text size="small" color="brand">
          CYFEED
        </Text>
      </Box>
    </Box>
  );
};
