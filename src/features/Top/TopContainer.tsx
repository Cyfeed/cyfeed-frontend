import { Box } from "grommet";
import { useState } from "react";
import styled from "styled-components";
import { useGetFeedQuery } from "../../api/cyfeedApi";
import { FeedItem } from "../../components/FeedItem";
import { HACKED_DARK_GREY } from "../../theme";
import { Filters } from "./Filters";

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
    /* border: 1px dashed ${HACKED_DARK_GREY}; */
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='grey' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
