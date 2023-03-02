import { Box, Heading, Markdown, Paragraph, Text } from "grommet";
import { useCallback } from "react";
import styled from "styled-components";
import { IPostTag, IPostViewItem } from "../../api/types/getFeed";
import { reactionsMock } from "../../components/FeedItem";
import { Reaction } from "../../components/Reaction/Reaction";
import { HACKED_GREEN, UNIT_1 } from "../../theme";
import { relativeTimeFromDates } from "../../utils/relativeTime";

interface IProps {
  post: IPostViewItem;
}

export const PostView = ({ post }: IProps) => {
  const {
    title,
    author,
    link,
    publishedAt,
    text,
    tags = [],
    reactions = reactionsMock,
  } = post;

  const goTo = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Box>
      <Box direction="row" gap="medium">
        <Text color="white" size="small">
          {author}
        </Text>
        <Text color="text-xweak" size="small">
          {relativeTimeFromDates(new Date(publishedAt))}
        </Text>
      </Box>
      {reactions.length > 0 && (
        <Box gap="small" direction="row" margin={{ top: "small" }} wrap>
          {reactions.map((reaction) => (
            <Reaction reaction={reaction} key={reaction.id} />
          ))}
        </Box>
      )}
      {link && (
        <LinkBox direction="row" margin={{ vertical: "medium" }} gap="small">
          <Heading margin="none" weight="normal" level={3}>
            {title}
          </Heading>
          <Text onClick={() => goTo(link)} color="text-xweak" size="xsmall">
            ({link})
          </Text>
        </LinkBox>
      )}
      {text && (
        <Markdown components={{ p: <Paragraph size="medium" /> }}>
          {text}
        </Markdown>
      )}
      <Tags tags={tags} />
    </Box>
  );
};

const Tags = ({ tags }: { tags: IPostTag[] }) => {
  return (
    <Box direction="row" wrap gap="small">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </Box>
  );
};

const Tag = ({ tag }: { tag: IPostTag }) => {
  return (
    <Box
      width="fit-content"
      align="center"
      justify="start"
      pad={{ vertical: "4px", horizontal: "6px" }}
      background="background-contrast"
      direction="row"
      gap="small"
      round={UNIT_1}
      margin={{ top: "medium" }}
    >
      <Text color="text-weak">{tag.name}</Text>
    </Box>
  );
};

const LinkBox = styled(Box)`
  cursor: pointer;
  flex-shrink: 0;
  flex-wrap: wrap;

  &:hover {
    & span {
      transition: color 250ms;
      color: ${HACKED_GREEN};
    }
  }
`;
