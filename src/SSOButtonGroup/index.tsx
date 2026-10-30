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
  onSuccess: (message: object) => void;

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
  const [initiate, isAuthenticated, ssoError, message] = useSSO(authServiceUrl);

  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      onSuccess(message);
    } else if (ssoError && onError) {
      onError(ssoError.message);
    }
    // Keyed on message, not [isAuthenticated, ssoError]: those only flip
    // false->true once and never reset, so a second SSO login in the same
    // mount left this effect latched and silently dropped onSuccess/onError.
    // useSSO sets a fresh message object on every postMessage it receives
    // (including repeats of the same status), so it re-fires each time.
    // onSuccess/onError intentionally omitted: this effect should fire once
    // per incoming message, not on every render where a caller passes a new
    // (unmemoized) callback reference, which would re-invoke onSuccess/
    // onError repeatedly for the same auth result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

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
