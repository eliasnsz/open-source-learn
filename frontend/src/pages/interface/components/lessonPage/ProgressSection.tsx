import { Box, Center, CircularProgress, CircularProgressLabel, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { TbPointFilled, TbPoint } from "react-icons/tb"
import { CgCheck } from "react-icons/cg"
import { Lesson, Course } from "@/types";
import Link from "next/link";

interface Props {
  lesson: Lesson;
  course: Course;
}

export default function ProgressSection({ course, lesson }: Props) {

  const thisLesson = course.lessons.find(({ id }) => lesson.id === id)
  
  const completedLessons = course.lessons.filter(lesson => lesson.isChecked)
  const totalLessons = course.lessons.length
  
  const percentCompleted = Number((((completedLessons.length) / (course.lessons.length)) * 100).toFixed())

  return (
    <Box 
      mt={[0, 3]} 
      pl={6}
      borderLeft="1px dotted"
      borderColor="dark.300"
      w={["100%", "100%", "100%", "40%"]} 
    >
      <Stack 
        spacing={3.5}
        align="start" 
        direction="row" 
      >
        <CircularProgress 
          value={percentCompleted} 
          size="40px" 
          trackColor="dark.300" 
          color='primary.purple'
        >
          <CircularProgressLabel 
            fontWeight={600} 
            fontSize={"0.75rem"} 
            color="primary.purple"
          >
            {percentCompleted }%
          </CircularProgressLabel>
        </CircularProgress>
        <Stack 
          spacing={0}
          justify="center" 
        >
          <Heading 
            fontSize="lg"
            color="font.100" 
          >
            Meu progresso
          </Heading>
          <Text 
            fontSize="xs" 
            color="font.200"
          >
            {completedLessons.length} aulas de {totalLessons}
          </Text>
        </Stack>
      </Stack>
      <Stack 
        px={2} 
        my={4} 
        spacing={0}
      >
        {
          course.lessons.map((lesson, index) => {
            return (
              <Link key={index} href={`/course/${course.id}/lesson/${lesson.id}`}>
                <Flex
                  gap={5}
                  h="35px"
                  role="group"
                  cursor="pointer"
                  align="flex-start"
                  transition=".2s ease"
                  _hover={{ color: "primary.purple" }}
                  color={
                    (
                      (lesson.id === thisLesson?.id) ? "primary.purple" :
                      lesson.isChecked ? "green.500" : "font.200"
                    )
                  }
                >
                  <Icon boxSize={6} as={
                    (
                      (
                        lesson.id === thisLesson?.id) ? TbPointFilled :
                        lesson.isChecked ? CgCheck : TbPoint
                      )
                  } />
                  <Text>
                    {index + 1}. {lesson.title}
                  </Text>
                </Flex>
              </Link>
            )
          })
        }
      </Stack>
    </Box>
  )
}