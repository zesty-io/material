import { alpha } from "@mui/material/styles";

const palette = {
  secondary: {
    main: "#FF5D0A",
    contrastText: "#ffffff",
  },
  primary: {
    main: "#FF5D0A",
    dark: "#EC4A0A",
    light: "#FD853A",
    contrastText: "#ffffff",
  },
  success: {
    main: "#12B76A",
    dark: "#027A48",
    light: "#D1FADF",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#F79009",
    dark: "B54708",
    light: "#FEF0C7",
    contrastText: "#ffffff",
  },
  error: {
    main: "#F04438",
    dark: "#B42318",
    light: "#FECDCA",
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
  border: "#F2F4F7",
  action: {
    active: "rgba(16, 24, 40, 0.40)",
    hover: "rgba(16, 24, 40, 0.04)",
    selected: "rgba(16, 24, 40, 0.08)",
    disabled: "rgba(16, 24, 40, 0.26)",
    disabledBackground: "rgba(16, 24, 40, 0.12)",
    focus: "rgba(16, 24, 40, 0.12)",
  },
};
export default palette;
