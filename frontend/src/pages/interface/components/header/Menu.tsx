import useAuth from "@/contexts/AuthContext";
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

export default function Menu() {

  const { logOut } = useAuth()
  
  return (
    <>
      <ChakraMenu>
        <MenuButton 
          as={IconButton} 
          borderRadius={50}
          colorScheme="purple"
          icon={<AiOutlineUser fontSize="1.2rem"/>}
        />
        <MenuList bg="#222" border="none">
          <MenuItem onClick={logOut} color="red.500" bg="#222">Sair</MenuItem>
        </MenuList>
      </ChakraMenu>
    </>
  )
}