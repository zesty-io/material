import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export type SSOService = "github" | "google" | "azure";

interface Message {
  source: "zesty";
  status: string;
  error_message: string;
}

interface SSOCallbacks {
  onSuccess: (message: Message) => void;
  onError: (error: string) => void;
}

let tabWindow: Window | null = null;
export const useSSO = (authServiceUrl: string, callbacks: SSOCallbacks) => {
  // Latest callbacks, set on commit, so the listener needn't resubscribe.
  const callbacksRef = useRef(callbacks);
  useLayoutEffect(() => {
    callbacksRef.current = callbacks;
  });
  // Depends on authServiceUrl so the listener re-subscribes with a fresh
  // closure if the caller passes a different auth service URL after mount,
  // instead of silently validating incoming messages against a stale origin.
  const receiveMessage = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.origin === authServiceUrl && event.data.source === "zesty") {
        if (tabWindow) {
          tabWindow.close();
        }
        const { onSuccess, onError } = callbacksRef.current;
        if (event.data.status === "200") {
          onSuccess?.(event.data);
        } else {
          onError?.(event.data.error_message);
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

  return initiate;
};
