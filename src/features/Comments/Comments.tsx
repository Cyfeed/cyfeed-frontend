import { Box } from "grommet";
import { Fragment } from "react";
import styled from "styled-components";
import { IPostCommentParent } from "../../api/types/getPostComments";
import { Comment } from "../../components/Comment";

type Props = {
  comments: IPostCommentParent[];
  refetch(): void;
};

export const Comments = ({ comments, refetch }: Props) => {
  return (
    <Box>
      {comments.map(({ comment, child }) => (
        <Fragment key={comment.id}>
          <ParentBox margin={{ vertical: "medium" }}>
            <Comment comment={comment} canAnswer refetch={refetch} />
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
                  <Comment
                    comment={comment}
                    canAnswer={false}
                    refetch={refetch}
                  />
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
