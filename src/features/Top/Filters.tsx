import { Box, RadioButtonGroup, Text } from "grommet";

import { ETimeFilter } from "./TopContainer";

export const Filters = ({
  onChange,
  value,
}: {
  onChange(v: ETimeFilter): void;
  value: ETimeFilter;
}) => {
  return (
    <>
      <Box direction="row" gap="small">
        <Box pad="small" border>
          <Text>TOP</Text>
        </Box>

        <RadioButtonGroup
          pad="small"
          direction="row"
          name="filter"
          options={[
            { value: ETimeFilter.Week, label: "Неделя" },
            { value: ETimeFilter.Month, label: "Месяц" },
            { value: ETimeFilter.AllTime, label: "Все время" },
          ]}
          value={value}
          onChange={(event) => onChange(event.target.value as ETimeFilter)}
        >
          {(
            option: { value: ETimeFilter; label: "string" },
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
