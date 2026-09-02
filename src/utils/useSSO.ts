import { useCallback, useEffect, useState } from "react";

export type SSOService = "github" | "google" | "azure";

interface Message {
  source: "zesty";
  status: string;
  error_message: string;
}

interface Error {
  message: string;
  status: string;
}

let tabWindow: Window | null = null;
export const useSSO = (authServiceUrl: string) => {
  const [message, setMessage] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // Depends on authServiceUrl so the listener re-subscribes with a fresh
  // closure if the caller passes a different auth service URL after mount,
  // instead of silently validating incoming messages against a stale origin.
  const receiveMessage = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.origin === authServiceUrl && event.data.source === "zesty") {
        setMessage(event.data);
        if (event.data.status === "200") {
          setIsAuthenticated(true);
        } else {
          setError({
            message: event.data.error_message,
            status: event.data.status,
          });
        }
        if (tabWindow) {
          tabWindow.close();
        }
      }
    },
    [authServiceUrl],
  );

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, [receiveMessage]);

  const initiate = (service: SSOService) => {
    if (tabWindow) {
      tabWindow.close();
    }
    tabWindow = window.open(`${authServiceUrl}/${service}/login`)!;
  };

  return [initiate, isAuthenticated, error, message] as const;
};
