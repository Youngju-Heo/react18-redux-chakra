import React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { CounterState, countDecrement, countIncrement } from "../store/counter/counter-slice";
import { Badge, Center, HStack, IconButton, VStack } from "@chakra-ui/react";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";

interface CounterProps {
  counter: CounterState;
  countIncrement: () => void;
  countDecrement: () => void;
}
const Counter = (props: CounterProps): JSX.Element => {
  return (
    <VStack m={4}>
      <Badge>
        <Center w="80px" h="30px" fontSize="20px">
          {props.counter.value}
        </Center>
      </Badge>
      <HStack>
        <IconButton aria-label="increment" icon={<MdAddBox />} fontSize="40px" onClick={props.countIncrement} />
        <IconButton
          aria-label="decrement"
          icon={<MdIndeterminateCheckBox />}
          fontSize="40px"
          onClick={props.countDecrement}
        />
      </HStack>
    </VStack>
  );
};

const mapStateToProps = (state: RootState) => ({
  counter: state.counter,
});
export default connect(mapStateToProps, { countIncrement, countDecrement })(Counter);
