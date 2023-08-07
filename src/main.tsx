import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerSW } from "virtual:pwa-register";
import { ToastContainer, toast } from "react-toastify";

import App from "./App.tsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const updateSW = registerSW({
  onNeedRefresh() {
    toast.onChange(() => updateSW(true));
    toast.info("Click Here For New Content", {
      closeOnClick: true,
      theme: "colored",
    });
  },
  onOfflineReady() {
    alert("Testing offline mode");
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
