import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Provider } from "react-redux";
import { FontStyles, GlobalStyles } from "./constants/globalStyles";
import { theme } from "./constants/theme";
import AuthContextProvider from "./providers/auth/AuthProvider";
import store from "./redux/store";
import AlertContextProvider from "./providers/alert/AlertProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AlertContextProvider>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          {/* <FontStyles /> */}
          <GlobalStyles />
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </AlertContextProvider>
  </Provider>
  // </React.StrictMode>
);
