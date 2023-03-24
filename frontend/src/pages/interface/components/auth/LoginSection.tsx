import { Box, Button, Center, Checkbox, Flex, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { PasswordInput, SubmitButton, TextInput} from "../../index"
import { AiOutlineMail } from "react-icons/ai"

import useAuth from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function LoginSection() {

  const toast = useToast() 
  const { signIn } = useAuth()
  const [isSending, setIsSending] = useState(false)

  
  async function handleLogin(event: any) {
    event.preventDefault();
    setIsSending(true);
    
    const email = event.target.email.value as string
    const password = event.target.password.value as string
    const rememberMe = event.target["remember-me"].checked as boolean
    
    const { error } = await signIn({ email, password, rememberMe })
    
    if (error) toast({
      title: "Erro",
      status: "error",
      description: error,
      isClosable: true
    })
    
    setIsSending(false);
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={6} my={6}>
        <TextInput placeholder="E-mail" name="email" type="email" icon={AiOutlineMail}/>
        <PasswordInput name="password" />
        <RememberMeCheckbox name="remember-me"/>
      </Stack>
      <SubmitButton isSending={isSending}>
        ENTRAR
      </SubmitButton>
    </form>
  )
}

interface InputProps {
  name: string;
}

function RememberMeCheckbox({ name }: InputProps) {
  return (
    <FormLabel>
      <Flex align="center" justify="center" gap={3}>
        <Checkbox colorScheme='purple' name={name} borderColor="primary.gray" />
        <Text color="font.200">Lembrar de mim</Text>
      </Flex>
    </FormLabel>
  )
}
