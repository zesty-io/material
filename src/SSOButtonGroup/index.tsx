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
  const [initiate, , , message] = useSSO(authServiceUrl);

  useEffect(() => {
    // Branch on the message itself, not isAuthenticated/ssoError: those
    // latched after the first result, and where setState from a native
    // listener is not batched (React 17, or a legacy root in 18) they lag
    // the message, so the effect read stale values.
    if (!("status" in message)) return;
    if (message.status === "200") {
      onSuccess?.(message);
    } else {
      onError?.(message.error_message);
    }
    // Callbacks omitted: fire once per message, not per new callback ref.
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
