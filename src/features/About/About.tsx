import {
  Box,
  Button,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";
import React, { useCallback, useContext, useState } from "react";

import { Diamond } from "./assets/Diamond";
import { Dollar } from "./assets/Dollar";
import { Goose } from "./assets/Goose";
import { Heart } from "./assets/Heart";
import { LANDING_BACKGROUND } from "../../theme";
import { Lock } from "./assets/Lock";
import styled from "styled-components";

export const AboutContainer = () => {
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";

  return (
    <Box background={LANDING_BACKGROUND}>
      <Box pad={{ vertical: "large", horizontal: "xlarge" }}>
        <Box direction="row" wrap align="end" justify="between">
          <Heading
            level={1}
            margin={{ vertical: "none", right: "large" }}
            size="xlarge"
            color="brand"
          >
            {"$>CYFEED"}
          </Heading>
          <Text margin={{ vertical: "small" }} color="text-xweak">
            {"$toxics > /dev/null"}
          </Text>
        </Box>
        <Paragraph color="white" size="xlarge" margin={{ vertical: "medium" }}>
          Закрытое сообщество безопасников и профессионалов по
          кибербезопасности, которым не все равно
        </Paragraph>
        <Paragraph
          fill
          color="text-xweak"
          size="medium"
          margin={{ vertical: "medium" }}
        >
          Стань в числе первых частью развивающегося и нетоксичного сообщества
          профессионалов.
        </Paragraph>
        <Paragraph
          fill
          color="text-xweak"
          size="medium"
          margin={{ vertical: "small" }}
        >
          Наша цель — нести ценность для отрасли кибербезопасности, обмениваться
          опытом, помогать новичкам и участвовать в ИБ активностях.
        </Paragraph>
        <Grid
          margin={{ top: "large" }}
          columns={{
            count: mobile ? 1 : 2,
            size: mobile ? "small" : "auto",
          }}
          gap="small"
          align={mobile ? "center" : "start"}
        >
          <Banner
            icon={<Lock />}
            title="Закрытый формат сообщества"
            description="Позволяет обсуждать темы без посторонних и рассказать чуть больше, чем это обычно делают безопасники, даже после значительного количества выпитого на спикерпати."
          />
          <Banner
            icon={<Heart />}
            title="Внутри нам не все равно"
            description="Многим в отрасли поИБ на ИБ. В сообществе мы стараемся сделать наоборот и помогать формировать клуб единомышленников."
          />
          <Banner
            icon={<Goose />}
            title="Нетворкинг и новые знакомства по всему миру"
            description="Общение и обмен опытом с крутыми специалистами по всему миру, разделяющими общие ценности сообщества."
          />
          <Banner
            icon={<Diamond />}
            title="Профессиональный капитал"
            description="Из-за того, что многие разъехались по миру, сообщество станет местом, где будет аккумулироваться интересный опыт, и продолжит накапливаться профессиональный капитал."
          />
        </Grid>
      </Box>

      <Box
        direction={size === "xsmall" ? "column" : "row"}
        gap="medium"
        pad={{ vertical: "large", horizontal: "xlarge" }}
        background="black"
      >
        <Box flex={{ shrink: 0 }}>
          <Dollar />
        </Box>
        <Box>
          <Paragraph fill margin="none">
            Мы решили сделать участие в сообществе
            <Text color="brand"> платным</Text>.
          </Paragraph>
          <Paragraph fill>
            Во-первых, это поможет нам больше работать над сообществом,
            во-вторых, это отличный фильтр и мотивация для будущих участников.
          </Paragraph>
        </Box>
      </Box>
      <Box pad={{ vertical: "large", horizontal: "xlarge" }} align="center">
        <Paragraph textAlign={mobile ? "center" : "start"} fill>
          Сейчас мы активно готовимся к запуску, поэтому если ты заинтересован в
          числе первых оказаться в таком сообществе, оставь нам свою почту, и мы
          напишем, как будем готовы.
        </Paragraph>
      </Box>

      <Box pad={{ vertical: "large", horizontal: "xlarge" }} align="center">
        <EmailField />
      </Box>

      <Box
        direction={mobile ? "column" : "row"}
        margin={{ top: "xlarge" }}
        justify={"between"}
        pad="medium"
        gap="medium"
      >
        <Text textAlign="center" color="text-xweak">
          {"> keep your hand on the cybersecurity pulse"}
        </Text>
        <Text textAlign="center" color="brand">
          CYFEED Community © 2022
        </Text>
      </Box>
    </Box>
  );
};

const Banner = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";

  return (
    <Box
      width={{ max: "600px" }}
      direction={mobile ? "column" : "row"}
      align={mobile ? "center" : "start"}
    >
      <Box flex={{ shrink: 0 }} margin={{ right: "medium", bottom: "medium" }}>
        {icon}
      </Box>
      <Box width={{ max: "336px" }}>
        <Text textAlign={mobile ? "center" : "start"} size="large">
          {title}
        </Text>
        <Paragraph
          textAlign={mobile ? "center" : "start"}
          size="small"
          color="text-weak"
        >
          {description}
        </Paragraph>
      </Box>
    </Box>
  );
};

const EmailField = () => {
  const [value, setvalue] = useState("");
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";
  const [success, setsuccess] = useState(false);

  const handleSubmit = useCallback(() => {
    setsuccess(true);
  }, []);

  return (
    <Box
      direction={mobile ? "column" : "row"}
      align="center"
      alignContent="center"
      justify="center"
      width={{ max: "540px" }}
      margin="auto"
    >
      <Box>
        <EmailInput
          small={mobile}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          width="340px"
          placeholder={
            !value ? (
              <>
                <Text color="text-xweak">
                  <Text color="brand">{">"}</Text> name@domain.com
                </Text>
                <Box
                  alignSelf="center"
                  margin={{ left: "6px" }}
                  background="brand"
                  width="10px"
                  height="18px"
                ></Box>
              </>
            ) : null
          }
        />
      </Box>
      <Box
        margin={mobile ? { top: "medium" } : undefined}
        width={{ max: "189px" }}
        flex="grow"
        fill="vertical"
      >
        <Submit
          success={success}
          small={mobile}
          type="submit"
          fill="vertical"
          onClick={handleSubmit}
          primary
          size="medium"
          color="brand"
          focusIndicator={false}
          label={
            <Text weight="bolder" color="black">
              Хм, интересно
            </Text>
          }
        />
      </Box>
    </Box>
  );
};

const EmailInput = styled(TextInput)<{ small: boolean }>`
  border-radius: ${(props) => {
    return props.small ? "4px" : "4px 0 0 4px";
  }};
  height: ${(props) => (props.small ? "44px" : "57px")};
`;
const Submit = styled(Button)<{ small: boolean; success: boolean }>`
  height: ${(props) => (props.small ? "44px" : "57px")};
  border-radius: ${(props) => {
    return props.small ? "4px" : "0 4px 4px 0";
  }};

  &:hover {
    box-shadow: none;
  }
`;
