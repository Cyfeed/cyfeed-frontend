import { Box } from "grommet";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Box pad={{ horizontal: "large", vertical: "large" }}>{children}</Box>;
};
