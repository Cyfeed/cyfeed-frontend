import { Box, RadioButtonGroup, Text } from "grommet";

import { ESortType } from "./TopContainer";

export const Sort = ({
  onChange,
  value,
}: {
  onChange(v: ESortType): void;
  value: ESortType;
}) => {
  return (
    <>
      <Box direction="row" gap="small">
        <RadioButtonGroup
          pad="small"
          direction="row"
          name="filter"
          options={[
            { value: ESortType.LATEST, label: "ПОСЛЕДНИЕ" },
            { value: ESortType.TOP, label: "ТОП" },
          ]}
          value={value}
          onChange={(event) => onChange(event.target.value as ESortType)}
        >
          {(
            option: { value: ESortType; label: "string" },
            { checked }: { checked: boolean }
          ) => (
            <Box direction="row" gap="small">
              <Text size="small" color={checked ? "brand" : "text-xweak"}>
                {option.label}
              </Text>
              <Text size="small" color="text-xweak">
                {" / "}
              </Text>
            </Box>
          )}
        </RadioButtonGroup>
      </Box>
    </>
  );
};
