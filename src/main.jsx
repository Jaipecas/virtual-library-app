import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { VirtualLibraryApp } from "./VirtualLibraryApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <VirtualLibraryApp />
    </BrowserRouter>
  </StrictMode>
);
