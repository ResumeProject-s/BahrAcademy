import { createContext } from "react";

export const CoursesContext = createContext();

export const CoursesContextProvider = ({ children, CurrentValue }) => {
  return (
    <CoursesContext.Provider value={CurrentValue}>
      {children}
    </CoursesContext.Provider>
  );
};
