import { Box, Form, FormField, Spinner, TextInput } from "grommet";
import { Next } from "grommet-icons";

import { useState } from "react";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";

const DEFAULT_VALUE = {
  email: "",
};

interface IEmailFormProps {
  onSubmit(value: { email: string }): void;
  status: "uninitialized" | "pending" | "fulfilled" | "rejected";
  error: string;
}

export const EmailForm = ({ onSubmit, status, error }: IEmailFormProps) => {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const disabled = status === "fulfilled" || status === "pending";

  return (
    <Form
      value={value}
      onChange={(nextValue, { touched }) => {
        setValue(nextValue);
      }}
      onReset={() => setValue(DEFAULT_VALUE)}
      onSubmit={({ value }) => onSubmit(value)}
    >
      <Box width="320px" justify="center" align="start" fill>
        <FormField
          width="100%"
          disabled={disabled}
          label="Пожалуйста введите email"
          name="email"
          type="email"
          error={status === "rejected" ? error : ""}
        >
          <Box direction="row">
            <TextInput
              placeholder="name@address.com"
              type="email"
              size="small"
              name="email"
              disabled={disabled}
            />
            <CyButton
              theme={EButtonTheme.Green}
              loading
              label={undefined}
              icon={status === "pending" ? <Spinner /> : <Next color="brand" />}
              plain
              type="submit"
              disabled={disabled}
              margin={{ horizontal: "small" }}
            />
          </Box>
        </FormField>
      </Box>
    </Form>
  );
};
