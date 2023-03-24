import { Box, Button, Center, Container, Stack, useToast } from "@chakra-ui/react";
import { PasswordInput, SubmitButton, TextInput} from "../../index"
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import useAuth from "@/contexts/AuthContext";
import { useState } from "react";

export default function RegisterSection() {

  const toast = useToast() 
  const { register } = useAuth()
  const [isSending, setIsSending] = useState(false)

  async function handleRegister(event: any) {
    event.preventDefault();
    setIsSending(true);
    
    const name = event.target.name.value as string
    const email = event.target.email.value as string
    const password = event.target.password.value as string

    const { error } = await register({ email, password, name })

    if (error) toast({
      title: "Erro",
      status: "error",
      description: error,
      isClosable: true
    })

    setIsSending(false);
  }

  return (
    <>
      <form onSubmit={handleRegister}>
        <Stack maxW="lg" spacing={6}>
          <TextInput placeholder="Nome" type="name" name="name" icon={AiOutlineUser}/>
          <TextInput placeholder="E-mail" type="email" name="email" icon={AiOutlineMail}/>
          <PasswordInput name="password"/>
        </Stack>
        <Center pt={8} w="100%">
          <SubmitButton isSending={isSending}>
            CADASTRAR 
          </SubmitButton>
        </Center>
      </form>
    </>
  )
}


