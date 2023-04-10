import { Box, DropButton, Image, Text } from "grommet";
import { useCallback, useState } from "react";

import styled from "styled-components";
import { useGetReactionsQuery } from "../../api/cyfeedApi";
import { IReaction, TGetReactionsResponse } from "../../api/types/getReactions";
import { ReactionBox } from "../../components/Reaction";
import { IPostReaction } from "../../api/types/getFeed";

type Props = {
  addReaction(reaction: IPostReaction): void;
};

export const AddReaction = ({ addReaction }: Props) => {
  const { data: reactions = [] } = useGetReactionsQuery();
  const [open, setOpen] = useState<boolean | undefined>();

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleClick = useCallback(
    (reaction: IPostReaction) => {
      addReaction(reaction);
      onClose();
    },
    [addReaction]
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
  onClick(reaction: IReaction): void;
}) => {
  return (
    <ReactionsDropContainer
      direction="row"
      pad="small"
      wrap
      background="background-contrast"
      width={{ max: "128px" }}
    >
      {reactions.map((reaction) => (
        <ReactionButton key={reaction.id} onClick={() => onClick(reaction)}>
          <Image width="20px" src={reaction.imageURL} />
        </ReactionButton>
      ))}
    </ReactionsDropContainer>
  );
};

const ReactionButton = styled(Box)`
  cursor: pointer;
`;

const ReactionsDropContainer = styled(Box)`
  gap: 12px;
`;
