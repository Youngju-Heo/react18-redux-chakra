import React from "react";
import { RootState } from "../store";
import { connect } from "react-redux";
import { CounterState, countDecrement, countIncrement, countIncrementByAmount } from "../store/counter/counter-slice";
import { Badge, Center, HStack, IconButton, VStack } from "@chakra-ui/react";
import { MdAddCircleOutline, MdOutlineLooksTwo, MdRemoveCircleOutline } from "react-icons/md";

interface CounterProps {
  counter: CounterState;
  countIncrement: () => void;
  countDecrement: () => void;
  countIncrementByAmount: (amount: number) => void;
}
const Counter = (props: CounterProps): JSX.Element => {
  return (
    <VStack m={4}>
      <Badge>
        <Center w="130px" h="30px" fontSize="20px">
          {props.counter.value}
        </Center>
      </Badge>
      <HStack>
        <IconButton
          aria-label="increment"
          icon={<MdAddCircleOutline />}
          fontSize="40px"
          onClick={props.countIncrement}
        />
        <IconButton
          aria-label="decrement"
          icon={<MdRemoveCircleOutline />}
          fontSize="40px"
          onClick={props.countDecrement}
        />
        <IconButton
          aria-label="add-two"
          icon={<MdOutlineLooksTwo />}
          fontSize="40px"
          onClick={() => props.countIncrementByAmount(2)}
        />
      </HStack>
    </VStack>
  );
};

const mapStateToProps = (state: RootState) => ({
  counter: state.counter,
});
export default connect(mapStateToProps, { countIncrement, countDecrement, countIncrementByAmount })(Counter);
