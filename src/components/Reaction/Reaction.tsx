import { Box, Image, Text } from "grommet";
import { IPostReaction } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";

export const Reaction = ({ reaction }: { reaction: IPostReaction }) => {
  const { count, imageURL } = reaction;

  return (
    <ReactionBox>
      <Box>
        <Image width="16px" src={imageURL} fit="cover" />
      </Box>
      <Text color="text-weak" size="xsmall">
        {count}
      </Text>
    </ReactionBox>
  );
};

export const ReactionBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      width="fit-content"
      align="center"
      justify="start"
      pad={{ vertical: "4px", horizontal: "6px" }}
      background="background-contrast"
      direction="row"
      gap="small"
      round={UNIT_1}
    >
      {children}
    </Box>
  );
};
