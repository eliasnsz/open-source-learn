import { BsCheck2Circle, BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { Stack, Button, Icon, Box } from "@chakra-ui/react"
import { Course, Lesson } from "@/types"
import { useEffect, useState } from "react"

import Link from "next/link"
import api from "@/services/api"

interface Props {
  lesson: Lesson
  course: Course
}

export default function VideoFooter({ course, lesson }: Props) {
  
  const thisLesson = course.lessons.find(({ id }) => lesson.id === id)
  const thisLessonIndex = course.lessons.findIndex(({ id }) => lesson.id === id)
  const prevLesson = thisLessonIndex ? course.lessons[thisLessonIndex - 1] : null
  const nextLesson = course.lessons[thisLessonIndex + 1]

  useEffect(() => {
    setIsWatched(lesson.isChecked)
  }, [lesson])

  const [isWatched, setIsWatched] = useState(thisLesson?.isChecked)
  
  async function handleViewedChange() {
    try {
      await api.put(`/courses/${thisLesson?.courseId}/lessons/${thisLesson?.id}`)
      setIsWatched(state => !state)
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return(
    <>
      <Box color="font.300" pt={6} borderTop="1px dotted #ffffff33">
        {lesson.description}
      </Box>
      <Stack
        w="100%"
        align="center"
        justify="space-between"
        direction={["column", "row"]}
      >
        {
        isWatched ? 
          <Button 
            px={6}
            bg="#00ff0022"                      
            fontWeight={500}
            color="green.500"
            borderRadius={50}
            fontSize={["sm", "md"]}
            onClick={handleViewedChange}
            _hover={{ bg: "green.500", color: "green.900"}}
          >
            Marcar como visto
            <Icon ml={1} as={BsCheck2Circle}/>
          </Button>
          :
          <Button 
            px={6}
            bg="dark.100"
            fontWeight={500}
            color="font.100"
            borderRadius={50}
            fontSize={["sm", "md"]}
            _hover={{ bg: "dark.300" }}
            onClick={handleViewedChange}
          >
            Marcar como visto
            <Icon ml={1} as={BsCheck2Circle}/>
          </Button>
        }
        <Stack 
          direction="row"
          color="font.100"
        >
          <Link  href={`/course/${lesson.courseId}/lesson/${prevLesson?.id}`}>
            <Button
              px={4}
              bg="dark.100"
              w="fit-content"
              fontWeight={500}
              borderRadius={50}
              isDisabled={!prevLesson}
              _hover={{ bg: "dark.300" }}
            >
              <Icon mr={1} as={BsArrowLeftShort}/>
              Anterior
            </Button>
          </Link>
          <Button
            px={4}
            as={Link}
            bg="dark.100"
            w="fit-content"
            fontWeight={500}
            borderRadius={50}
            isDisabled={!nextLesson}
            _hover={{ bg: "dark.300" }}
            href={nextLesson ? 
              `/course/${lesson.courseId}/lesson/${nextLesson?.id}` :
              `/course/${lesson.courseId}/lesson/${thisLesson?.id}`
            }
          >
            Próximo
            <Icon ml={1} as={BsArrowRightShort}/>
          </Button>
        </Stack>
      </Stack>
    </>
  )
}