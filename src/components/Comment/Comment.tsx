import { Box, Button, Paragraph, Text } from "grommet";
import styled from "styled-components";
import { IPostComment } from "../../api/types/getPostComments";

type Props = {
  comment: IPostComment;
};

export const Comment = ({ comment }: Props) => {
  const { authorName, text } = comment;

  return (
    <Box>
      <LinkText size="small">{authorName}</LinkText>
      <Paragraph margin={{ vertical: "small" }} size="small" fill>
        {text}
      </Paragraph>
      <Button
        plain
        label={
          <LinkText color="text-xweak" size="small">
            Ответить
          </LinkText>
        }
      />
    </Box>
  );
};

const LinkText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;
