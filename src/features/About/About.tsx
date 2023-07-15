import { Box, Heading, Paragraph, ResponsiveContext, Text } from "grommet";
import { HACKED_GREEN, LANDING_BACKGROUND } from "../../theme";
import React, { useContext } from "react";

import { Diamond } from "./assets/Diamond";
import { Dollar } from "./assets/Dollar";
import { EmailField } from "./EmailField";
import { Goose } from "./assets/Goose";
import { Heart } from "./assets/Heart";
import { Lock } from "./assets/Lock";
import { Rectangles } from "./assets/Rectangles";
import styled from "styled-components";
import { CustomNavLink } from "../Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Login/authSlice";

export const AboutContainer = () => {
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";
  const user = useSelector(selectCurrentUser);

  return (
    <Box
      background={LANDING_BACKGROUND}
      margin={{ top: mobile ? "-80px" : "none" }}
    >
      <Box direction="row" justify="between">
        <Box
          pad="small"
          margin={{ top: mobile ? "80px" : "none" }}
          align="start"
        >
          <CustomNavLink to={user ? "/feed" : "/login"} color="brand">
            <Text size="small" color="brand">
              {user ? "[ГЛАВНАЯ]" : "[ВХОД]"}
            </Text>
          </CustomNavLink>
        </Box>
        <RectanglesBox small={mobile} alignSelf="end">
          <Rectangles />
        </RectanglesBox>
      </Box>
      <Box pad={{ bottom: "large", horizontal: "xlarge", top: "none" }}>
        <Box
          direction="row"
          wrap
          align="end"
          justify="between"
          width={{ max: "660px" }}
        >
          <Heading
            level={1}
            margin={{ vertical: "none", right: "large" }}
            size="large"
            color="brand"
          >
            {"$>CYFEED"}
          </Heading>
          <Text margin={{ vertical: "small" }} color="text-xweak">
            {"$toxics > /dev/null"}
          </Text>
        </Box>

        <Box direction="row">
          <Text color="white" size="xlarge" margin={{ vertical: "medium" }}>
            Закрытое сообщество безопасников и профессионалов по
            кибербезопасности, которым не все равно
            <Cursor />
          </Text>
        </Box>
        <Paragraph
          fill
          color="text-xweak"
          size="medium"
          margin={{ vertical: "none" }}
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
          Наша цель — нести ценность для отрасли кибербезопасности, помогать
          участникам, обмениваться опытом и участвовать в ИБ активностях.
        </Paragraph>
        <Box
          direction={mobile ? "column" : "row"}
          margin={{ top: "large" }}
          align={mobile ? "center" : "start"}
          width={{ max: "1160px" }}
          gap="large"
        >
          <Banner
            icon={<Lock />}
            title="Закрытый формат сообщества"
            description="Позволяет обсудить темы без посторонних и рассказать чуть больше, чем это обычно делают безопасники, даже после значительного количества выпитого на спикерпати."
          />
          <Banner
            icon={<Heart />}
            title="Внутри нам не все равно"
            description="Многим в отрасли поИБ на ИБ. В сообществе мы постараемся сделать наоборот и поможем сформировать клуб единомышленников."
          />
        </Box>
        <Box
          direction={mobile ? "column" : "row"}
          margin={{ top: "medium" }}
          align={mobile ? "center" : "start"}
          width={{ max: "1160px" }}
          gap="large"
        >
          <Banner
            icon={<Goose />}
            title="Нетворкинг и новые знакомства"
            description="Общение и обмен опытом с крутыми специалистами по всему миру позволит не “засыхать” как профессионал и взглянуть на отрасль глубже"
          />
          <Banner
            icon={<Diamond />}
            title="Профессиональный капитал"
            description="Из-за того, что многие разъехались по миру, сообщество станет местом, где будет аккумулироваться интересный опыт, и продолжит накапливаться профессиональный капитал."
          />
        </Box>
      </Box>

      <Box justify="center" pad={{ horizontal: "xlarge", bottom: "medium" }}>
        <Paragraph color="text-xweak" fill textAlign="center">
          Could not open /cyfeed/community/ - (13: Permission denied), are you
          root?
        </Paragraph>
      </Box>

      <Box
        direction={mobile ? "column" : "row"}
        gap="medium"
        pad={{ vertical: "large", horizontal: "xlarge" }}
        background="black"
        align={mobile ? "center" : "start"}
      >
        <Box flex={{ shrink: 0 }}>
          <Dollar />
        </Box>
        <Box gap="small">
          <Paragraph fill margin="none" textAlign={mobile ? "center" : "start"}>
            Мы решили сделать участие в сообществе
            <Text color="brand"> платным</Text>. Примерно, как стоимость одной
            чашки в кофейне.
          </Paragraph>
          <Paragraph margin="none" fill textAlign={mobile ? "center" : "start"}>
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
        <Paragraph textAlign={mobile ? "center" : "start"} color="text-weak">
          {description}
        </Paragraph>
      </Box>
    </Box>
  );
};

const RectanglesBox = styled(Box)<{ small: boolean }>`
  position: relative;
  & > svg {
    transform: ${(props) =>
      props.small ? "scale(0.5) translate(80px, 80px) " : "scale(1)"};
  }
`;

const Cursor = styled.span`
  opacity: 1;

  background: ${HACKED_GREEN};
  height: 26px;
  width: 12px;
  display: inline-block;
  position: relative;
  top: 4px;
  left: 6px;

  @keyframes blink {
    0% {
      opacity: 0;
    }

    25% {
      opacity: 0.5;
    }

    75% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }

  animation-name: blink;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
