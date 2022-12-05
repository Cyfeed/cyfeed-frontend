import {
  ACCESS_TOKEN,
  LOGIN_EMAIL,
  LOGIN_TOKEN,
  REFRESH_TOKEN,
} from "../../constants";
import { Box, FormField, TextInput } from "grommet";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";
import { Navigate, useNavigate } from "react-router-dom";
import { selectCurrentUser, setCredentials, setUser } from "./authSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLoginCodeMutation,
  useLazyMeQuery,
  useLoginMutation,
} from "../../api/cyfeedApi";

import { EmailForm } from "./EmailForm";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  // State
  const [code, setCode] = useState("");

  // API
  const [getLoginCode, { status, error: emailError }] =
    useGetLoginCodeMutation();
  const [login, { error: loginError, status: loginStatus, isLoading }] =
    useLoginMutation();

  const [me] = useLazyMeQuery();

  // Localstorage
  const [loginToken, setLoginToken] = useLocalStorage(LOGIN_TOKEN, "");
  const [email, setEmail] = useLocalStorage(LOGIN_EMAIL, "");
  const [, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [, setRefreshToken] = useLocalStorage(REFRESH_TOKEN, "");

  const emailErrorMessage =
    // @ts-expect-error TODO: типизировать ошибки
    emailError && emailError?.originalStatus === 500
      ? "Неизвестная ошибка"
      : "Ошибка авторизации";

  useEffect(() => {
    if (loginStatus !== "uninitialized") {
      setCode("");
    }

    return () => {
      localStorage.removeItem(LOGIN_TOKEN);
      localStorage.removeItem(LOGIN_EMAIL);
    };
  }, [loginStatus]);

  const submitCodeDisabled =
    status !== "fulfilled" || loginStatus === "pending";

  const handleSubmit = useCallback(
    async (value: { email: string }) => {
      const { token } = await getLoginCode(value).unwrap();
      setLoginToken(token);
      setEmail(value.email);
    },
    [getLoginCode, setEmail, setLoginToken]
  );

  const handleSendCode = useCallback(async () => {
    if (loginToken && email) {
      const { accessToken, refreshToken } = await login({
        authCode: code,
        email,
        loginToken,
      }).unwrap();
      localStorage.removeItem(LOGIN_TOKEN);
      localStorage.removeItem(LOGIN_EMAIL);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(setCredentials({ accessToken, refreshToken }));

      const userData = await me().unwrap();
      dispatch(setUser({ user: userData }));
    }
  }, [
    code,
    dispatch,
    email,
    login,
    loginToken,
    me,
    setAccessToken,
    setRefreshToken,
  ]);

  useEffect(() => {
    if (currentUser) {
      navigate("/feed");
    }
  }, [currentUser, navigate]);

  return currentUser ? (
    <Navigate to="/feed" />
  ) : (
    <Box>
      <EmailForm
        onSubmit={handleSubmit}
        status={status}
        error={emailErrorMessage}
      />

      <Box margin={{ top: "medium" }} align="start" width="320px" gap="medium">
        <FormField
          label="Код из письма"
          error={loginError && "Ошибка авторизации"}
        >
          <TextInput
            disabled={submitCodeDisabled}
            type="number"
            size="small"
            placeholder="0x0000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormField>
        <CyButton
          theme={EButtonTheme.White}
          loading={isLoading}
          primary
          size="large"
          type="submit"
          disabled={submitCodeDisabled}
          label="Отправить"
          onClick={handleSendCode}
        />
      </Box>
    </Box>
  );
};
