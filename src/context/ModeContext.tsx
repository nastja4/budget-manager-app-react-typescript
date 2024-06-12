import React, { useState } from "react";

type Mode = "light" | "dark";

type ModeContext = {
  selectedMode: Mode;
  toggleMode: () => void;
};

const ModeContext = React.createContext<ModeContext | null>(null);

export default ModeContext;

export const ModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedMode, setSelectedMode] = useState<Mode>("light");

  const toggleMode = () => {
    setSelectedMode(selectedMode === "light" ? "dark" : "light");
  };
  return (
    <ModeContext.Provider value={{ selectedMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
