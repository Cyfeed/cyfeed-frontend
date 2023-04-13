import React from "react";
import { useTagsQuery } from "../../api/cyfeedApi";
import { NewPost } from "./NewPost";

type Props = {};

export const NewPostContainer = (props: Props) => {
  const { data: tags = [] } = useTagsQuery();

  return <NewPost tagsSource={tags} mode="new" />;
};
