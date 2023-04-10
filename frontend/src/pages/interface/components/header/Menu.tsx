import useAuth from "@/contexts/AuthContext";
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function Menu() {

  const { logOut, user } = useAuth()
  
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
          {
            user?.isAdmin && 
            <Link href="/admin">
              <MenuItem
                bg="#222"
                color="font.100"
                transition=".2s ease"
                _hover={{ backgroundColor: "dark.100" }}
              >
                Painel
              </MenuItem>
            </Link>
          }
          <MenuItem 
            bg="#222"
            color="red.500" 
            onClick={logOut} 
            transition=".2s ease"
            _hover={{ backgroundColor: "dark.100" }}
          >
            Sair
          </MenuItem>
        </MenuList>
      </ChakraMenu>
    </>
  )
}