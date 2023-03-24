import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import Divider from "../utils/Divider";
import Menu from "./Menu";

export default function SolidHeader() {

  return (
    <>
      <Box 
        h="80px" 
        w="100%"
        pos="fixed"
        bgColor="#490901"
        boxShadow="0px 5px 12px #00000044"
      >
        <Flex 
          px={8}
          h="100%" 
          align="center" 
          justify="space-between" 
        >
          <Box color="#fff" fontSize="xl">Logo</Box>
          <Menu />
        </Flex>
        <Divider/>
      </Box>
    </>
  )
}