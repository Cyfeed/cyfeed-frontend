import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Paragraph,
  ResponsiveContext,
  Spinner,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateUserIntroMutation,
  useUpdateUserMutation,
} from "../../api/cyfeedApi";
import { ENetworkType, IUser } from "../../api/types/createUser";
import { IUpdateUserRequest } from "../../api/types/updateUser";

import { Divider } from "../../components/Divider/Divider";
import { UNIT_2, UNIT_9 } from "../../theme";
import { setUser } from "../Login/authSlice";

interface IProps {
  profile: IUser;
}

interface IForm {
  work: string;
  position: string;
  introduction: string;
  linkedin: string;
  telegram: string;
}

const getFormValues = (profile: IUser): IForm => {
  const {
    details: { networks, work, position },
    introduction,
  } = profile;

  return {
    work: work ?? "",
    position: position ?? "",
    introduction: introduction ?? "",
    linkedin:
      networks?.find((network) => network.type === ENetworkType.LinkedIn)
        ?.link ?? "",
    telegram:
      networks?.find((network) => network.type === ENetworkType.Telegram)
        ?.link ?? "",
  };
};

export const EditProfile = ({ profile }: IProps) => {
  const [
    updateUser,
    { isLoading: isUpdateUserLoading, isError: isUpdateUserError },
  ] = useUpdateUserMutation();
  const [
    updateUserIntro,
    { isLoading: isUpdateIntroLoading, isError: isUpdateIntroError },
  ] = useUpdateUserIntroMutation();
  const initialValues = getFormValues(profile);
  const dispatch = useDispatch();

  const size = useContext(ResponsiveContext);
  const mobile = size === "xsmall";
  const [value, setValue] = useState(initialValues);

  const handleSubmit = useCallback(
    async (value: IForm) => {
      const networks = [
        { type: ENetworkType.LinkedIn, link: value.linkedin },
        { type: ENetworkType.Telegram, link: value.telegram },
      ];

      const reqUser: IUpdateUserRequest = {
        userData: {
          networks: networks.filter((n) => Boolean(n.link)),
          work: value.work,
          position: value.position,
        },
        userId: "me",
      };

      if (profile.introduction !== value.introduction) {
        await updateUserIntro({
          introduction: value.introduction,
          userId: "me",
        });
      }

      const user = await updateUser(reqUser).unwrap();

      dispatch(setUser({ user }));
    },
    [dispatch, profile.introduction, updateUserIntro, updateUser]
  );

  return (
    <Box width={{ max: "698px" }}>
      <Heading level={6} margin={{ top: "none", bottom: "small" }}>
        О Вас
      </Heading>
      <Form
        value={value}
        onChange={(nextValue, { touched }) => {
          setValue(nextValue);
        }}
        onReset={() => setValue(initialValues)}
        onSubmit={(event) => handleSubmit(event.value)}
      >
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
            width={"100%"}
            error={
              isUpdateIntroError
                ? "Возникла ошибка, попробуйте еще раз"
                : undefined
            }
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
          <FormField label="Telegram" name="telegram" width={"100%"}>
            <TextInput
              size="small"
              name="telegram"
              placeholder="https://t.me/komyagin"
            />
          </FormField>
        </Box>

        <Divider />
        <Box margin={{ top: "large" }} align="start">
          <Button
            fill={mobile ? "horizontal" : false}
            primary
            disabled={isUpdateUserLoading || isUpdateIntroLoading}
            size="medium"
            type="submit"
            color="white"
            label={
              isUpdateUserLoading || isUpdateIntroLoading ? (
                <Spinner />
              ) : (
                <Text weight="bold" color={"active-background"}>
                  Сохранить
                </Text>
              )
            }
          />
        </Box>
        {isUpdateUserError && (
          <Paragraph color="status-error">
            Ошибка изменения профиля. Попробуйте еще раз или обратитесь к
            админам
          </Paragraph>
        )}
      </Form>
    </Box>
  );
};
