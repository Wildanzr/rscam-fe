import React, { useEffect } from "react";

import AppRoutes from "./routes";

const App: React.FC = () => {
  // Priority tailwindcss over antd
  useEffect(() => {
    const head = document.querySelector("head");
    const styleTags = Array.from(head?.querySelectorAll<HTMLStyleElement>("style") ?? []);
  
    const tailwindStyleTag = styleTags.find((style) =>
      style.innerHTML.includes("tailwind")
    );
  
    if (tailwindStyleTag) {
      head?.insertAdjacentElement("afterbegin", tailwindStyleTag);
    } else {
      const newStyleTag = document.createElement("style");
      newStyleTag.innerHTML = "/* Your tailwind styles here */";
      head?.insertAdjacentElement("afterbegin", newStyleTag);
    }
  }, []);
  

  return <AppRoutes />;
};

export default App;
