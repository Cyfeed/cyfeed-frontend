import { Box } from "grommet";
import { Fragment, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useLazySendPostCommentQuery } from "../../api/cyfeedApi";
import { IPostCommentParent } from "../../api/types/getPostComments";
import { Comment } from "../../components/Comment";
import { ReplyInput } from "../../components/ReplyInput";

type Props = {
  comments: IPostCommentParent[];
  refetch(): void;
};

export const Comments = ({ comments, refetch }: Props) => {
  const [sendComment, { isFetching }] = useLazySendPostCommentQuery();
  const { id = "" } = useParams();

  const send = useCallback(
    async (answer: string, postId: string, parentId?: string) => {
      if (postId && answer.length > 0) {
        const response = await sendComment({
          postId,
          text: answer,
          parent: parentId,
        }).unwrap();

        if (response.id) {
          refetch();
        }
      }
    },
    [refetch, sendComment]
  );

  return (
    <Box>
      <ReplyInput
        isFetching={isFetching}
        onSend={(answer) => send(answer, id)}
      />
      {comments.map(({ comment, child }) => (
        <Fragment key={comment.id}>
          <ParentBox margin={{ vertical: "medium" }}>
            <Comment
              comment={comment}
              canAnswer
              onSend={send}
              sendIsFetching={isFetching}
            />
          </ParentBox>
          <ChildBox
            pad={{ left: "large" }}
            border={{
              color: "active",
              side: "left",
              size: "1px",
              style: "dashed",
            }}
          >
            {child &&
              child.length > 0 &&
              child.map((comment) => (
                <Box key={comment.id} margin={{ bottom: "medium" }}>
                  <Comment comment={comment} canAnswer={false} />
                </Box>
              ))}
          </ChildBox>
        </Fragment>
      ))}
    </Box>
  );
};

const ParentBox = styled(Box)``;
const ChildBox = styled(Box)``;
