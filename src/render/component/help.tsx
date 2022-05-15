import React from "react";
import { Center, Tag } from "@chakra-ui/react";

const Help = (): JSX.Element => {
  return (
    <Center m={4}>
      <Tag>
        <Center w="120px" h="40px" my={4} fontSize="20px">
          help page
        </Center>
      </Tag>
    </Center>
  );
};

export default Help;
