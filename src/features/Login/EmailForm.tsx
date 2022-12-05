import { Box, Form, FormField, TextInput } from "grommet";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";

import { useState } from "react";

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
      <Box width="320px" justify="center" align="start">
        <FormField
          width="100%"
          disabled={disabled}
          label="Email"
          name="email"
          type="email"
          error={status === "rejected" ? error : ""}
        >
          <TextInput
            placeholder="name@address.com"
            type="email"
            size="small"
            name="email"
          />
        </FormField>

        <CyButton
          theme={EButtonTheme.White}
          loading={status === "pending"}
          margin={{ top: "small" }}
          fill={false}
          label="Получить код"
          size="large"
          type="submit"
          disabled={disabled}
        />
      </Box>
    </Form>
  );
};
