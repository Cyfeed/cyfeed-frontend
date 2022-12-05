import { Header, Menu, Nav, ResponsiveContext, Text } from "grommet";

import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

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
            <Nav direction="row">
              <Text onClick={() => navigate("feed")}>Главная</Text>
              <Text onClick={() => navigate("login")}>Войти</Text>
              <Text onClick={() => navigate("join")}>Зарегистрироваться</Text>
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};
