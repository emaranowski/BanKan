import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";
import "./index.css";

import AppContext from "./context/Context";
// import { baseUrl } from "./config.js";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [boardOrg, setBoardOrg] = useState({
    board: { "title": "Loading...", "imageUrl": "" },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Loading...",
        cardIds: [],
      },
    }
  });

  const context = { boardOrg, setBoardOrg, token };

  return (
    <AppContext.Provider value={context}>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </AppContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
