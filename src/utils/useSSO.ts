import { useEffect, useState } from "react";

export type SSOService = "github" | "google" | "azure";

interface Message {
  source: "zesty";
  status: string;
  error_message: string;
}

let tabWindow: Window | null = null;
export const useSSO = (authServiceUrl: string) => {
  const [message, setMessage] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const receiveMessage = (event: MessageEvent<Message>) => {
    if (event.origin === authServiceUrl && event.data.source === "zesty") {
      setMessage(event.data);
      if (event.data.status === "200") {
        setIsAuthenticated(true);
      } else {
        setError(event.data.error_message);
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
