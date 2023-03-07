import { Box, Button, Paragraph, Text } from "grommet";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPostComment } from "../../api/types/getPostComments";
import { selectCurrentUser } from "../../features/Login/authSlice";
import { ReplyInput } from "../ReplyInput";

type Props =
  | {
      comment: IPostComment;
      canAnswer: true;
      onSend(answer: string, commentId: string, postId: string): void;
      sendIsFetching: boolean;
      activeReplyId: string | null;
      setActiveReplyId(id: string): void;
    }
  | {
      comment: IPostComment;
      canAnswer: false;
      onSend?: undefined;
      sendIsFetching?: undefined;
      activeReplyId: string | null;
      setActiveReplyId(id: string): void;
    };

export const Comment = ({
  comment,
  canAnswer,
  onSend,
  sendIsFetching,
  activeReplyId,
  setActiveReplyId,
}: Props) => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const {
    author: { authorName, id: authorId, workPosition },
    text,
  } = comment;
  const answerActive = comment.id === activeReplyId;

  const setAnswerActive = useCallback(() => {
    setActiveReplyId(comment.id);
  }, [comment.id, setActiveReplyId]);

  const handleSend = useCallback(
    async (answer: string) => {
      if (canAnswer) {
        await onSend(answer, id, comment.id);
      }
    },
    [canAnswer, comment.id, id, onSend]
  );

  return (
    <>
      <Box>
        <LinkText
          size="small"
          onClick={() =>
            navigate(
              authorId === user?.id ? `/profile/me` : `/profile/${authorId}`,
              { replace: true }
            )
          }
        >
          {authorName}
        </LinkText>
        <Text margin={{ top: "xxsmall" }} color="text-xweak" size="small">
          {workPosition}
        </Text>
        <Paragraph margin={{ vertical: "small" }} size="small" fill>
          {text}
        </Paragraph>
        {!answerActive && canAnswer && (
          <Button
            plain
            onClick={setAnswerActive}
            label={
              <LinkText color="text-xweak" size="small">
                Ответить
              </LinkText>
            }
          />
        )}
        {answerActive && canAnswer && (
          <ReplyInput isFetching={sendIsFetching} onSend={handleSend} />
        )}
      </Box>
    </>
  );
};

const LinkText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;
