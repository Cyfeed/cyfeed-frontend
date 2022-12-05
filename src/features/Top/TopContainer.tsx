import { EPostType, IPost } from "../../api/types/getFeed";

import { Box } from "grommet";
import { FeedItem } from "../../components/FeedItem";
import { Filters } from "./Filters";
import styled from "styled-components";
import { useGetFeedQuery } from "../../api/cyfeedApi";
import { useState } from "react";

// @ts-ignore TODO: установить типы

// TODO: remove
const postsMock: IPost[] = [
  {
    author: "Good_guy",
    id: "0",
    link: "string",
    publishedAt: "string",
    title:
      "Quick Malware Analysis: TA578 Thread-hijacked email, Bumblebee, and Cobalt Strike pcap",
    type: EPostType.Post,
  },
  {
    author: "xerox",
    id: "1",
    link: "string",
    publishedAt: "string",
    title: "Unlocking Serverless Computing to Assess Security Controls",
    type: EPostType.Link,
  },
];

export enum ETimeFilter {
  Week = "week",
  Month = "month",
  AllTime = "alltime",
}

export const TopContainer = () => {
  const [filter, setFilter] = useState<ETimeFilter>(ETimeFilter.Week);

  useGetFeedQuery({ type: "top" });

  return (
    <Box gap="medium">
      <Filters value={filter} onChange={setFilter} />
      <PostsBox>
        {postsMock.map((post) => (
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
