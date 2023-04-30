/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from "react";

import { ChildrenProps, IPatientData } from "../@types";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [patientData, setPatientData] = useState<IPatientData>({
    id: undefined,
    name: undefined,
    gender: undefined,
    dob: undefined,
    address: undefined,
    complaint: undefined,
  });

  const globalStates = {
    patientData,
    setPatientData,
  };

  return (
    <GlobalContext.Provider value={{ globalStates }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
