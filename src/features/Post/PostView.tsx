import { Box, Button, Heading, Markdown, Paragraph, Text } from "grommet";
import { Close } from "grommet-icons";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { IPostTag, IPostViewItem } from "../../api/types/getFeed";
import { IReaction } from "../../api/types/getReactions";
import { Reaction } from "../../components/Reaction/Reaction";
import { HACKED_GREEN, UNIT_1, UNIT_2 } from "../../theme";
import { relativeTimeFromDates } from "../../utils/relativeTime";
import { AddReaction } from "../AddReaction";
import { useParams } from "react-router-dom";
import {
  usePutReactionMutation,
  useRemoveReactionMutation,
} from "../../api/cyfeedApi";
import { count } from "console";

interface IProps {
  post: IPostViewItem;
}

export const PostView = ({ post }: IProps) => {
  const {
    title,
    author,
    link,
    publishedAt,
    text,
    tags = [],
    reactions = [],
  } = post;

  const [optimisticReactions, setOptimisticReactions] = useState(reactions);
  const [putReaction] = usePutReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const { id: postId } = useParams();

  const addReactionOptimistically = useCallback(
    (newReaction: IReaction) => {
      const existingReactionIndex = optimisticReactions.findIndex(
        ({ id }) => id === newReaction.id
      );

      if (existingReactionIndex !== -1) {
        setOptimisticReactions(
          optimisticReactions.map((reaction) =>
            reaction.id === newReaction.id
              ? { ...reaction, count: reaction.count + 1, reacted: true }
              : reaction
          )
        );
      } else {
        setOptimisticReactions([
          ...optimisticReactions,
          { ...newReaction, count: 1, reacted: true },
        ]);
      }
    },
    [optimisticReactions]
  );

  const removeReactionOptimistically = useCallback(
    (newReaction: IReaction) => {
      const existingReactionIndex = optimisticReactions.findIndex(
        ({ id }) => id === newReaction.id
      );

      if (existingReactionIndex !== -1) {
        setOptimisticReactions(
          optimisticReactions
            .map((reaction) => {
              if (reaction.id === newReaction.id) {
                return {
                  ...reaction,
                  count: reaction.count - 1,
                  reacted: false,
                };
              }

              return reaction;
            })
            .filter((reaction) => reaction.count > 0)
        );
      }
    },
    [optimisticReactions]
  );

  const handleReactionClick = useCallback(
    async (newReaction: IReaction) => {
      console.log("🚀 --- newReaction:", newReaction);
      if (
        optimisticReactions.find(({ id }) => id === newReaction.id)?.reacted
      ) {
        return;
      }
      if (postId) {
        addReactionOptimistically(newReaction);
        putReaction({ reactionId: newReaction.id, postId });
      }
    },
    [addReactionOptimistically, optimisticReactions, postId, putReaction]
  );

  const removeReactionClick = useCallback(
    async (reaction: IReaction) => {
      if (reaction.reacted) {
        if (postId) {
          removeReactionOptimistically(reaction);
          removeReaction({ reactionId: reaction.id, postId });
        }
      }
    },
    [postId, removeReaction, removeReactionOptimistically]
  );

  const goTo = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Box>
      <Box direction="row" gap="medium">
        <Text color="white" size="small">
          {author}
        </Text>
        <Text color="text-xweak" size="small">
          &#9658;
        </Text>
        <Text color="text-xweak" size="small">
          {relativeTimeFromDates(new Date(publishedAt))}
        </Text>
      </Box>
      <ReactionsBox direction="row" margin={{ top: "small" }}>
        {optimisticReactions.length !== 0 && (
          <Box gap="small" direction="row" wrap>
            {optimisticReactions?.map((reaction) => (
              <Reaction
                reaction={reaction}
                key={reaction.id}
                addReaction={handleReactionClick}
                removeReaction={removeReactionClick}
                postView
              />
            ))}
          </Box>
        )}

        <AddReaction addReaction={handleReactionClick} />
      </ReactionsBox>
      {link ? (
        <LinkBox
          onClick={() => goTo(link)}
          direction="column"
          margin={{ vertical: "medium" }}
          gap="small"
        >
          <Heading margin="none" weight="normal" level={3}>
            {title}
          </Heading>
          <Text color="text-xweak" size="xsmall">
            ({link})
          </Text>
        </LinkBox>
      ) : (
        <Box margin={{ vertical: "medium" }}>
          <Heading margin="none" weight="normal" level={3}>
            {title}
          </Heading>
        </Box>
      )}

      {text && (
        <StyledMD components={{ p: <Paragraph size="medium" fill /> }}>
          {text}
        </StyledMD>
      )}
      <Box margin={{ top: "medium" }}>
        <Tags tags={tags} />
      </Box>
    </Box>
  );
};

export const Tags = ({
  tags,
  onRemove,
}: {
  tags: IPostTag[];
  onRemove?(id: string): void;
}) => {
  return (
    <Box direction="row" wrap gap="small">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} onRemove={onRemove} />
      ))}
    </Box>
  );
};

const Tag = ({
  tag,
  onRemove,
}: {
  tag: IPostTag;
  onRemove?(id: string): void;
}) => {
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
      <Text color="text-weak">{`/${tag.name}`}</Text>
      {onRemove && (
        <Button
          plain
          icon={<Close size="8px" color="text-weak" />}
          onClick={() => onRemove(tag.id)}
        />
      )}
    </Box>
  );
};

const LinkBox = styled(Box)`
  cursor: pointer;
  flex-shrink: 0;
  flex-wrap: wrap;

  &:hover {
    & span {
      transition: color 250ms;
      color: ${HACKED_GREEN};
    }
  }
`;

const ReactionsBox = styled(Box)`
  gap: ${UNIT_2};
`;

const StyledMD = styled(Markdown)`
  word-break: break-word;
`;
