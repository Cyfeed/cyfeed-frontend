import { useParams } from "react-router-dom";
import { useGetPostCommentsQuery, useGetPostQuery } from "../../api/cyfeedApi";
import { Divider } from "../../components/Divider";
import { Comments } from "../Comments";
import { PostView } from "./PostView";

export const PostContainer = () => {
  const { id = "" } = useParams();

  const { data: post } = useGetPostQuery({ id });
  const { data: comments, refetch } = useGetPostCommentsQuery({ postId: id });

  if (!post) {
    return null;
  }

  return (
    <>
      <PostView post={post} />
      {comments && (
        <>
          <Divider />
          <Comments comments={comments} refetch={refetch} />
        </>
      )}
    </>
  );
};
