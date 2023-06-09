import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";

import { GlobalProvider } from "./contexts/Global.tsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00B96B",
            borderRadius: 10,
          },
        }}
      >
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
