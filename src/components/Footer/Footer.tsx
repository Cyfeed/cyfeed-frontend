import { Footer as GrommetFooter, Text } from "grommet";
import React from "react";
import { useIsMobile } from "../../utils/useIsMobile";

type Props = {};

export const Footer = (props: Props) => {
  const mobile = useIsMobile();

  return (
    <GrommetFooter
      direction={mobile ? "column" : "row"}
      margin={{ vertical: "medium" }}
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
    </GrommetFooter>
  );
};
