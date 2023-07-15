import { Box, Nav, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetUserByIdResponse } from "../../api/types/getUserById";
import { Goose24 } from "../About/assets/Goose24";
import { CustomNavLink } from "./Navbar";

export const HeaderDesktop = ({
  user,
  userIsFetching,
  onLogout,
}: {
  user: IGetUserByIdResponse | null;
  userIsFetching: boolean;
  onLogout(): void;
}) => {
  const isLoggedIn = Boolean(user);

  return (
    <Nav fill="horizontal" direction="row">
      <Logo />
      <Box fill="horizontal" direction="row" justify="between">
        <Box direction="row" gap="small">
          <Text color="text-xweak">{"* * *"}</Text>
          <CustomNavLink to="/">
            {({ isActive }) => (
              <Text size="small" color={isActive ? "brand" : "white"}>
                [ГЛАВНАЯ]
              </Text>
            )}
          </CustomNavLink>
          <Text alignSelf="center" color="text-xweak" size="small">
            &#8227;
          </Text>
          <CustomNavLink to="about">
            {({ isActive }) => (
              <Text size="small" color={isActive ? "brand" : "white"}>
                [О СООБЩЕСТВЕ]
              </Text>
            )}
          </CustomNavLink>
          <Text color="text-xweak">{"* * *"}</Text>
          {isLoggedIn && (
            <CustomNavLink to="new-post">
              {({ isActive }) => (
                <>
                  <Text size="small" color={isActive ? "brand" : "white"}>
                    [+][НАПИСАТЬ]
                  </Text>
                </>
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
          {isLoggedIn && (
            <CustomNavLink to={`profile/me`}>
              {({ isActive }) => (
                <Text size="small" color={isActive ? "brand" : "white"}>
                  Профиль
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
  const navigate = useNavigate();

  return (
    <LinkBox
      focusIndicator={false}
      onClick={() => navigate("/")}
      direction="row"
      gap="small"
      flex={{ shrink: 0 }}
      align="center"
    >
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
    </LinkBox>
  );
};

const LinkBox = styled(Box)`
  cursor: pointer;
`;
