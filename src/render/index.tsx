import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import store from "./store";
import App from "./app";
import RouteManager from "./component/route-manager";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root?.render(
    <Provider store={store}>
      <RouteManager>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RouteManager>
    </Provider>
  );
}
