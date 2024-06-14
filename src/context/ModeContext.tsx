import React, { FC, useState } from "react";

export type Mode = "light" | "dark";

type ModeContext = {
  selectedMode: Mode;
  toggleMode: () => void;
};

const ModeContext = React.createContext<ModeContext | null>(null);

export default ModeContext;

type ModeContextProviderProps = {
  children: React.ReactNode;
  selectedTheme: Mode;
  setSelectedTheme: (theme: Mode) => void;
};

export const ModeContextProvider: FC<ModeContextProviderProps> = ({
  children,
  selectedTheme,
  setSelectedTheme,
}) => {
  const [selectedMode, setSelectedMode] = useState<Mode>(
    selectedTheme || "light"
  );

  const toggleMode = () => {
    const mode = selectedMode === "light" ? "dark" : "light";
    setSelectedMode(mode);
    setSelectedTheme(mode);
  };
  return (
    <ModeContext.Provider value={{ selectedMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
