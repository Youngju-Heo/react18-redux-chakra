/* eslint-disable no-console */
import React from "react";
import Counter from "./component/counter";
import { connect } from "react-redux";
import { LocationInfo, locMoveTo } from "./store/router/router-slice";
import { RootState } from "./store";
import { Center, HStack, IconButton, Link, Spacer, Tag, useColorMode } from "@chakra-ui/react";
import Help from "./component/help";
import { BiMoon, BiSun } from "react-icons/bi";

interface AppProps {
  location: LocationInfo;
  locMoveTo: (path: string) => void;
}
const App = (props: AppProps): JSX.Element => {
  const { colorMode, setColorMode } = useColorMode();
  // useEffect(() => {
  //   if (colorMode !== "dark") {
  //     setColorMode("dark");
  //   }
  // }, [colorMode, setColorMode]);

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
          icon={colorMode === "light" ? <BiSun /> : <BiMoon />}
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        />
      </HStack>
      {props.location.pathname === "/" && <Counter />}
      {props.location.pathname === "/help" && <Help />}
      {props.location.pathname !== "/" && props.location.pathname !== "/help" && (
        <Center>
          <Tag>
            <Center w="120px" h="40px" m={4} fontSize="20px">
              404 NotFound
            </Center>
          </Tag>
        </Center>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
});

export default connect(mapStateToProps, { locMoveTo })(App);
