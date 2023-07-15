import React from "react";
import { useGetPostQuery, useTagsQuery } from "../../api/cyfeedApi";
import { useParams } from "react-router-dom";
import { NewPost } from "../NewPost";

type Props = {};

export const EditPost = (props: Props) => {
  const { id = "" } = useParams();

  const { data: post, isLoading } = useGetPostQuery({ id });
  const { data: tags = [] } = useTagsQuery();

  const data = {
    title: post?.title ?? "",
    text: post?.text ?? "",
    link: post?.link ?? "",
  };

  if (isLoading) {
    return null;
  }

  return (
    <NewPost
      postId={id}
      post={data}
      tags={post?.tags}
      mode="edit"
      tagsSource={tags}
    />
  );
};
