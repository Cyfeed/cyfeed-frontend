import { Box, ResponsiveContext } from "grommet";
import React, { useContext } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";

  return (
    <Box
      flex="grow"
      fill="vertical"
      pad={{ horizontal: mobile ? "16px" : "large", vertical: "large" }}
    >
      {children}
    </Box>
  );
};
