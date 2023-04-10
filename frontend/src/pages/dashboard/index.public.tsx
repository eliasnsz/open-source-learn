import { GetServerSideProps } from 'next'
import { parseCookies } from "nookies"
import { Box, Button, Center, Flex, Heading, Image, Stack } from '@chakra-ui/react'
import { getApi } from '@/services/getApi'
import { Header, PageContainer, Wrapper } from '../interface'
import { Course } from '@/types'
import { User } from '@/contexts/AuthContext'

import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  user: User
  courses: Course[]
}

export default function Home({ user, courses }: Props) {

  const [lastLessonUrl, setLastLessonUrl] = useState<string | null>("")

  useEffect(() => {
    const lastLessonUrl = window.localStorage.getItem("lastLessonUrl")
    setLastLessonUrl(lastLessonUrl)
  }, [])

  return (
    <>
      <PageContainer title='Dashboard'>
        <Header/>
        <Flex pos="relative">
          <Box
            w="100%"
            h="100vh"
            bgPos="center"
            bgSize="cover"
            bgImage="url('main-wallpaper.png')"
          >
            <Center
              h="80%"
              px={12}
              w="100%"
              >
              <Stack
                zIndex={1}
                spacing={8}
                justify="center"
                align="center"
              >
                <Stack>
                  <Image
                    alt="logo"
                    w={["200px", "400px"]}
                    src="/logo/logo-only-letters.png"
                  />
                  <Heading
                    color="#fff"
                    fontWeight="500"
                    w={["200px", "400px"]}
                    fontSize={["xs", "xl"]}
                    textAlign={["center", "left"]}
                  >
                    O melhor lugar para aprender a programar
                  </Heading>
                </Stack>
                  {
                    lastLessonUrl ?
                      <Link href={lastLessonUrl}>
                        <Button
                          mt={8}
                          w="100%"
                          py={[3, 6]}
                          colorScheme="purple"
                          fontSize={["xs", "md"]}
                        >
                          CONTINUAR ASSISTINDO
                        </Button>
                      </Link>
                    :
                      <Link href="#start">
                        <Button
                          mt={8}
                          w="100%"
                          py={[3, 6]}
                          colorScheme="purple"
                          fontSize={["xs", "md"]}
                        >
                          COMEÇAR AGORA!
                        </Button>
                      </Link>
                  }
              </Stack>
            </Center>
          </Box>
          <Box
            w="100%"
            h="100%"
            pos="absolute"
            bgImage="linear-gradient(to bottom, transparent, #141414  )"
          />
        </Flex>
        <Box
          pb={12}
          h="100%"
          w="100%"
          bg="dark.50"
        >
          <Heading
            p={2}
            id='start'
            ml={[2, 6, 8]}
            color="font.200"
            fontSize="1.2em"
            fontWeight="500"
          >
            Comece por aqui
          </Heading>
          <Wrapper courses={courses}/>
        </Box>
      </PageContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { ["session"]: token } = parseCookies(context)
  const api = getApi(context)

  if (!token) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      },
    }
  }

  const userResponse = await api.get("/user")
  const dataResponse = await api.get<Course>("/courses")
  const { user }: { user: User }  = userResponse.data
  
  return {
    props: {
      user,
      courses: dataResponse.data
    },
  }
}