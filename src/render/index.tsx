/* eslint-disable no-console */
import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import isElectron from "is-electron";

import store from "./store";
import App from "./app";
import RouteManager from "./component/route-manager";

const container = document.getElementById("root");

if (isElectron()) {
  window.electronApi.handleMessage((event, message) => {
    console.log("srv-message", message);
  });

  console.log("call async-get-time", new Date().toISOString());
  window.electronApi.asyncGetTime().then((time) => {
    console.log("async-get-time", time);
  });
}

if (container) {
  createRoot(container)?.render(
    <Provider store={store}>
      <RouteManager>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RouteManager>
    </Provider>
  );
}
