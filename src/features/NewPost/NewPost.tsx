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
import { IGetTagsResponse, ITag } from "../../api/types/getTags";
import { Divider } from "../../components/Divider";
import { AddTagContainer } from "../AddTag";
import { Disclaimer } from "./Disclaimer";
import { useEditPostMutation } from "../../api/cyfeedApi";

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

interface IProps {
  tagsSource: IGetTagsResponse;
  post?: INewPostValue;
  tags?: ITag[];
  postId?: string;
  mode: "new" | "edit";
}

export const NewPost = ({
  postId,
  post,
  tags = [],
  mode = "new",
  tagsSource,
}: IProps) => {
  const [value, setValue] = useState<INewPostValue>(post || DEFAULT_VALUE);
  const [selectedTags, setSelectedTags] = useState<Set<ITag["id"]>>(
    new Set(tags.map((tag) => tag.id))
  );
  const [createPost, { isLoading: isCreateLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isEditLoading }] = useEditPostMutation();
  const isLoading = isCreateLoading || isEditLoading;

  const navigate = useNavigate();

  const size = useContext(ResponsiveContext);
  const mobile = size === "xsmall";

  const addTag = (id: string) => {
    setSelectedTags((previousState) => new Set([...previousState, id]));
  };

  const removeTag = (id: string) => {
    setSelectedTags(
      (prev) => new Set([...prev].filter((prevId) => prevId !== id))
    );
  };

  const handleSubmit = useCallback(
    async (post: INewPostValue) => {
      const type = post.link ? EPostType.Link : EPostType.Text;

      const data = {
        ...post,
        link: post.link?.trim(),
        type,
        tagsIds: Array.from(selectedTags),
      };

      if (mode === "new") {
        const { id } = await createPost(data).unwrap();

        if (id) {
          navigate(`/post/${id}`);
        }
      }

      if (mode === "edit" && postId) {
        await updatePost({ post: { ...data }, id: postId })
          .unwrap()
          .then(() => {
            navigate(`/post/${postId}`);
          });
      }
    },
    [createPost, mode, navigate, postId, selectedTags, updatePost]
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
            tagsSource={tagsSource}
            selectedTags={selectedTags}
            addTag={addTag}
            removeTag={removeTag}
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
