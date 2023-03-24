import { FormLabel, Icon, Input as ChakraInput, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { AiOutlineLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Ref, useState } from "react";

interface IProps {
  name: string;
}

export default function PasswordInput({ name }: IProps) {

  const [passIsVisible, setPassIsVisible] = useState(false)
  
  return (
    <FormLabel 
      w="100%"
      fontWeight={400}
      color="brown.100"
    >
      <Stack 
        spacing={3} 
        align="center"
        direction="row" 
      >
        <InputGroup>
          <InputLeftElement>
            <Icon 
              mt={2}
              px="2px" 
              boxSize={7} 
              as={AiOutlineLock} 
              color="primary.gray" 
            />
          </InputLeftElement>
          <ChakraInput
            px={4}
            py={6}
            w="100%"
            name={name}
            bg="dark.50"
            color="font.100"
            borderRadius={10}
            placeholder="Senha"
            borderColor="dark.200"
            focusBorderColor="primary.purple"
            _hover={{ borderColor: "dark.300" }}
            type={passIsVisible ? "text" : "password"}
            _placeholder={{ color: "font.300", fontSize: "sm" }}
          />
          <InputRightElement>
            <Icon 
              mt={3}
              boxSize={5} 
              cursor="pointer"
              color="dark.300"
              transition=".2s ease"
              _hover={{ color: "dark.200" }}
              onClick={() => setPassIsVisible(state => !state)}
              as={passIsVisible ? AiFillEyeInvisible : AiFillEye} 
            />
          </InputRightElement>
        </InputGroup>
      </Stack>
    </FormLabel>
  )
}
