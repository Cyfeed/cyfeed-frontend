import { Box, Image, Text } from "grommet";
import { IPostReaction } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";

export const Reaction = ({
  reaction,
  addReaction,
  postView = false,
}: {
  reaction: IPostReaction;
  addReaction?(reaction: IPostReaction): void;
  postView?: boolean;
}) => {
  const { count, imageURL, reacted } = reaction;

  return (
    <ReactionBox
      onClick={addReaction ? () => addReaction(reaction) : undefined}
      reacted={postView && reacted}
    >
      <Box>
        <Image width="16px" src={imageURL} fit="cover" />
      </Box>
      <Text color="text-weak" size="xsmall">
        {count}
      </Text>
    </ReactionBox>
  );
};

export const ReactionBox = ({
  children,
  onClick,
  reacted = false,
}: {
  children: React.ReactNode;
  onClick?(): void;
  reacted?: boolean;
}) => {
  return (
    <Box
      onClick={onClick}
      width="fit-content"
      align="center"
      justify="start"
      pad={{ vertical: "4px", horizontal: "6px" }}
      background="background-contrast"
      direction="row"
      gap="8px"
      round={UNIT_1}
      border={
        reacted
          ? {
              color: "text-xweak",
              size: "1px",
            }
          : undefined
      }
    >
      {children}
    </Box>
  );
};
