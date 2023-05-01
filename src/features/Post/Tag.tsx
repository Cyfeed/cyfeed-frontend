import { Box, Button, Text } from "grommet";
import { Close } from "grommet-icons";
import { IPostTag } from "../../api/types/getFeed";
import { UNIT_1 } from "../../theme";

export const Tag = ({
  tag,
  onRemove,
}: {
  tag: IPostTag;
  onRemove?(id: string): void;
}) => {
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
      <Text color="text-weak">{`/${tag.name}`}</Text>
      {onRemove && (
        <Button
          plain
          icon={<Close size="8px" color="text-weak" />}
          onClick={() => onRemove(tag.id)}
        />
      )}
    </Box>
  );
};
