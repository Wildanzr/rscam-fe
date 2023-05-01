/* eslint-disable react-refresh/only-export-components */
import { ChildrenProps, PatientProps, CheckUpProps } from "../@types";

import { useState, createContext, useContext } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [patientData, setPatientData] = useState<PatientProps>({
    id: undefined,
    name: undefined,
    gender: undefined,
    dob: undefined,
    address: undefined,
    complaint: undefined,
  });
  const [checkUpData, setCheckUpData] = useState<CheckUpProps>({
    result: undefined,
    advice: undefined,
    conclusion: undefined,
    pictures: undefined,
    videos: undefined,
  });
  const [renderUploadedPictures, setRenderUploadedPictures] = useState<boolean>(
    false
  );
  const [renderUploadedVideos, setRenderUploadedVideos] = useState<boolean>(
    false
  );

  const globalStates = {
    patientData,
    setPatientData,
    checkUpData,
    setCheckUpData,
    renderUploadedPictures,
    setRenderUploadedPictures,
    renderUploadedVideos,
    setRenderUploadedVideos,
  };

  return (
    <GlobalContext.Provider value={{ globalStates }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
