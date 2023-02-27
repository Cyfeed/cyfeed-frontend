import { Box, Heading, Markdown, Paragraph, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IPostTag, IPostViewItem } from "../../api/types/getFeed";
import { reactionsMock } from "../../components/FeedItem";
import { Reaction } from "../../components/Reaction/Reaction";
import { HACKED_GREEN, UNIT_1 } from "../../theme";

interface IProps {
  post: IPostViewItem;
}

const DEFAULT_MD = `# Primary header (similar to HTML H1 tag)
## Secondary header (similar to HTML H2 tag)
### Tertiary header (similar to HTML H3 tag)
#### Quaternary header (similar to HTML H4 tag)

This is how you create **_bold italics_** text.
This is how you create ___bold italics___ text.
This is how you create ***bold italics*** text.

1. Apples
2. Bananas
3. Peanut butter

* Apples
* Bananas
* Peanut butter

- [x] Apples
- [ ] Bananas
- [ ] Peanut butter


This is an inline-style link to our [markdown cheat sheet](/markdown-cheat-sheet)
You can also create a relative link: [code repo](../repo/code)
Or an absolute, inline-style link to [Google](https://google.com)
URLs like <https://google.com>, and sometimes https://google.com
or even google.com, get converted to clickable links.
Inline-style link with a title attribute to [Markdown Land](https://markdown.land "Markdown Land")


| Item         | Price | # In stock |
|--------------|:-----:|-----------:|
| Juicy Apples |  1.99 |        739 |
| Bananas      |  1.89 |          6 |

`;

const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 31536000000 },
  { unit: "month", ms: 2628000000 },
  { unit: "day", ms: 86400000 },
  { unit: "hour", ms: 3600000 },
  { unit: "minute", ms: 60000 },
  { unit: "second", ms: 1000 },
];
const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(
  relative: Date | null,
  pivot: Date = new Date()
): string {
  if (!relative) return "";
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
  for (const { unit, ms } of units) {
    if (Math.abs(elapsed) >= ms || unit === "second") {
      return rtf.format(Math.round(elapsed / ms), unit);
    }
  }
  return "";
}

const MOCK_TAGS: IPostTag[] = [
  { id: "1", name: "/threatmodel" },
  { id: "2", name: "/infrasec" },
  { id: "3", name: "/security" },
  { id: "4", name: "/0day" },
];

export const PostView = ({ post }: IProps) => {
  const {
    title,
    author,
    link,
    publishedAt,
    text = DEFAULT_MD,
    tags = MOCK_TAGS,
    reactions = reactionsMock,
  } = post;

  const navigate = useNavigate();

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
          <Text onClick={() => navigate(link)} color="text-xweak" size="xsmall">
            ({link})
          </Text>
        </LinkBox>
      )}
      <Markdown components={{ p: <Paragraph size="medium" /> }}>
        {text}
      </Markdown>
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
