import { Box, Paragraph } from "grommet";
import { useGetUserByUsernameQuery } from "../../api/cyfeedApi";
import { ProfileData } from "./ProfileData";
import { ProfileHead } from "./ProfileHead";

type Props = {
  username: string;
};

export const Profile = ({ username }: Props) => {
  const { data: user, isFetching } = useGetUserByUsernameQuery(username);

  if (isFetching) {
    return null;
  }

  if (!user) {
    return <Paragraph>Такого пользователя не существует</Paragraph>;
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
