/* eslint-disable react-refresh/only-export-components */
import { ChildrenProps, PatientProps, CheckUpProps } from "../@types";

import { useState, useEffect, createContext, useContext } from "react";
import { customAlphabet } from "nanoid";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: ChildrenProps) => {
  // States
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
  const [qrCode, setQRCode] = useState<string | undefined | null>(undefined);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Functions
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 10)

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(navigator.onLine);

    // Listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOnline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOnline);
    }
  }, [isOnline])

  const globalStates = {
    patientData,
    setPatientData,
    checkUpData,
    setCheckUpData,
    renderUploadedPictures,
    setRenderUploadedPictures,
    renderUploadedVideos,
    setRenderUploadedVideos,
    qrCode,
    setQRCode,
    isOnline
  };

  const globalFunctions = {
    nanoid
  }

  return (
    <GlobalContext.Provider value={{ globalStates, globalFunctions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
