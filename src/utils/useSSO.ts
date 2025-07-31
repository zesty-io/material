import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export type SSOService = "github" | "google" | "azure";

interface Message {
  source: "zesty";
  status: string;
  error_message: string;
  token?: string;
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
  const receiveMessage = (event: MessageEvent<Message>) => {
    if (event.origin === authServiceUrl && event.data.source === "zesty") {
      setMessage(event.data);
      if (event.data.status === "200") {
        // Set the cookie for .content.one domain as well
        if (event.data.token) {
          let cookieName = "APP_SID";

          if (authServiceUrl.includes("stage")) {
            cookieName = "STAGE_APP_SID";
          } else if (authServiceUrl.includes("dev")) {
            cookieName = "DEV_APP_SID";
          }

          Cookies.set(cookieName, event.data.token, {
            path: "/",
            domain: ".content.one",
          });
        }

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
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const initiate = (service: SSOService) => {
    if (tabWindow) {
      tabWindow.close();
    }
    tabWindow = window.open(`${authServiceUrl}/${service}/login`)!;
  };

  return [initiate, isAuthenticated, error, message] as const;
};
