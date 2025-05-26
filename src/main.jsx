import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import theme from "./themes/theme";
import { VirtualLibraryApp } from "./VirtualLibraryApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <CssBaseline />
          <VirtualLibraryApp />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
