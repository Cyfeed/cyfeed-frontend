import { Box, Text } from "grommet";

import { IPost, IPostReaction } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";
// @ts-ignore TODO: установить типы
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { relativeTimeFromDates } from "../../utils/relativeTime";
import { Reaction } from "../Reaction/Reaction";

interface IFeedItemProps {
  post: IPost;
}

export const reactionsMock: IPostReaction[] = [
  { count: 100, imageURL: "asld1", id: "1", name: "name" },
  { count: 3, imageURL: "asld2", id: "12", name: "name" },
  { count: 3, imageURL: "asld3", id: "13", name: "name" },
  { count: 3, imageURL: "asld4", id: "14", name: "name" },
  { count: 3, imageURL: "asld5", id: "15", name: "name" },
];

export const FeedItem = ({ post }: IFeedItemProps) => {
  const { title, publishedAt, author, id } = post;
  const navigate = useNavigate();

  const handleTitleClick = useCallback(() => {
    navigate(`/post/${id}`);
  }, [id, navigate]);

  const displayDate = relativeTimeFromDates(new Date(publishedAt));

  return (
    <Box pad="medium" gap="small">
      <Title onClick={handleTitleClick} size="small">
        {title}
      </Title>
      <Box direction="row" gap="medium">
        <Text size="xsmall" color="text-xweak">
          {displayDate}
        </Text>
        <Text size="xsmall" color="text-xweak">
          {author}
        </Text>
      </Box>
      <ReactionsBox direction="row" margin={{ top: "xsmall" }} wrap>
        {reactionsMock.map((reaction) => (
          <Reaction key={reaction.id} reaction={reaction} />
        ))}
        <Box
          width="fit-content"
          align="center"
          justify="start"
          pad={{ vertical: "4px", horizontal: "6px" }}
          background="background-contrast"
          direction="row"
          gap="small"
          round={UNIT_1}
        >
          <Text color="text-weak" size="xsmall">
            12 Comments
          </Text>
        </Box>
      </ReactionsBox>
    </Box>
  );
};

const ReactionsBox = styled(Box)`
  gap: ${UNIT_1};
`;

const Title = styled(Text)`
  cursor: pointer;
`;
