import { Box, Center, Container, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import LoginSection from "./LoginSection";
import RegisterSection from "./RegisterSection";

export default function AuthPanel() {

  const [sectionSelected, setSection] = useState<"login" | "register">("login")

  return (
    <Center 
      py={[3, 3, 0]} 
      h={["fit-content", "fit-content", "100%"]}
    >
      <Flex 
        h="55%" 
        w="100%" 
        justify="center" 
        align="flex-start"
      >
        <Container 
          mx={6}
          maxW="lg"  
        >
          <Image 
            h={["55px", "90px"]} 
            m="auto" 
            alt="logo"
            src="logo/logo-no-background.png" 
          />
          <Flex
            mb={8}
            borderBottom="1px solid"
            borderBottomColor="dark.300"
          >
            <Box w="100%" h="100%" onClick={() => setSection("login")}>
              <NavBar isSelected={sectionSelected === "login"}>
                Fazer login
              </NavBar>
            </Box>
            <Box w="100%" h="100%" onClick={() => setSection("register")}>
              <NavBar isSelected={sectionSelected === "register"}>
                Criar Conta
              </NavBar>
            </Box>
          </Flex>
          <Box>
            {
              sectionSelected === "register" && <RegisterSection/>
            }
            {
              sectionSelected === "login" && <LoginSection/>
            }
          </Box>
        </Container>
      </Flex>
    </Center>   
  )
}

interface NavBarProps { 
  children: React.ReactNode;
  isSelected: boolean;
}

function NavBar({ children, isSelected }: NavBarProps) {
  
  return (
    <Center 
      py={6} 
      w="100%"
      fontSize="md"
      cursor="pointer"
      fontWeight={500}  
      transition=".2s ease"
      borderBottom="2px solid transparent"
      color={isSelected ? 'primary.purple' : 'font.100'}
      borderBottomColor={isSelected ? 'primary.purple' : 'transparent'}
      _hover={{ borderBottomColor: "primary.purple", color: "primary.purple"}}
    >
      { children }
    </Center>
  )
}