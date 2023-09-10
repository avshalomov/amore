import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { AppProvider } from "./AppContext";

// Importing the global styles
import "./assets/styles/components.css";
import "./assets/styles/buttons.css";
import "./assets/styles/text.css";
import "./assets/styles/card.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Providing the AppContext to the entire app
root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);

reportWebVitals();
