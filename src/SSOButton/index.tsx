import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import { SSOService } from "../utils/useSSO";
import { Github, Google, Microsoft } from "../icons";

/**
 * Props for the SSOButton component.
 */
export interface SSOButtonProps {
  /**
   * Specifies the SSO service to use.
   */
  service: SSOService;

  /**
   * Optional styling properties.
   */
  sx?: SxProps<Theme>;

  /**
   * Optional click handler that returns the selected SSO service.
   */
  onClick?: (service: SSOService) => void;

  /**
   * Optional properties for underlying MUI Button component.
   */
  ButtonProps?: ButtonProps;
}

const ssoServiceMap = {
  "google": {
    name: "Google",
    icon: <Google />,
  },
  "azure": {
    name: "Microsoft",
    icon: <Microsoft />,
  },
  "github": {
    name: "Github",
    icon: <Github />,
  },
}

const SSOButton = ({ sx, service, onClick, ButtonProps }: SSOButtonProps) => {
  const ssoService = ssoServiceMap[service];

  return (
    <Button
      key={service}
      size="large"
      variant="outlined"
      color="inherit"
      onClick={() => {
        if (onClick) {
          onClick(service);
        }
      }}
      startIcon={ssoService.icon}
      sx={{ justifyContent: "flex-start", ...sx }}
      {...ButtonProps}
    >
      Continue with {ssoService.name}
    </Button>
  );
};

export default SSOButton;
