import React from "react";
import { Box, Center, Tag } from "@chakra-ui/react";
import { RootState } from "../store";
import { connect } from "react-redux";

interface CounterMonitorProps {
  countValue: number;
}

const CounterMonitor = (props: CounterMonitorProps): JSX.Element => {
  return (
    <Box w="100%">
      <Center w="100%">
        <Tag>
          <Center w="120px" h="80px" fontSize="14px">
            Counter Value: {props.countValue}
          </Center>
        </Tag>
      </Center>
    </Box>
  );
};

const mapStatToProps = (state: RootState) => ({
  countValue: state.counter.value,
});

export default connect(mapStatToProps)(CounterMonitor);
