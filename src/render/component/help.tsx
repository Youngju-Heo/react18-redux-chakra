import React from "react";
import { VStack, Center, Tag } from "@chakra-ui/react";

const Help = (): JSX.Element => {
  return (
    <VStack w="100%">
      <Center w="100%" m={4}>
        <Tag>
          <Center w="120px" h="80px" fontSize="2xl">
            help page
          </Center>
        </Tag>
      </Center>
    </VStack>
  );
};

export default Help;
