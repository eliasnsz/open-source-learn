import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { Anchor, Divider, LessonCard, PageContainer, SolidHeader } from "@/pages/interface"
import { ParsedUrlQuery } from "querystring"
import { parseCookies } from "nookies"
import { getApi } from "@/services/getApi"
import { Course } from "@/types"
import { User } from "@/contexts/AuthContext"
import Link from "next/link"

interface Props {
  user: User,
  course: Course
}

export default function CoursePage({ course }: Props) {

  const lessons = course.lessons

  return (
    <PageContainer title={course.title}>
      <SolidHeader/>
      
      <Container my={2} maxW="3xl">
        <Heading 
          mb={2} 
          textAlign="center" 
          color="primary.white"
        >
          { course.title }
        </Heading>
        <Divider/>
        <Stack mt={6} spacing={4}>
          {
            lessons.length > 0 ?
            
            lessons.map((lesson, index) => {
              return <LessonCard key={index} lesson={lesson}/>
            })

            :

            <Stack mt={16} spacing={4} textAlign="center">
              <Text color="font.100">
                Nenhuma aula disponível
              </Text>
              <Anchor href={"/dashboard"}>
                Voltar
              </Anchor>
            </Stack>
          }
        </Stack>
      </Container>
    </PageContainer>
  )
}

interface ParamsProps extends ParsedUrlQuery {
  uuid: string
} 

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

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

  const { uuid } = context.params as ParamsProps

  try {
    const userResponse = await api.get("/user")
    const courseResponse = await api.get<Course>(`/courses/${uuid}`)
    const { user }: { user: User }  = userResponse.data
    
    return {
      props: {
        user,
        course: courseResponse.data
      },
    }

  } catch (error) {
    
    return {
      redirect: {
        destination: "/404",
        permanent: false  
      },
    }
  }
}