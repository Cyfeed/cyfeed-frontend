import { Box, Text } from "grommet";

import { IPost } from "../../api/types/getFeed";
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

export const FeedItem = ({ post }: IFeedItemProps) => {
  const { title, publishedAt, author, id } = post;
  const navigate = useNavigate();

  const handleTitleClick = useCallback(() => {
    navigate(`/post/${id}`);
  }, [id, navigate]);

  const displayDate = relativeTimeFromDates(new Date(publishedAt));

  return (
    <Box pad={{ vertical: "small", horizontal: "medium" }} gap="small">
      <Title onClick={handleTitleClick} size="medium" weight="bolder">
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
      {post.reactions?.length && (
        <ReactionsBox direction="row" margin={{ top: "xsmall" }} wrap>
          {post.reactions.map((reaction) => (
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
              {`${post.commentsCount ? post.commentsCount : 0} Comments`}
            </Text>
          </Box>
        </ReactionsBox>
      )}
    </Box>
  );
};

const ReactionsBox = styled(Box)`
  gap: ${UNIT_1};
`;

const Title = styled(Text)`
  cursor: pointer;
`;
