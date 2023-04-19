import {
  Box,
  Button,
  Heading,
  Markdown,
  Paragraph,
  Text,
  Layer,
} from "grommet";
import { Close } from "grommet-icons";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { IPostTag, IPostViewItem } from "../../api/types/getFeed";
import { IReaction } from "../../api/types/getReactions";
import { Reaction } from "../../components/Reaction/Reaction";
import { HACKED_GREY, HACKED_GREEN, UNIT_1 } from "../../theme";
import { relativeTimeFromDates } from "../../utils/relativeTime";
import { AddReaction } from "../AddReaction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  usePutReactionMutation,
  useRemoveReactionMutation,
} from "../../api/cyfeedApi";
import { selectCurrentUser } from "../Login/authSlice";
import { useSelector } from "react-redux";
import { HACKED_DARK_GREY } from "../../theme";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";
import { LinkText } from "../../components/LinkText/LinkText";

interface IProps {
  post: IPostViewItem;
}

export const PostView = ({ post }: IProps) => {
  const {
    id,
    title,
    author,
    link,
    publishedAt,
    text,
    tags = [],
    reactions = [],
  } = post;

  const navigate = useNavigate();
  const location = useLocation();

  const [optimisticReactions, setOptimisticReactions] = useState(reactions);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [deletePost, { isError, isLoading }] = useDeletePostMutation();

  const handleDeletePost = useCallback(async () => {
    await deletePost({ id })
      .unwrap()
      .then(() => {
        setRemoveModalOpen(false);
        navigate("/");
      });
  }, [deletePost, id, navigate]);

  const onClose = () => setRemoveModalOpen(false);

  const [putReaction] = usePutReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const { id: postId } = useParams();

  const me = useSelector(selectCurrentUser);
  const isMyPost = me?.username === author;

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
      <Box direction="row" gap="small">
        <LinkText
          underline={false}
          size="small"
          onClick={() => navigate(`/profile/${author}`, { state: location })}
        >
          {author}
        </LinkText>
        <Text color="text-xweak" size="small">
          &#8227;
        </Text>
        <Text color="text-xweak" size="small">
          {relativeTimeFromDates(new Date(publishedAt))}
        </Text>
      </Box>
      <Reactions direction="row" margin={{ top: "small" }}>
        {optimisticReactions.length !== 0 && (
          // <Box direction="row" wrap>
          <>
            {optimisticReactions?.map((reaction) => (
              <Reaction
                reaction={reaction}
                key={reaction.id}
                addReaction={handleReactionClick}
                removeReaction={removeReactionClick}
                postView
              />
            ))}
          </>
          // </Box>
        )}

        <AddReaction addReaction={handleReactionClick} />

        {isMyPost && (
          <Box direction="row" gap="4px">
            <LabelButton
              onClick={() => navigate(`/edit-post/${id}`)}
              justify="center"
              color="background-contrast"
            >
              <Text color="text-weak" size="xsmall">
                Редактировать
              </Text>
            </LabelButton>
            <LabelButton
              focusIndicator={false}
              onClick={() => setRemoveModalOpen(true)}
              justify="center"
              color="background-contrast"
            >
              <Text color="text-weak" size="xsmall">
                Удалить
              </Text>
            </LabelButton>
          </Box>
        )}
      </Reactions>
      {link ? (
        <LinkBox
          focusIndicator={false}
          onClick={() => goTo(link)}
          direction="column"
          margin={{ vertical: "medium" }}
          gap="small"
        >
          <Heading margin="none" weight="normal" level={3}>
            {title}
          </Heading>
          <Text color="text-xweak" size="xsmall">
            {new URL(link).host}
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

      {removeModalOpen && (
        <Layer
          id="hello world"
          position="center"
          animate={false}
          onClickOutside={onClose}
          onEsc={onClose}
          background="background-contrast"
        >
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Удалить пост
            </Heading>
            <Text>Вы точно хотите удалить пост?</Text>
            {isError && <Text color="status-error">Не получилось удалить</Text>}
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <CyButton
                label={
                  <Text size="small" color="white">
                    Отменить
                  </Text>
                }
                onClick={onClose}
                color="dark-3"
                size="small"
              />
              <CyButton
                label={
                  <Text size="small" color="black">
                    Удалить
                  </Text>
                }
                loading={isLoading}
                disabled={isLoading}
                size="small"
                onClick={handleDeletePost}
                theme={EButtonTheme.White}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}
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
  if (!tags.length) {
    return null;
  }

  return (
    <TagsBox direction="row" wrap>
      {tags.map((tag, idx) => (
        <Tag key={tag.id || idx} tag={tag} onRemove={onRemove} />
      ))}
    </TagsBox>
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

export const LinkBox = styled(Box)`
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

const StyledMD = styled(Markdown)`
  word-break: break-word;
`;

const LabelButton = styled(Box)`
  background-color: ${HACKED_DARK_GREY};
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${HACKED_GREY};
  }
`;

const TagsBox = styled(Box)`
  gap: 8px;
`;

const Reactions = styled(Box)`
  gap: 4px;
  flex-wrap: wrap;
`;
