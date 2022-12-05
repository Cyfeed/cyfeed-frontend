import {
  Box,
  Button,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
  Text,
} from "grommet";

import { selectCurrentUser } from "../Login/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Header pad="medium">
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "xsmall" ? (
            <Menu
              label="Menu"
              items={[
                { label: "This is", onClick: () => {} },
                { label: "The Menu", onClick: () => {} },
                { label: "Component", onClick: () => {} },
              ]}
            />
          ) : (
            <Nav fill="horizontal" direction="row" justify="between">
              <Box direction="row" gap="small">
                <Button
                  plain
                  onClick={() => navigate("feed")}
                  label="Главная"
                />
                <Button
                  plain
                  onClick={() => navigate("new-post")}
                  label="Создать"
                />
              </Box>
              <Box direction="row" gap="small">
                {currentUser ? (
                  <Text>{currentUser.username}</Text>
                ) : (
                  <>
                    <Button
                      plain
                      onClick={() => navigate("login")}
                      label="Войти"
                    />
                    <Button plain onClick={() => navigate("join")} />
                  </>
                )}
              </Box>
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};
