import {
  Box,
  FormField,
  Heading,
  MaskedInput,
  Paragraph,
  ResponsiveContext,
} from "grommet";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useGetLoginCodeMutation,
  useLazyMeQuery,
  useLoginMutation,
} from "../../api/cyfeedApi";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  LOGIN_EMAIL,
  LOGIN_TOKEN,
  REFRESH_TOKEN,
} from "../../constants";
import { selectCurrentUser, setCredentials, setUser } from "./authSlice";

import { Divider } from "../../components/Divider";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { EmailForm } from "./EmailForm";

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  const mobile = size === "xsmall";

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
  const [, setAccessTokenExpiresAt] = useLocalStorage(
    ACCESS_TOKEN_EXPIRES_AT,
    ""
  );

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
      const { accessToken, refreshToken, accessTokenExpiresAt } = await login({
        authCode: code.slice(2),
        email,
        loginToken,
      }).unwrap();
      localStorage.removeItem(LOGIN_TOKEN);
      localStorage.removeItem(LOGIN_EMAIL);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setAccessTokenExpiresAt(accessTokenExpiresAt);
      dispatch(
        setCredentials({ accessToken, refreshToken, accessTokenExpiresAt })
      );

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
    setAccessTokenExpiresAt,
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
    <Box width={{ max: "800px" }}>
      <Paragraph size="small" fill>
        Если вы уже являетесь зарегистрированным пользователем сообщества,
        пожалуйста, укажите свой адрес электронной почты, и мы вышлем вам нашу
        ссылку для входа.
      </Paragraph>
      <Box width={{ max: "320px" }}>
        <Divider />
        <Heading level={6} margin={{ vertical: "small" }} size="small">
          Вход в сообщество
        </Heading>
        <EmailForm
          onSubmit={handleSubmit}
          status={status}
          error={emailErrorMessage}
        />

        <Box margin={{ top: "medium" }} align="start" gap="small" fill={mobile}>
          <FormField
            label="Код из письма"
            error={loginError && "Ошибка авторизации"}
            width={mobile ? "100%" : undefined}
          >
            <MaskedInput
              disabled={submitCodeDisabled}
              size="small"
              mask={[{ fixed: "0x" }, { regexp: /[0-9]*\d[0-9]*/, length: 4 }]}
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
            label="Войти"
            onClick={handleSendCode}
            fill={mobile}
          />
        </Box>
      </Box>
    </Box>
  );
};
