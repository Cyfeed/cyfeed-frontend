import { Box, Button, FormField, Paragraph, Text, TextArea } from "grommet";
import { Close, Send } from "grommet-icons";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useLazySendPostCommentQuery } from "../../api/cyfeedApi";
import { IPostComment } from "../../api/types/getPostComments";

type Props = {
  comment: IPostComment;
  canAnswer: boolean;
  refetch(): void;
};

export const Comment = ({ comment, canAnswer, refetch }: Props) => {
  const { id = "" } = useParams();
  const [sendComment, { isFetching }] = useLazySendPostCommentQuery();
  const { authorName, text } = comment;
  const [answerActive, setAnswerActive] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");

  const send = useCallback(async () => {
    if (id && answer.length > 0) {
      const response = await sendComment({
        postId: id,
        text: answer,
        parent: comment.id,
      }).unwrap();

      if (response.id) {
        setAnswer("");
        refetch();
        setAnswerActive(false);
      }
    }
  }, [answer, comment.id, id, refetch, sendComment]);

  return (
    <>
      <Box>
        <LinkText size="small">{authorName}</LinkText>
        <Paragraph margin={{ vertical: "small" }} size="small" fill>
          {text}
        </Paragraph>
        {!answerActive && canAnswer && (
          <Button
            plain
            onClick={() => setAnswerActive(true)}
            label={
              <LinkText color="text-xweak" size="small">
                Ответить
              </LinkText>
            }
          />
        )}
        {answerActive && (
          <ReplyField>
            <Box direction="row" align="center" gap="small">
              <TextArea
                disabled={isFetching}
                size="small"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button
                disabled={isFetching}
                onClick={send}
                icon={<Send size="medium" color="brand" />}
              />
              <Box alignSelf="start">
                <Button
                  onClick={() => setAnswerActive(false)}
                  plain
                  icon={<Close size="small" color="active" />}
                />
              </Box>
            </Box>
          </ReplyField>
        )}
      </Box>
    </>
  );
};

const LinkText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;

const ReplyField = styled(FormField)`
  & > div {
    border: none;
  }
`;
