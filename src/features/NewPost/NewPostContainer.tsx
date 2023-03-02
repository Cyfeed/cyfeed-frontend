import { Box, Form, FormField, TextArea, TextInput } from "grommet";
import { useCallback, useState } from "react";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";

import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../api/cyfeedApi";
import { EPostType } from "../../api/types/getFeed";

const DEFAULT_VALUE: INewPostValue = {
  link: undefined,
  text: "",
  title: "",
};

interface INewPostValue {
  title: string;
  link?: string;
  text: string;
}

export const NewPostContainer = () => {
  const [value, setValue] = useState<INewPostValue>(DEFAULT_VALUE);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (post: INewPostValue) => {
      const type = post.link ? EPostType.Link : EPostType.Text;

      const { id } = await createPost({ ...post, type }).unwrap();

      if (id) {
        navigate(`/post/${id}`);
      }
    },
    [createPost, navigate]
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
