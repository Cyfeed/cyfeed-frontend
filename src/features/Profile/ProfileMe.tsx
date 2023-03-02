import { Box } from "grommet";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Login/authSlice";
import { ProfileData } from "./ProfileData";
import { ProfileHead } from "./ProfileHead";

type IProps = {};

export const ProfileMe = (props: IProps) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return null;
  }

  return (
    <Box gap="medium">
      <ProfileHead
        name={`${user?.firstname} ${user?.lastname}`}
        username={user?.username}
      />
      <ProfileData data={user} />
    </Box>
  );
};
