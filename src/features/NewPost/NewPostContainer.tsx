import { Box, Form, FormField, TextArea, TextInput } from "grommet";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";
import { useCallback, useState } from "react";

import { EPostType } from "../../api/types/getFeed";
import { ICreatePostRequest } from "../../api/types/createPost";
import { useCreatePostMutation } from "../../api/cyfeedApi";

const DEFAULT_VALUE = {
  link: "",
  text: "",
  title: "",
  type: EPostType.Text,
};

export const NewPostContainer = () => {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = useCallback(
    (post: ICreatePostRequest) => {
      createPost(post);
    },
    [createPost]
  );

  return (
    <Box width={{ max: "698px" }}>
      <Form
        value={value}
        onChange={(nextValue, { touched }) => {
          setValue(nextValue);
        }}
        onReset={() => setValue(DEFAULT_VALUE)}
        onSubmit={(event) => handleSubmit(event.value)}
      >
        <FormField label="Заголовок" name="title" required width="100%">
          <TextInput name="title" size="small" placeholder="Title" />
        </FormField>
        <FormField label="Ссылка" name="link" width="100%">
          <TextInput
            name="link"
            size="small"
            placeholder="https://someblog.com/material"
          />
        </FormField>

        <FormField label="Текст" name="text" width={"100%"}>
          <TextArea
            placeholder="Поле для текста, есть поддержка markdown..."
            size="small"
            name="text"
            fill
            resize={false}
            rows={6}
          />
        </FormField>

        <CyButton
          theme={EButtonTheme.White}
          primary
          loading={isLoading}
          size="medium"
          label="Опубликовать"
          type="submit"
          disabled={isLoading}
        />
      </Form>
    </Box>
  );
};
