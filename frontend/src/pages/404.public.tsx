import { Anchor, PageContainer, SolidHeader } from "./interface";
import { Center, Heading, Image } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <PageContainer title="404 - Página não encontrada">
      <SolidHeader/>
        <Center 
          gap={4}
          h="70vh" 
          color="#fff"
          display="flex" 
          flexDirection="column"
        >
          <Heading fontSize="1.7em">Página não encontrada</Heading>
          <Image 
            h="120px"
            alt="404-logo" 
            src="/404-gif.gif"
            blendMode="screen"
          />
          <Anchor href="/dashboard">
            Voltar ao início
          </Anchor>
        </Center>
    </PageContainer>
  )
}