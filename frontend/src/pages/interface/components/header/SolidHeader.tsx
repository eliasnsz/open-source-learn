import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Flex, Image } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import Divider from "../utils/Divider";
import Menu from "./Menu";
import Link from "next/link";

export default function SolidHeader() {

  return (
    <>
      <Box 
        h="80px" 
        bgColor="dark.100"
        boxShadow="0px 5px 12px #00000044"
      >
        <Flex 
          px={8}
          h="100%" 
          align="center" 
          justify="space-between" 
        >
          <Link href="/dashboard">
            <Image h="50px" src="../../../logo/logo-no-background.png" alt="logo"/>
          </Link>
        
          <Menu />
        </Flex>
        <Divider/>
      </Box>
    </>
  )
}