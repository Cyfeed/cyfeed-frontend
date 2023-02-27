import { Box, Image, Text } from "grommet";
import { IPostReaction } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";

export const Reaction = ({ reaction }: { reaction: IPostReaction }) => {
  const { count, imageURL } = reaction;

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
      <Box width="12px" height="12px">
        <Image width="12px" src={imageURL} fit="contain" />
      </Box>
      <Text color="text-weak" size="xsmall">
        {count}
      </Text>
    </Box>
  );
};
