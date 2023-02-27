import { Box } from "grommet";
import { Fragment } from "react";
import styled from "styled-components";
import { IPostCommentParent } from "../../api/types/getPostComments";
import { Comment } from "../../components/Comment";

type Props = {
  comments: IPostCommentParent[];
};

export const Comments = ({ comments }: Props) => {
  return (
    <Box>
      {comments.map(({ comment, child }) => (
        <Fragment key={comment.id}>
          <ParentBox margin={{ vertical: "medium" }}>
            <Comment comment={comment} />
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
                  <Comment comment={comment} />
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
