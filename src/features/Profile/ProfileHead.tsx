import { Box, Heading, Text } from "grommet";

type Props = {
  name: string;
  username: string;
};

export const ProfileHead = ({ name, username }: Props) => {
  return (
    <Box direction="column">
      <Heading weight="normal" margin="none" level={3}>
        {name}
      </Heading>
      <Text color="text-xweak" size="medium">
        {`@${username}`}
      </Text>
    </Box>
  );
};
