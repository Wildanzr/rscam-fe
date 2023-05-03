import { useEffect } from "react";

import AppRoutes from "./routes";

const App = () => {
  // Priority tailwindcss over antd
  useEffect(() => {
    const head = document.querySelector("head");
    const styleTag = head?.querySelectorAll<HTMLStyleElement>("style");
    const tailwindStyleTag = [...(styleTag ?? [])].find((style) =>
      style.innerHTML.includes("tailwind")
    );
    head?.insertAdjacentElement(
      "afterbegin",
      tailwindStyleTag ?? document.createElement("style")
    );
  }, []);

  return <AppRoutes />;
};

export default App;
