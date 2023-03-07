import { Box, DropButton, Image, Text } from "grommet";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetReactionsQuery,
  usePutReactionMutation,
} from "../../api/cyfeedApi";
import { IReaction, TGetReactionsResponse } from "../../api/types/getReactions";
import { ReactionBox } from "../../components/Reaction";

type Props = {
  addReaction(newReaction: IReaction): void;
};

export const AddReaction = ({ addReaction }: Props) => {
  const { data: reactions = [] } = useGetReactionsQuery();
  const [open, setOpen] = useState<boolean | undefined>();
  const [putReaction] = usePutReactionMutation();
  const { id: postId } = useParams();

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleClick = useCallback(
    async (id: string) => {
      if (postId) {
        const newReaction = reactions.find((r) => r.id === id);
        if (newReaction) {
          addReaction(newReaction);
        }
        putReaction({ reactionId: id, postId });
        onClose();
      }
    },
    [addReaction, postId, putReaction, reactions]
  );

  return (
    <ReactionBox>
      <DropButton
        title="Добавить реакцию"
        plain
        label={
          <Text margin={{ horizontal: "6px" }} size="medium">
            +
          </Text>
        }
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        dropProps={{
          elevation: "none",
          margin: { top: "4px", left: "6px" },
        }}
        dropAlign={{ left: "right", top: "bottom" }}
        dropContent={
          <ReactionsDrop reactions={reactions} onClick={handleClick} />
        }
      />
    </ReactionBox>
  );
};

const ReactionsDrop = ({
  reactions,
  onClick,
}: {
  reactions: TGetReactionsResponse;
  onClick(id: string): void;
}) => {
  return (
    <Box
      direction="row"
      pad="medium"
      gap="medium"
      wrap
      background="background-contrast"
    >
      {reactions.map(({ id, imageURL }) => (
        <ReactionButton key={id} onClick={() => onClick(id)}>
          <Image width="20px" src={imageURL} />
        </ReactionButton>
      ))}
    </Box>
  );
};

const ReactionButton = styled(Box)`
  cursor: pointer;
`;
