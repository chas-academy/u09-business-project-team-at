import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { load } from "ts-dotenv";

const GOOGLE_OAUTH_CLIENT = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT}>
    <App />
  </GoogleOAuthProvider>
);
