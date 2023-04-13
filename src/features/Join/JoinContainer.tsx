import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  ResponsiveContext,
  Spinner,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import { useCallback, useContext, useState } from "react";

import { useCreateUserMutation } from "../../api/cyfeedApi";
import { ICreateUserRequest } from "../../api/types/createUser";
import { Divider } from "../../components/Divider/Divider";
import { UNIT_2, UNIT_3, UNIT_9 } from "../../theme";
import { JoinDisclaimer } from "./JoinDisclaimer";
import { ValuesDisclaimer } from "./ValuesDisclaimer";

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
  const size = useContext(ResponsiveContext);
  const mobile = size === "xsmall";
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [createUser, { status }] = useCreateUserMutation();

  const handleSubmit = useCallback(
    (userData: ICreateUserRequest) => {
      createUser(userData);
    },
    [createUser]
  );

  return (
    <Box width={{ max: "698px" }}>
      <JoinDisclaimer />
      <Heading level={6} margin={{ top: "none", bottom: "small" }}>
        О Вас
      </Heading>
      <Form
        value={value}
        onChange={(nextValue, { touched }) => {
          setValue(nextValue);
        }}
        onReset={() => setValue(DEFAULT_VALUE)}
        onSubmit={(event) => handleSubmit(event.value)}
      >
        <Box
          flex
          direction={mobile ? "column" : "row"}
          gap={mobile ? UNIT_3 : UNIT_9}
        >
          <FormField label="Имя" name="firstname" required width={"100%"}>
            <TextInput name="firstname" size="small" placeholder="Dmitrii" />
          </FormField>
          <FormField label="Фамилия" name="lastname" required width={"100%"}>
            <TextInput size="small" name="lastname" placeholder="Ivanov" />
          </FormField>
        </Box>
        <Box
          flex
          direction={mobile ? "column" : "row"}
          gap={mobile ? UNIT_3 : UNIT_9}
        >
          <FormField label="Email" name="email" required width={"100%"}>
            <TextInput
              size="small"
              name="email"
              placeholder="name@address.com"
            />
          </FormField>
          <FormField
            label="Никнейм"
            name="username"
            required
            width={"100%"}
            info={
              <Box direction="row">
                <Text size="xsmall" color={"text-weak"}>
                  https://cyfeed.io/u/
                </Text>
                <Text size="xsmall" color={"brand"}>
                  {value.username || "$user"}
                </Text>
              </Box>
            }
          >
            <TextInput size="small" name="username" placeholder="Hacker_777" />
          </FormField>
        </Box>
        <Divider />
        <Heading level={6} margin={{ top: "small", bottom: "small" }}>
          Профессиональный опыт
        </Heading>
        <Box
          flex
          direction={mobile ? "column" : "row"}
          gap={mobile ? UNIT_2 : UNIT_9}
        >
          <FormField
            label="Где вы работаете"
            name="work"
            required
            width={"100%"}
          >
            <TextInput size="small" name="work" placeholder="Cyfeed Inc." />
          </FormField>
          <FormField
            label="На какой позиции"
            name="position"
            required
            width={"100%"}
          >
            <TextInput
              size="small"
              name="position"
              placeholder="Cybesecurity engineer"
            />
          </FormField>
        </Box>
        <Box
          flex
          direction={mobile ? "column" : "row"}
          gap={mobile ? UNIT_2 : UNIT_9}
        >
          <FormField
            label="Расскажите немного о себе"
            name="introduction"
            required
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
        <Box
          flex
          direction={mobile ? "column" : "row"}
          gap={mobile ? UNIT_2 : UNIT_9}
        >
          <FormField label="Ссылка Linkedin" name="linkedin" width={"100%"}>
            <TextInput
              size="small"
              name="linkedin"
              placeholder="https://linkedin.com/durov"
            />
          </FormField>
        </Box>
        <Divider />
        <ValuesDisclaimer />
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
                  Хочу в сообщество
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
