import React from "react";
import { Center, Flex, Tag } from "@chakra-ui/react";

const Help = (): JSX.Element => {
  return (
    <Flex h="100%" w="100%">
      <Center w="100%">
        <Tag>
          <Center w="120px" h="80px" fontSize="2xl">
            help page
          </Center>
        </Tag>
      </Center>
    </Flex>
  );
};

export default Help;
