/* eslint-disable no-console */
import React from "react";
import Counter from "./component/counter";
import { connect } from "react-redux";
import { LocationInfo, locMoveTo } from "./store/router/router-slice";
import { RootState } from "./store";
import { HStack, IconButton, Link, Spacer, useColorMode, VStack } from "@chakra-ui/react";
import Help from "./component/help";
import { BiMoon, BiSun } from "react-icons/bi";
import UnderConstruction from "./component/under-construction";
import CounterMonitor from "./component/counter-monitor";

interface AppProps {
  location: LocationInfo;
  locMoveTo: (path: string) => void;
}
const App = (props: AppProps): JSX.Element => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <React.Fragment>
      <HStack m="4px">
        <Link onClick={() => props.locMoveTo("/")}>Home</Link>&nbsp;
        <Link onClick={() => props.locMoveTo("/help")}>Help</Link>
        <Spacer />
        <IconButton
          aria-label="color-mode"
          size="xs"
          fontSize="20px"
          icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        />
      </HStack>
      {props.location.pathname === "/" && (
        <VStack>
          <Counter />
          <CounterMonitor />
        </VStack>
      )}
      {props.location.pathname === "/help" && <Help />}
      {props.location.pathname !== "/" && props.location.pathname !== "/help" && <UnderConstruction />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
});

export default connect(mapStateToProps, { locMoveTo })(App);
