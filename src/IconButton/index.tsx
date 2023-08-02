import { IconButton as IconButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";

export type Props = {
  variant?: "standard" | "contained";
};

export const IconButton = styled(IconButtonBase)<Props>(
  ({ theme, variant = "standard", color = "inherit" }) => {
    if (variant === "standard") {
      return {};
    }
    const colorVariant =
      color === "default" || color === "inherit" ? "primary" : color;

    return {
      backgroundColor: theme.palette[colorVariant].main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette[colorVariant].dark,
      },
    };
  }
);
