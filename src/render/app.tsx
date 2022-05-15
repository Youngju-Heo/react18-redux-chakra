/* eslint-disable no-console */
import React, { useEffect } from "react";
import Counter from "./component/counter";
import { connect } from "react-redux";
import { LocationInfo, locMoveTo } from "./store/router/router-slice";
import { RootState } from "./store";
import { Center, Link, useColorMode } from "@chakra-ui/react";

interface AppProps {
  location: LocationInfo;
  locMoveTo: (path: string) => void;
}
const App = (props: AppProps): JSX.Element => {
  const { colorMode, setColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode !== "dark") {
      setColorMode("dark");
    }
  }, [colorMode, setColorMode]);

  return (
    <React.Fragment>
      <Link onClick={() => props.locMoveTo("/")}>Home</Link>&nbsp;
      <Link onClick={() => props.locMoveTo("/help")}>Help</Link>
      {props.location.pathname === "/" && <Counter />}
      {props.location.pathname === "/help" && <Center>Help page</Center>}
      {props.location.pathname !== "/" && props.location.pathname !== "/help" && <div>Unknown</div>}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
});

export default connect(mapStateToProps, { locMoveTo })(App);
