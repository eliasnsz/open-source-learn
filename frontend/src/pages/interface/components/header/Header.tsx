import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Flex, Image } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import Divider from "../utils/Divider";
import Menu from "./Menu";
import Link from "next/link";
import useAuth, { User } from "@/contexts/AuthContext";

export default function Header() {

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("transparent") 

  useEffect(() => {
    function handleScroll() {
      if(window.scrollY > 100) {
        setHeaderBackgroundColor("dark.100")
      } else {
        setHeaderBackgroundColor("transparent")
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
    <Box 
      h="80px" 
      w="100%"
      id="header"
      pos="fixed"
      zIndex={100}
      transition=".3s ease"
      bgColor={headerBackgroundColor}
      boxShadow={headerBackgroundColor !== "transparent" ? "0px 5px 12px #00000044" : "none"}
    >
      <Flex 
        px={8}
        h="100%" 
        align="center" 
        justify="space-between" 
      >
        <Link href="/dashboard">
          <Image h="50px" src="../logo/logo-no-background.png" alt="logo"/>
        </Link>
        
        <Menu />
      </Flex>
      {
        headerBackgroundColor !== "transparent" &&
        <Divider/>
      }
    </Box>
  )
}