import { Box, FormField, TextArea } from "grommet";
import { Send } from "grommet-icons";

import { useCallback, useState } from "react";
import styled from "styled-components";
import { CyButton, EButtonTheme } from "../Button/CyButton";

type Props = { isFetching: boolean; onSend(answer: string): void };

export const ReplyInput = ({ isFetching, onSend }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = useCallback(() => {
    onSend(answer);
    setAnswer("");
  }, [answer, onSend]);

  return (
    <ReplyField>
      <Box direction="row" align="center" gap="small">
        <TextArea
          placeholder="Ответить в тред"
          disabled={isFetching}
          size="small"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <CyButton
          theme={EButtonTheme.White}
          disabled={isFetching || !answer}
          onClick={handleSubmit}
          icon={<Send size="medium" color="brand" />}
        />
      </Box>
    </ReplyField>
  );
};

const ReplyField = styled(FormField)`
  & > div {
    border: none;
  }
`;
