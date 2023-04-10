import { Box, Button, Text } from "grommet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../Login/authSlice";
import { ProfileData } from "./ProfileData";
import { ProfileHead } from "./ProfileHead";
import { useCallback } from "react";

type IProps = {};

export const ProfileMe = (props: IProps) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("login", { replace: true });
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box gap="medium">
      <ProfileHead
        name={`${user?.firstname} ${user?.lastname}`}
        username={user?.username}
      />
      <Button
        onClick={() => navigate("/profile/edit")}
        plain
        label={<Text size="small">{"[Редактировать профиль]"}</Text>}
      />
      <ProfileData data={user} />
      <Button
        onClick={handleLogout}
        plain
        label={<Text size="small">{"[Выйти]"}</Text>}
      />
    </Box>
  );
};
