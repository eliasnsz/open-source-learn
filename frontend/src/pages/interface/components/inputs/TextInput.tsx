import { FormLabel, Icon, Input as ChakraInput, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { HTMLInputTypeAttribute, Ref } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
}

export default function TextInput({ icon, type, name, placeholder }: Props) {
  return (
    <FormLabel 
      m={0}
      w="100%"
      fontWeight={400}
      color="primary.white"
    >
      <Stack 
        spacing={3} 
        align="center"
        direction="row" 
      >
        
        <InputGroup>
          <InputLeftElement>
            <Icon 
              mt={3}
              px="3px" 
              as={icon} 
              boxSize={7} 
              color="primary.gray" 
            />
          </InputLeftElement>
          <ChakraInput
            px={4}
            py={6}
            w="100%"
            name={name}
            type={type}
            bg="dark.50"
            color="font.100"
            borderRadius={10}
            borderColor="dark.200"
            placeholder={placeholder}
            focusBorderColor="primary.purple"
            _hover={{ borderColor: "dark.300" }}
            _placeholder={{ color: "font.300", fontSize: "sm" }}
          />
        </InputGroup>
      </Stack>
    </FormLabel>
  )
}
