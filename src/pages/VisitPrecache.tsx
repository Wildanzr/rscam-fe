import React from "react";

import Chanel from "../assets/chanel.png";
import VideoThumb from "../assets/videothumb.png";
import "../assets/OpenSans-Regular.ttf";
import "../assets/OpenSans-SemiBold.ttf";

const VisitPrecache: React.FC = () => {
  return (
    <div className="absolute items-start justify-center w-0 h-0 kucing-garong -z-50">
      <img src={Chanel} alt="Chanel" className="w-1/2" />
      <img src={VideoThumb} alt="Video Thumb" className="w-1/2" />
      <p className="font-face-regular">Ini regular</p>
      <p className="font-face-semibold">Ini semibold</p>
      <p>Ini default</p>
    </div>
  );
};

export default VisitPrecache;
