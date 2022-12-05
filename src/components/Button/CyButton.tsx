import { Box, Button, ButtonExtendedProps, Spinner, Text } from "grommet";

export enum EButtonTheme {
  Green = "green",
  White = "white",
  Black = "black",
}

const TEXT_COLOR_MAP = {
  [EButtonTheme.Green]: "black",
  [EButtonTheme.Black]: "white",
  [EButtonTheme.White]: "black",
};

const BG_COLOR_MAP = {
  [EButtonTheme.Green]: "brand",
  [EButtonTheme.Black]: "black",
  [EButtonTheme.White]: "white",
};

interface ICyButtonProps extends ButtonExtendedProps {
  theme?: EButtonTheme;
  loading?: boolean;
}

export const CyButton = ({
  theme = EButtonTheme.White,
  loading = false,
  ...buttonProps
}: ICyButtonProps) => {
  const textColor = buttonProps.primary ? TEXT_COLOR_MAP[theme] : "white";
  const bg = BG_COLOR_MAP[theme];

  return (
    <Button
      label={
        !loading ? (
          <Text color={textColor}>{buttonProps.label}</Text>
        ) : (
          <Box justify="center" align="center">
            <Spinner />
          </Box>
        )
      }
      color={bg}
      {...buttonProps}
    />
  );
};
