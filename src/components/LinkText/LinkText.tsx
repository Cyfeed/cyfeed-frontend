import { Text } from "grommet";
import styled from "styled-components";
import { HACKED_GREEN } from "../../theme";

export const LinkText = styled(Text)<{ underline?: boolean }>`
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  cursor: pointer;

  transition: color 250ms;

  &:hover {
    color: ${HACKED_GREEN};
  }
`;
