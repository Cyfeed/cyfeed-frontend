import { ResponsiveContext } from "grommet";
import { useContext } from "react";

export const useIsMobile = () => {
  const size = useContext(ResponsiveContext);
  const mobile = size === "small" || size === "xsmall";

  return mobile;
};
