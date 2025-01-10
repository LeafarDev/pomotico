import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { ServiceWorkerContextProps } from "../types/types.ts";

const ServiceWorkerContext = createContext<
  ServiceWorkerContextProps | undefined
>(undefined);

export const ServiceWorkerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sw, setSw] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSw(registration);
      });
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider value={{ sw, setSw }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};

export const useServiceWorker = () => {
  const context = useContext(ServiceWorkerContext);
  if (!context) {
    throw new Error(
      "useServiceWorker must be used within a ServiceWorkerContext",
    );
  }
  return context;
};
