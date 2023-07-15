import { IPostTag } from "../../api/types/getFeed";
import { Box } from "grommet";
import { Tag } from "./Tag";
import styled from "styled-components";

export const Tags = ({
  tags,
  onRemove,
}: {
  tags: IPostTag[];
  onRemove?(id: string): void;
}) => {
  if (!tags.length) {
    return null;
  }

  return (
    <TagsBox direction="row" wrap>
      {tags.map((tag, idx) => (
        <Tag key={tag.id || idx} tag={tag} onRemove={onRemove} />
      ))}
    </TagsBox>
  );
};

const TagsBox = styled(Box)`
  gap: 8px;
`;
