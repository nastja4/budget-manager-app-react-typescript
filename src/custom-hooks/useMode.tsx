import { useContext } from "react";
import ModeContext from "../context/ModeContext";

export const useMode = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error("Use ModeContext only inside ModeContextProvider");
  }

  return context;
};
