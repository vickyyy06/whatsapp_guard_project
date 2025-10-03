import { createContext, useContext, useState, ReactNode } from "react";

export type WarningMode = "always" | "smart" | "custom" | "never";

interface SettingsContextType {
  warningsEnabled: boolean;
  setWarningsEnabled: (enabled: boolean) => void;
  warningMode: WarningMode;
  setWarningMode: (mode: WarningMode) => void;
  newContactWarning: boolean;
  setNewContactWarning: (enabled: boolean) => void;
  similarNameWarning: boolean;
  setSimilarNameWarning: (enabled: boolean) => void;
  groupWarning: boolean;
  setGroupWarning: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [warningsEnabled, setWarningsEnabled] = useState(true);
  const [warningMode, setWarningMode] = useState<WarningMode>("smart");
  const [newContactWarning, setNewContactWarning] = useState(true);
  const [similarNameWarning, setSimilarNameWarning] = useState(true);
  const [groupWarning, setGroupWarning] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        warningsEnabled,
        setWarningsEnabled,
        warningMode,
        setWarningMode,
        newContactWarning,
        setNewContactWarning,
        similarNameWarning,
        setSimilarNameWarning,
        groupWarning,
        setGroupWarning,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
