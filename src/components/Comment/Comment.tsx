import { Box, Button, Paragraph, Text } from "grommet";
import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IPostComment } from "../../api/types/getPostComments";
import { LinkText } from "../LinkText/LinkText";
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

  const location = useLocation();

  const {
    author: { authorName, workPosition },
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
          underline
          size="small"
          onClick={() =>
            navigate(`/profile/${authorName}`, { state: location })
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
              <LinkText underline color="text-xweak" size="small">
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
