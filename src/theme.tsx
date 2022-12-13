import { Text, ThemeType } from "grommet";

export const HACKED_GREEN = "#B9EA4C";
export const HACKED_BLACK = "#090A14";
export const HACKED_BLUE = "#1144FF";
export const HACKED_GREY = "#686A7C";
export const HACKED_DARK_GREY = "#1C1E23";
export const HACKED_WHITE = "#E1E1E1;";
export const HACKED_DARK_WHITE = "#B0B8C1";
export const COLOR_TEXT_XWEAK = "#B9BFC6;";
export const HACKED_RED = "#EB4B4C";
export const LANDING_BACKGROUND = "#13161E";
export const HACKED_STROKE = `#2C2D39`;

export const UNIT_1 = "4px";
export const UNIT_2 = "8px";
export const UNIT_3 = "12px";
export const UNIT_4 = "16px";
export const UNIT_5 = "20px";
export const UNIT_6 = "24px";
export const UNIT_7 = "32px";
export const UNIT_8 = "40px";
export const UNIT_9 = "48px";

export const theme: ThemeType = {
  global: {
    input: { font: { weight: "normal", size: "16px" } },
    breakpoints: {
      xsmall: {
        value: 425,
      },
    },
    font: {
      family: "IBM Plex Mono",
    },
    colors: {
      active: HACKED_GREY,
      "background-back": {
        dark: "#33333308",
        light: "#EDEDED",
      },
      "background-front": {
        dark: HACKED_GREY,
        light: "#FFFFFF",
      },
      "background-contrast": {
        light: "#33333310",
        dark: HACKED_DARK_GREY,
      },
      "active-background": "background-contrast",
      "active-text": "text-strong",
      black: HACKED_BLACK,
      border: {
        dark: HACKED_STROKE,
        light: "rgba(0, 0, 0, 0.33)",
      },
      brand: HACKED_GREEN,
      control: {
        dark: "accent-1",
        light: "brand",
      },
      focus: HACKED_GREY,
      "graph-0": "accent-1",
      "graph-1": "neutral-1",
      "graph-2": "neutral-2",
      "graph-3": "neutral-3",
      "graph-4": "neutral-4",
      placeholder: "#AAAAAA",
      selected: "brand",
      text: {
        dark: "#f8f8f8",
        light: "#444444",
      },
      "text-strong": {
        dark: "white",
        light: "#000000",
      },
      "text-weak": {
        dark: HACKED_DARK_WHITE,
        light: "#555555",
      },
      "text-xweak": {
        dark: HACKED_GREY,
        light: "#666666",
      },
      icon: {
        dark: "#f8f8f8",
        light: "#666666",
      },
      "selected-background": "brand",
      "selected-text": "text-strong",
      white: HACKED_WHITE,
      "accent-1": HACKED_GREEN,
      "accent-2": HACKED_BLUE,
      "status-error": HACKED_RED,
    },
    control: {
      border: {
        radius: UNIT_1,
      },
    },
  },
  button: {
    size: {
      large: { border: { radius: UNIT_2 } },
      medium: { border: { radius: UNIT_2 } },
      small: { border: { radius: UNIT_2 } },
    },
  },
  formField: {
    border: { side: "all", color: HACKED_DARK_GREY },
    round: UNIT_1,
    label: {
      margin: { start: "none" },
      size: "xsmall",
      requiredIndicator: (
        <Text margin={{ start: "xsmall" }} size="xsmall" color={"text-xweak"}>
          (Required)
        </Text>
      ),
    },
    // @ts-ignore хз почему размер не типизирован, он точно есть
    info: { color: "text-weak", margin: { start: "none" }, size: "xsmall" },
    // @ts-ignore то же самое
    error: { color: "status-error", margin: { start: "none" }, size: "xsmall" },
  },
  textInput: {
    // @ts-ignore то же самое
    extend: { "background-color": HACKED_DARK_GREY, color: HACKED_DARK_WHITE },
  },
  textArea: {
    // @ts-ignore то же самое
    extend: { "background-color": HACKED_DARK_GREY, color: HACKED_DARK_WHITE },
  },
};
