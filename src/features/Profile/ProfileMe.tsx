import { Box, Button, Text } from "grommet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../Login/authSlice";
import { ProfileData } from "./ProfileData";
import { ProfileHead } from "./ProfileHead";

type IProps = {};

export const ProfileMe = (props: IProps) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

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
    </Box>
  );
};
