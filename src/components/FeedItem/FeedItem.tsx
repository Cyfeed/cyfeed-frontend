import { Box, Image, Text } from "grommet";

import { IPost } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";
// @ts-ignore TODO: установить типы
import styled from "styled-components";

interface IFeedItemProps {
  post: IPost;
}

const reactionsMock = [
  { count: 100, src: "asld1" },
  { count: 3, src: "asld2" },
  { count: 3, src: "asld3" },
  { count: 3, src: "asld4" },
  { count: 3, src: "asld5" },
];

export const FeedItem = ({ post }: IFeedItemProps) => {
  const { title, publishedAt, author } = post;
  const displayDate = new Date(publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Box pad="medium" gap="small">
      <Text size="small">{title}</Text>
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
          <Reaction
            key={reaction.src}
            count={reaction.count}
            src={reaction.src}
          />
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

interface IReactionProps {
  count: number;
  src: string;
}

const Reaction = ({ count, src }: IReactionProps) => {
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
    >
      <Box width="12px" height="12px">
        <Image width="12px" src={src} fit="contain" />
      </Box>
      <Text color="text-weak" size="xsmall">
        {count}
      </Text>
    </Box>
  );
};

const ReactionsBox = styled(Box)`
  gap: ${UNIT_1};
`;
