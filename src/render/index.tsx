/* eslint-disable no-console */
import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import isElectron from "is-electron";
import { AuthClientEvent } from "@react-keycloak-fork/core";
import store from "./store";
import App from "./app";
import RouteManager from "./component/route-manager";
import Keycloak from "keycloak-js";
import axios from "axios";
import { ReactKeycloakProvider } from "@react-keycloak-fork/web";
import { Processing } from "./component/processing";

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
interface AuthCheckerState {
  keycloak?: Keycloak;
  authorized: boolean;
}

const AuthChecker = () => {
  const [state, setState] = React.useState({ authorized: false } as AuthCheckerState);
  const initialize = async () => {
    if (!state.keycloak) {
      const res = await axios("./authenticate.json");
      setState({ ...state, keycloak: new Keycloak(res.data as Keycloak.KeycloakConfig) });
    }
  };

  React.useEffect(() => {
    initialize().catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeycloakEvent = (event: AuthClientEvent) => {
    if (event === "onAuthSuccess") {
      setState({ ...state, authorized: true });
    } else if (event === "onAuthLogout") {
      setState({ ...state, authorized: false });
    }
    //console.log(event, error);
  };

  // ReactKeycloakProvider: 로그인 인증 방법에 대하여 확인이 필요할 경우 아래 링크 참조 바라며, 로그인을 위해서는
  // initOptions={{ onLoad: 'login-required' }} 을 추가해야 한다.
  // 참조: https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options
  return (
    <React.StrictMode>
      {state.keycloak ? (
        <ReactKeycloakProvider
          authClient={state.keycloak}
          onEvent={onKeycloakEvent}
          initOptions={{ onLoad: "login-required" }}
        >
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ReactKeycloakProvider>
      ) : (
        <Processing />
      )}
      {/* <ChakraProvider theme={baseTheme}>
        <DarkMode>
          <GlobalStyle />
          <App />
        </DarkMode>
      </ChakraProvider> */}
    </React.StrictMode>
  );
};

if (container) {
  createRoot(container)?.render(
    <Provider store={store}>
      <RouteManager>
        <AuthChecker />
      </RouteManager>
    </Provider>
  );
}
