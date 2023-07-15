import { Box, FormField, TextArea } from "grommet";

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
      <Box direction="column" align="start" gap="medium">
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
          label="Ответить"
          primary
          size="medium"
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
