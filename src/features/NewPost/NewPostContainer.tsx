import {
  Box,
  Form,
  FormField,
  ResponsiveContext,
  TextArea,
  TextInput,
} from "grommet";
import { useCallback, useContext, useState } from "react";
import { CyButton, EButtonTheme } from "../../components/Button/CyButton";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCreatePostMutation } from "../../api/cyfeedApi";
import { EPostType } from "../../api/types/getFeed";
import { ITagTransformed } from "../../api/types/getTags";
import { Divider } from "../../components/Divider";
import { AddTagContainer } from "../AddTag";
import { Disclaimer } from "./Disclaimer";

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
  const [selectedTags, setSelectedTags] = useState<ITagTransformed[]>([]);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  const mobile = size === "xsmall";

  const handleSubmit = useCallback(
    async (post: INewPostValue) => {
      const type = post.link ? EPostType.Link : EPostType.Text;

      const { id } = await createPost({
        ...post,
        link: post.link?.trim(),
        type,
        tagsIds: selectedTags.map((tag) => tag.value),
      }).unwrap();

      if (id) {
        navigate(`/post/${id}`);
      }
    },
    [createPost, navigate, selectedTags]
  );

  return (
    <Box width={{ max: "698px" }}>
      <Disclaimer />
      <Divider />
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

        <BorderlessField label="Категории" style={{ border: "none" }}>
          <AddTagContainer
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </BorderlessField>

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
          fill={mobile ? "horizontal" : false}
          margin={{ top: "large" }}
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

const BorderlessField = styled(FormField)`
  border: none;

  & > * {
    border: none;
  }

  &:focus {
    border: none;
  }
`;
