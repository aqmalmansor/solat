import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerSW } from "virtual:pwa-register";
import { ToastContainer, toast } from "react-toastify";

import App from "./App.tsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const displayOfflinePage = () => {
  const offlineFallbackPage = document.createElement("div");
  offlineFallbackPage.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline</title>
      </head>
      <body>
        <h1>Offline</h1>
        <p>You are currently offline. Please check your internet connection.</p>
      </body>
      </html>
    `;

  document.body.appendChild(offlineFallbackPage);
};

const updateSW = registerSW({
  onNeedRefresh() {
    toast.onChange(() => updateSW(true));
    toast.info("Click Here For New Content", {
      closeOnClick: true,
      theme: "colored",
    });
  },
  onOfflineReady() {
    displayOfflinePage();
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ToastContainer limit={1} />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
