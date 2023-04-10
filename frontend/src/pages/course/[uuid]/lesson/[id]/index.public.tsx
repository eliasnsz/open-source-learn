import { Breadcrumb, PageContainer, ProgressSection, SolidHeader, VideoContainer, VideoFooter } from "@/pages/interface";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Container, Flex, Heading, Stack } from "@chakra-ui/react";
import { ParsedUrlQuery } from "querystring";
import { Course, Lesson } from "@/types";
import { parseCookies } from "nookies";
import { getApi } from "@/services/getApi";
import { User } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
  lesson: Lesson;
  course: Course;
}

export default function LessonPage({ lesson, course }: Props) {

  const router = useRouter()
  
  useEffect(() => {
    const currentUrl = router.asPath
    function saveCurrentLessonLink() {
      localStorage.setItem("lastLessonUrl", currentUrl)
    }
    setTimeout(() => saveCurrentLessonLink() , 1000 * 3 ); //3 seconds
  }, [router.asPath])
  
  return (
    <>
      <PageContainer title={lesson.title}>
        <SolidHeader/>

        <Container 
          mt={8}  
          pb={12} 
          maxW="6xl" 
          px={[2, 10, 8,]}
        >
          <Flex 
            h="100%" 
            gap={12} 
            direction={["column", "column", "column", "row"]}
          >
            <Stack w="100%">
              <Stack 
                w="100%" 
                spacing={[4, 8]}
              >
                <Heading
                  fontSize={["xl", "2xl", "3xl"]}
                  fontWeight={400}
                  color="primary.white"
                >
                  {lesson.title}
                </Heading>
                <Breadcrumb course={course} lesson={lesson} />
              <VideoContainer lesson={lesson} />
              <VideoFooter course={course} lesson={lesson} />
              </Stack>
            </Stack>
            <ProgressSection course={course} lesson={lesson} />
          </Flex>
        </Container>
      </PageContainer>
    </>
  )
}

interface ParamsProps extends ParsedUrlQuery {
  uuid: string
  id: string
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

  const { uuid, id } = context.params as ParamsProps

  try {
    
    const userResponse = await api.get("/user")
    const lessonResponse = await api.get<Lesson>(`/courses/${uuid}/lessons/${id}`)  
    const courseResponse = await api.get<Lesson>(`/courses/${uuid}`)  
    const { user }: { user: User }  = userResponse.data
    
    return {
      props: {
        user,
        lesson: lessonResponse.data,
        course: courseResponse.data
      },
    }

  } catch (error) {
    
    return {
      notFound: true,
    }
  }
}