import { Box, Image, Text } from "grommet";
import { IPostReaction } from "../../api/types/getFeed";
import { HACKED_STROKE, UNIT_1 } from "../../theme";
import { useCallback } from "react";

export const Reaction = ({
  reaction,
  addReaction,
  removeReaction,
  postView = false,
}: {
  reaction: IPostReaction;
  addReaction?(reaction: IPostReaction): void;
  removeReaction?(reaction: IPostReaction): void;
  postView?: boolean;
}) => {
  const { count, imageURL, reacted } = reaction;

  const handleClick = useCallback(() => {
    if (reacted && removeReaction) {
      return removeReaction(reaction);
    }

    if (addReaction) {
      addReaction(reaction);
    }
  }, [addReaction, reacted, reaction, removeReaction]);

  return (
    <ReactionBox onClick={handleClick} reacted={postView && reacted}>
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
      focusIndicator={false}
      onClick={onClick}
      width="fit-content"
      align="center"
      justify="start"
      pad={{ vertical: "2px", horizontal: "6px" }}
      background={reacted ? HACKED_STROKE : "background-contrast"}
      direction="row"
      gap="8px"
      round={UNIT_1}
    >
      {children}
    </Box>
  );
};
