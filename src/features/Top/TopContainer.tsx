import { Box } from "grommet";
import { FeedItem } from "../../components/FeedItem";
import { Filters } from "./Filters";
import styled from "styled-components";
import { useGetFeedQuery } from "../../api/cyfeedApi";
import { useState } from "react";

export enum ETimeFilter {
  Week = "week",
  Month = "month",
  AllTime = "alltime",
}

export const TopContainer = () => {
  const [filter, setFilter] = useState<ETimeFilter>(ETimeFilter.Week);

  const { data: posts = [] } = useGetFeedQuery({ type: "top" });

  return (
    <Box gap="medium">
      <Filters value={filter} onChange={setFilter} />
      <PostsBox>
        {posts.map((post) => (
          <FeedItem key={post.id} post={post} />
        ))}
      </PostsBox>
    </Box>
  );
};

const PostsBox = styled(Box)`
  & > * {
    border-top-style: dashed;
    border-top: 1px solid white;
  }

  &:last-child {
    border-bottom-style: dashed;
    border-bottom: 1px solid white;
  }
`;
