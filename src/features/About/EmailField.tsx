import {
  Box,
  Button,
  FormField,
  ResponsiveContext,
  Spinner,
  Text,
  TextInput,
} from "grommet";
import { HACKED_GREEN, HACKED_STROKE, UNIT_1 } from "../../theme";
import { useCallback, useContext, useState } from "react";

import styled from "styled-components";
import { useSignToWaitingListMutation } from "../../api/cyfeedApi";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const EmailField = () => {
  const [value, setvalue] = useState("");
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";
  const [valid, setValid] = useState(true);
  const [sign, { isLoading, isSuccess, isError }] =
    useSignToWaitingListMutation();

  const handleSubmit = useCallback(async () => {
    if (!isSuccess) {
      if (validateEmail(value)) {
        return await sign({ email: value });
      }

      setValid(false);
    }
  }, [sign, isSuccess, value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValid(true);
    setvalue(e.target.value);
  }, []);

  const errorMessage = !valid
    ? "Некорректный email"
    : isError
    ? "Какая-то ошибка, попробуй еще раз"
    : "";

  return (
    <Box
      align="center"
      alignContent="center"
      justify="center"
      fill
      width={{ max: "377px" }}
    >
      <Box fill="horizontal">
        <FormField width="100%" error={errorMessage} margin="none">
          <EmailInput
            disabled={isLoading || isSuccess}
            type="email"
            small={mobile}
            value={value}
            onChange={handleChange}
            width="100%"
            placeholder={
              !value ? (
                <Text color="text-xweak">{"> name@domain.com"}</Text>
              ) : null
            }
          />
        </FormField>
      </Box>
      <Box
        margin={errorMessage ? { top: "4px" } : { top: "34px" }}
        width={{ max: "377px" }}
        height={{ max: "46px" }}
        flex="grow"
        fill="horizontal"
      >
        <Submit
          disabled={isLoading}
          success={isSuccess}
          small={mobile}
          type="submit"
          fill="horizontal"
          onClick={handleSubmit}
          primary
          size="medium"
          color={isSuccess ? HACKED_STROKE : "brand"}
          focusIndicator={false}
          label={
            <Box align="center" justify="center">
              {!isLoading ? (
                <Text
                  size="small"
                  weight="bolder"
                  color={isSuccess ? "brand" : "black"}
                >
                  {isSuccess
                    ? "Спасибо, сообщим как будем готовы"
                    : "Хм, интересно"}
                </Text>
              ) : (
                <Spinner />
              )}
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

const EmailInput = styled(TextInput)<{ small: boolean }>`
  height: ${(props) => (props.small ? "44px" : "57px")};
  box-shadow: 0em 0 40px -15px ${HACKED_GREEN};
  border: none;

  &:focus {
    box-shadow: 0em 0 40px -15px ${HACKED_GREEN};
    border: none;
  }
`;

const Submit = styled(Button)<{ small: boolean; success: boolean }>`
  height: ${(props) => (props.small ? "44px" : "57px")};
  box-shadow: ${(props) =>
    props.success ? "inset 0px 2px 21px #131313" : "none"};
  border-radius: ${UNIT_1};
  pointer-events: ${(props) => (props.success ? "none" : "all")};

  &:hover {
    box-shadow: none;
  }
`;
