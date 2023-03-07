import { Box, TextInput } from "grommet";
import { useCallback, useEffect, useState } from "react";
import { useTagsQuery } from "../../api/cyfeedApi";
import { ITagTransformed } from "../../api/types/getTags";
import { UNIT_1 } from "../../theme";
import { Tags } from "../Post/PostView";

type Props = {
  selectedTags: ITagTransformed[];
  setSelectedTags(tags: ITagTransformed[]): void;
};

export const AddTagContainer = ({ selectedTags, setSelectedTags }: Props) => {
  const { data: tags = [], isSuccess } = useTagsQuery();

  const [suggestions, setSuggestions] = useState(tags);
  const [value, setValue] = useState("");

  const filterSelected = useCallback(
    (tags: ITagTransformed[]) => {
      return tags.filter((tag) =>
        selectedTags.findIndex((selectedTag) => selectedTag.value === tag.value)
      );
    },
    [selectedTags]
  );

  const setInitSuggests = useCallback(
    (tags: ITagTransformed[]) => {
      setSuggestions(filterSelected(tags));
    },
    [filterSelected]
  );

  useEffect(() => {
    if (isSuccess) {
      setInitSuggests(tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onChange = (event: any) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    if (!nextValue) setInitSuggests(tags);
    else {
      const regexp = new RegExp(`^${nextValue}`);
      setSuggestions(
        tags.filter(({ label, value }) => {
          return (
            regexp.test(label) &&
            selectedTags.findIndex((selectedTag) => selectedTag.value === value)
          );
        })
      );
    }
  };

  const handleSuggestionSelect = useCallback(
    ({ suggestion }: { suggestion: any }) => {
      setSelectedTags([...selectedTags, suggestion]);
    },
    [selectedTags]
  );

  return (
    <Box direction="row" wrap>
      {selectedTags.length > 0 && (
        <Box margin={{ right: "medium", bottom: "medium" }} align="start">
          <Tags
            tags={selectedTags.map((tag) => ({
              name: tag.label,
              id: tag.value,
            }))}
            onRemove={(id: string) =>
              setSelectedTags(selectedTags.filter((t) => t.value !== id))
            }
          />
        </Box>
      )}
      <Box width={{ max: "500px" }} fill="horizontal">
        <TextInput
          size="small"
          disabled={filterSelected(tags).length === 0}
          value={value}
          placeholder="/добавить тег"
          onChange={onChange}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={suggestions}
          dropProps={{
            background: "active-background",
            elevation: "xs",
            margin: { top: "8px" },
            round: UNIT_1,
          }}
        />
      </Box>
    </Box>
  );
};
