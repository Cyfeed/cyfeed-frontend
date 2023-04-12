import { Box, Text } from "grommet";

import { IPost } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";
// @ts-ignore TODO: установить типы
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { relativeTimeFromDates } from "../../utils/relativeTime";
import { LinkText } from "../LinkText/LinkText";
import { Reaction } from "../Reaction/Reaction";
import { BottomCorner } from "grommet-icons";

import { LinkBox } from "../../features/Post/PostView";

interface IFeedItemProps {
  post: IPost;
}

export const FeedItem = ({ post }: IFeedItemProps) => {
  const { title, publishedAt, author, id, link } = post;
  const navigate = useNavigate();

  const handleTitleClick = useCallback(() => {
    navigate(`/post/${id}`);
  }, [id, navigate]);
  const handleAuthorClick = useCallback(() => {
    navigate(`/profile/${author}`);
  }, [author, navigate]);

  const displayDate = relativeTimeFromDates(new Date(publishedAt));

  const goTo = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Box
      round="4px"
      margin={{ vertical: "6px" }}
      pad={{ vertical: "small", horizontal: "medium" }}
      gap="6px"
      background="#16171D"
    >
      <Title onClick={handleTitleClick} size="medium" weight="bolder">
        {title}
      </Title>
      {link && (
        <LinkBox
          focusIndicator={false}
          onClick={() => goTo(link)}
          direction="row"
          gap="2px"
        >
          <Text color="text-xweak" size="xsmall">
            {new URL(link).host}
          </Text>
          <BottomCorner
            style={{ transform: "rotate(-90deg)" }}
            size="10px"
            color="brand"
          />
        </LinkBox>
      )}
      <Box direction="row" gap="small">
        <Text size="xsmall" color="text-xweak">
          {displayDate}
        </Text>
        <Text color="text-xweak" size="small">
          &#8227;
        </Text>
        <LinkText onClick={handleAuthorClick} size="xsmall" color="text-xweak">
          {author}
        </LinkText>
      </Box>

      <ReactionsBox direction="row" margin={{ top: "xsmall" }} wrap>
        {post.reactions?.map((reaction) => (
          <Reaction postView={false} key={reaction.id} reaction={reaction} />
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
            {`Ответов: ${post.commentsCount ? post.commentsCount : 0}`}
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
