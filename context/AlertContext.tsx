"use client";

import Alert from "@/components/Alert";
import Overlay from "@/components/Overlay";
import {
  createContext,
  JSX,
  ReactNode,
  startTransition,
  useContext,
  useState,
} from "react";
import { AnimatePresence } from "motion/react";

interface showAlertProps {
  title: string;
  message: string;
  btnText: string;
  btnStyle: "default" | "primary" | "danger";
  onConfirm: () => void;
  loading?: boolean;
  overlay: {
    theme: "dark" | "light";
  };
  state?: any;
}
interface AlertContextType {
  showAlert: (data: showAlertProps) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertData, setAlertData] = useState<showAlertProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionsLoading, setActionLoading] = useState<boolean | null>(null);

  const showAlert = (data: showAlertProps) => {
    setAlertData(data);
  };
  const hideAlert = () => {
    if (!loading) setAlertData(null);
  };

  const handleConfirm = async () => {
    if (!alertData) return;
    try {
      setLoading(true);
      startTransition(() => alertData.onConfirm());
      hideAlert();
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AnimatePresence>
        {alertData && (
          <>
            <Alert
              {...alertData}
              loading={
                alertData.loading !== undefined ? alertData.loading : loading
              }
              onConfirm={handleConfirm}
              onCancel={hideAlert}
            />
            <Overlay {...alertData.overlay} />
          </>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used inside AlertProvider");

  return context;
};
