import { Color } from "@mui/material";
import { alpha, PaletteOptions } from "@mui/material/styles";

// Module augmentation
declare module "@mui/material/styles" {
  export interface Palette {
    red: Color;
    deepPurple: Color;
    deepOrange: Color;
    pink: Color;
    blue: Color;
    green: Color;
    purple: Color;
    yellow: Color;
  }
  export interface PaletteOptions {
    red?: Partial<Color>;
    deepPurple?: Partial<Color>;
    deepOrange?: Partial<Color>;
    pink?: Partial<Color>;
    blue?: Partial<Color>;
    green?: Partial<Color>;
    purple?: Partial<Color>;
    yellow?: Partial<Color>;
    border?: string;
  }
}

const lightThemePalette: PaletteOptions = {
  primary: {
    main: "#FF5D0A",
    dark: "#EC4A0A",
    light: "#FD853A",
  },
  success: {
    main: "#12B76A",
    dark: "#027A48",
    light: "#D1FADF",
	contrastText: "#ffffff",
  },
  warning: {
    main: "#F79009",
    dark: "#B54708",
    light: "#FEF0C7",
  },
  error: {
    main: "#F04438",
    dark: "#B42318",
    light: "#FECDCA",
  },
  info: {
    main: "#0BA5EC",
    dark: "#026AA2",
    light: "#7CD4FD",
	contrastText: "#ffffff",
  },
  text: {
    primary: "#101828",
    secondary: "#475467",
    disabled: alpha("#101828", 0.56),
  },
  grey: {
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#E4E7EC",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },
  deepPurple: {
    50: "#F8F9FC",
    100: "#EAECF5",
    200: "#C8CCE5",
    300: "#9EA5D1",
    400: "#4E5BA6",
    500: "#4E5BA6",
    600: "#3E4784",
    700: "#363F72",
    800: "#293056",
    900: "#101323",
  },
  deepOrange: {
    50: "#FFF6ED",
    100: "#FFEAD5",
    200: "#FDDCAB",
    300: "#FEB273",
    400: "#FD853A",
    500: "#FF5C08",
    600: "#EC4A0A",
    700: "#C4320A",
    800: "#9C2A10",
    900: "#7E2410",
  },
  red: {
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
    800: "#912018",
    900: "#7A271A",
  },
  pink: {
    50: "#FDF2FA",
    100: "#FCE7F6",
    200: "#FCCEEE",
    300: "#FAA7E0",
    400: "#F670C7",
    500: "#EE46BC",
    600: "#DD2590",
    700: "#C11574",
    800: "#9E165F",
    900: "#851651",
  },
  blue: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#B9E6FE",
    300: "#7CD4FD",
    400: "#36BFFA",
    500: "#0BA5EC",
    600: "#0086C9",
    700: "#026AA2",
    800: "#065986",
    900: "#0B4A6F",
  },
  green: {
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31",
  },
  purple: {
    50: "#F4F3FF",
    100: "#EBE9FE",
    200: "#D9D6FE",
    300: "#BDB4FE",
    400: "#9B8AFB",
    500: "#7A5AF8",
    600: "#6938EF",
    700: "#5925DC",
    800: "#4A1FB8",
    900: "#3E1C96",
  },
  yellow: {
    50: "#FFFCF5",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#93370D",
    900: "#7A2E0E",
  },
  border: "#F2F4F7",
  action: {
    active: "rgba(127, 127, 126, 0.6)",
    hover: "rgba(16, 24, 40, 0.04)",
    selected: "rgba(127,127, 126, 0.13)",
	disabled: "rgba(127,127, 126, 0.48)",
	disabledBackground: "rgba(127,127, 126, 0.2)",
    focus: "rgba(16, 24, 40, 0.12)",
  },
};

const darkThemePalette = {
  ...lightThemePalette,
  text: {
    primary: "#ffffff",
    secondary: "#98A2B3",
    disabled: "#D0D5DD",
  },
  action: {
    active: "#98A2B3",
    hover: alpha("#FF5D0A", 0.08),
    selectedOpacity: 0.08,
  },
  border: "#1D2939",
  background: {
    paper: "#101828",
  },
};

export { lightThemePalette, darkThemePalette };