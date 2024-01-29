import { Box, SxProps, Theme } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { SSOService, useSSO } from "../utils/useSSO";

/**
 * Props for the SSOButtonGroup component.
 */
export interface SSOButtonGroupProps {
  /**
   * React elements to be rendered within the group.
   */
  children: ReactNode;

  /**
   * The URL endpoint for the authentication service.
   */
  authServiceUrl: string;

  /**
   * Callback invoked upon successful authentication.
   */
  onSuccess: () => void;

  /**
   * Callback invoked when an error occurs during authentication.
   * @param error - Description or details of the error.
   */
  onError: (error: string) => void;

  /**
   * Optional styling properties.
   */
  sx?: SxProps<Theme>;
}

const SSOButtonGroup = ({
  children,
  sx,
  authServiceUrl,
  onSuccess,
  onError,
}: SSOButtonGroupProps) => {
  const [initiate, isAuthenticated, ssoError] = useSSO(authServiceUrl);

  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      onSuccess();
    } else if (ssoError && onError) {
      onError(ssoError.message);
    }
  }, [isAuthenticated, ssoError]);

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={sx}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            authServiceUrl,
            onSuccess,
            onError,
            onClick: (service: SSOService) => {
              initiate(service);
            },
          });
        }
        return child;
      })}
    </Box>
  );
};

export default SSOButtonGroup;
