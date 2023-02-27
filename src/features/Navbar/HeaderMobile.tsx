import { Box, DropButton, Text } from "grommet";
import { Menu } from "grommet-icons";
import { useState } from "react";
import styled from "styled-components";
import { IGetUserByIdResponse } from "../../api/types/getUserById";
import { Logo } from "./HeaderDesktop";
import { CustomNavLink } from "./Navbar";

export const HeaderMobile = ({
  user,
  userIsFetching,
}: {
  user: IGetUserByIdResponse | null;
  userIsFetching: boolean;
}) => {
  const isLoggedIn = Boolean(user);
  const [open, setOpen] = useState<boolean | undefined>();

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box fill="horizontal" direction="row" justify="between">
      <Logo />
      <DropButton
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        dropAlign={{ right: "left", top: "bottom" }}
        dropContent={
          <Box
            background="white"
            pad="medium"
            width={{ min: "188px", max: "188px" }}
          >
            <Text color="active" size="small" margin={{ vertical: "small" }}>
              МЕНЮ · · ·
            </Text>
            <CustomNavLink to="/" onClick={onClose}>
              <Text color="black" size="small">
                [ГЛАВНАЯ]
              </Text>
            </CustomNavLink>
            <CustomNavLink to="about" onClick={onClose}>
              <Text color="black" size="small">
                [О СООБЩЕСТВЕ]
              </Text>
            </CustomNavLink>
            <CustomNavLink to="new-post" onClick={onClose}>
              <Text color="black" size="small">
                [+][НАПИСАТЬ]
              </Text>
            </CustomNavLink>
            <Text color="active" size="small" margin={{ vertical: "small" }}>
              · · ·
            </Text>

            {!isLoggedIn && !userIsFetching && (
              <CustomNavLink to="login" onClick={onClose}>
                <UnderlineText size="small" color="black">
                  Вход
                </UnderlineText>
              </CustomNavLink>
            )}
            {!isLoggedIn && !userIsFetching && (
              <CustomNavLink to="join" onClick={onClose}>
                <UnderlineText size="small" color="black">
                  Присоединиться
                </UnderlineText>
              </CustomNavLink>
            )}

            {isLoggedIn && (
              <>
                <CustomNavLink to={`page/${user?.username}`} onClick={onClose}>
                  <UnderlineText size="small" color="black">
                    Профиль
                  </UnderlineText>
                </CustomNavLink>

                <Text
                  size="small"
                  color="active"
                  margin={{ top: "small" }}
                  onClick={onClose}
                >
                  Выйти
                </Text>
              </>
            )}
          </Box>
        }
      >
        <Menu />
      </DropButton>
    </Box>
  );
};

const UnderlineText = styled(Text)`
  text-decoration: underline;
`;
