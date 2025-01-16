export interface ServiceWorkerContextProps {
  sw: ServiceWorkerRegistration | null;
  setSw: React.Dispatch<React.SetStateAction<ServiceWorkerRegistration | null>>;
}
