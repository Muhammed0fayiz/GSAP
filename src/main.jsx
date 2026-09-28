import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import "./index.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, Flip, MotionPathPlugin, TextPlugin);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
