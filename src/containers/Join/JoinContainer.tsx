import {
  Box,
  Button,
  Form,
  FormField,
  Spinner,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import { useCallback, useState } from "react";

import { ICreateUserRequest } from "../../api/types/createUser";
import { UNIT_9 } from "../../theme";
import { useCreateUserMutation } from "../../api/cyfeedApi";

const DEFAULT_VALUE = {
  email: "",
  firstname: "",
  introduction: "",
  lastname: "",
  linkedin: "",
  position: "",
  username: "",
  work: "",
};

export const JoinContainer = () => {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [createUser, { data, error, status }] = useCreateUserMutation();
  console.log("🚀 --- data, error, status", data, error, status);

  const handleSubmit = useCallback(
    (userData: ICreateUserRequest) => {
      createUser(userData);
    },
    [createUser]
  );

  return (
    <Box width={{ max: "698px" }}>
      <Form
        value={value}
        onChange={(nextValue, { touched }) => {
          console.log("Change", nextValue, touched);
          setValue(nextValue);
        }}
        onReset={() => setValue(DEFAULT_VALUE)}
        onSubmit={(event) => handleSubmit(event.value)}
      >
        <Box flex direction="row" gap={UNIT_9}>
          <FormField
            label="First Name"
            name="firstname"
            required
            width={"100%"}
          >
            <TextInput name="firstname" size="small" />
          </FormField>
          <FormField label="Last Name" name="lastname" required width={"100%"}>
            <TextInput size="small" name="lastname" />
          </FormField>
        </Box>
        <Box flex direction="row" gap={UNIT_9}>
          <FormField label="Email" name="email" required width={"100%"}>
            <TextInput size="small" name="email" />
          </FormField>
          <FormField
            label="Username"
            name="username"
            required
            width={"100%"}
            info={"https://cyfeed.io/u/$user"}
          >
            <TextInput size="small" name="username" />
          </FormField>
        </Box>
        <Box flex direction="row" gap={UNIT_9}>
          <FormField label="Work" name="work" required width={"100%"}>
            <TextInput size="small" name="work" />
          </FormField>
          <FormField label="Role" name="position" required width={"100%"}>
            <TextInput size="small" name="position" />
          </FormField>
        </Box>
        <Box flex direction="row">
          <FormField
            label="Tell us about yourself"
            name="introduction"
            width={"100%"}
          >
            <TextArea
              size="small"
              name="introduction"
              fill
              resize={false}
              rows={6}
            />
          </FormField>
        </Box>
        <Box flex direction="row">
          <FormField label="Your Linkedin" name="linkedin" width={"100%"}>
            <TextInput size="small" name="linkedin" />
          </FormField>
        </Box>
        <Box margin={{ top: "medium" }} align="start">
          <Button
            primary
            disabled={status === "pending"}
            size="large"
            type="submit"
            color="white"
            label={
              status !== "pending" ? (
                <Text weight="bold" color={"active-background"}>
                  Request access
                </Text>
              ) : (
                <Spinner />
              )
            }
          />
        </Box>
      </Form>
    </Box>
  );
};
