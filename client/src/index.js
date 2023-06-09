//utils
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { FontStyles, GlobalStyles } from "./constants/globalStyles";
import { theme } from "./constants/theme";
import store from "./redux/store";

//components
import App from "./App";

//providers
import AuthContextProvider from "./providers/auth/AuthProvider";
import AlertContextProvider from "./providers/alert/AlertProvider";
import ChatContextProvider from "./providers/chat/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AlertContextProvider>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <ChatContextProvider>
            {/* <FontStyles /> */}
            <GlobalStyles />
            <App />
          </ChatContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </AlertContextProvider>
  </Provider>
  // </React.StrictMode>
);
