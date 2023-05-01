import { Box, TextInput } from "grommet";
import { useCallback, useRef, useState } from "react";

import { IGetTagsResponse, ITag } from "../../api/types/getTags";
import { UNIT_1 } from "../../theme";

import { Set } from "typescript";
import { IPostTag } from "../../api/types/getFeed";
import { Tags } from "../Post/Tags";

type Props = {
  tagsSource: IGetTagsResponse;
  selectedTags: Set<ITag["id"]>;
  addTag(id: ITag["id"]): void;
  removeTag(id: ITag["id"]): void;
};

export const AddTagContainer = ({
  selectedTags,
  addTag,
  removeTag,
  tagsSource,
}: Props) => {
  const [suggestions, setSuggestions] = useState(tagsSource);
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const filterSelected = useCallback(
    (tags: ITag[]) => {
      return tags.filter((tag) => !selectedTags.has(tag.id));
    },
    [selectedTags]
  );

  const setInitSuggests = useCallback(
    (tags: ITag[]) => {
      setSuggestions(filterSelected(tags));
    },
    [filterSelected]
  );

  const onChange = (event: any) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    if (!nextValue) setInitSuggests(tagsSource);
    else {
      setSuggestions(
        tagsSource.filter(({ name, id }) => {
          return (
            name.toLowerCase().includes(nextValue.trim().toLowerCase()) &&
            selectedTags.has(id)
          );
        })
      );
    }
  };

  const handleSuggestionSelect = useCallback(
    ({ suggestion }: { suggestion: { value: string; label: string } }) => {
      addTag(suggestion.value);

      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTags]
  );

  return (
    <Box direction="row" wrap>
      {selectedTags.size > 0 && (
        <Box margin={{ right: "medium", bottom: "medium" }} align="start">
          <Tags
            tags={
              // @ts-ignore
              Array.from(selectedTags).map((id: string) =>
                tagsSource.length ? tagsSource.find((tag) => tag.id === id) : []
              ) as IPostTag[]
            }
            onRemove={(id: string) => removeTag(id)}
          />
        </Box>
      )}
      <Box width={{ max: "500px" }} fill="horizontal">
        <TextInput
          ref={inputRef}
          size="small"
          disabled={filterSelected(tagsSource).length === 0}
          value={value}
          placeholder="/добавить тег"
          onChange={onChange}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={suggestions.map((tag) => ({
            label: tag.name,
            value: tag.id,
          }))}
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
