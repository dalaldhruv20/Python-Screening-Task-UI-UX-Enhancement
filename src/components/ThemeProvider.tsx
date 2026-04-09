import { createContext, useContext, ReactNode } from "react";

interface ThemeContextType {
  theme: "dark";
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark" });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};
