import { Box } from "grommet";
import { useState } from "react";
import styled from "styled-components";
import { useGetFeedQuery } from "../../api/cyfeedApi";
import { FeedItem } from "../../components/FeedItem";
import { Sort } from "./Sort";

export enum ETimeFilter {
  Week = "week",
  Month = "month",
  AllTime = "alltime",
}

export enum ESortType {
  TOP = "top",
  LATEST = "latest",
}

export const TopContainer = () => {
  // const { data: cachedData } = cyfeedApi.endpoints.getFeed.useQueryState({
  //   type: "top",
  // });

  // const [page, setPage] = useState(cachedData?.paging.index ?? 0);
  const [sort, setSort] = useState<ESortType>(ESortType.LATEST);

  const { data } = useGetFeedQuery({
    type: sort,
    index: 0,
    //index: page,
    size: 50,
  });

  return (
    <Box gap="medium">
      <Sort value={sort} onChange={setSort} />
      {/* <Filters value={filter} onChange={setFilter} /> */}
      {data?.data.posts && (
        <PostsBox>
          {data.data.posts.map((post) => (
            <FeedItem key={post.id} post={post} />
          ))}
        </PostsBox>
      )}
      {/* <Button plain label="Загрузить еще" onClick={() => setPage(page + 1)} /> */}
    </Box>
  );
};

const PostsBox = styled(Box)`
  & > * {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='grey' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
