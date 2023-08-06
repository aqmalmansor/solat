import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerSW } from "virtual:pwa-register";
import { ToastContainer, toast } from "react-toastify";

import App from "./App.tsx";
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    // if (confirm("New content available. Refresh?")) {
    toast.info("New content available. Click to Refresh", {
      closeOnClick: true,
      onClick: () => updateSW(true),
    });

    // }
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
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
