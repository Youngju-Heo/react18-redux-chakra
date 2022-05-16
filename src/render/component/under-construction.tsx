import React from "react";
import { Center, Flex, VStack } from "@chakra-ui/react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { LocationInfo } from "../store/router/router-slice";
import { MdConstruction } from "react-icons/md";

interface UnderConstructionProps {
  location: LocationInfo;
}

const UnderConstruction = (props: UnderConstructionProps): JSX.Element => {
  return (
    <Flex h="100%" w="100%">
      <Center flexGrow={1}>
        <VStack>
          <Center fontSize="120px">
            <MdConstruction />
          </Center>
          <Center fontSize="3xl">Unknown: {props.location.pathname}</Center>
          <Center fontSize="3xl">or Under construction</Center>
        </VStack>
      </Center>
    </Flex>
  );
};
const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
});

export default connect(mapStateToProps)(UnderConstruction);
