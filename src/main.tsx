import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "../src/Context/AuthContext.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./service/queryClient.ts";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
