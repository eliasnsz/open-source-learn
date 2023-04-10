import { Course } from "@/types";
import { useState } from "react";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai" 

import CourseCard from "./CourseCard";

interface Props {
  courses: Course[]
}

export default function Wrapper({ courses }: Props) {

  const [wrapLevel, setWrapLevel] = useState(0)

  function decrementWrapLevel() {
    if (wrapLevel > 0) {
      setWrapLevel(level => level - 1)
    }
  }

  function incrementWrapLevel() {
    if (wrapLevel < courses.length - 1) {
      setWrapLevel(level => level + 1)
    }
  }

  return (
    <>
      <Box pos="relative">
        <Button
          w="40px"
          h="40px"
          top="45%"
          zIndex={1}
          left={[2, 5]}
          pos="absolute"
          borderRadius="50%"
          colorScheme="purple"
          onClick={decrementWrapLevel}
          boxShadow="0px 2px 8px #00000055"
        >
          <Icon as={AiOutlineCaretLeft}/>
        </Button>
        <Button
          w="40px"
          h="40px"
          top="45%"
          zIndex={1}
          right={[2, 5]}
          pos="absolute"
          borderRadius="50%"
          colorScheme="purple"
          onClick={incrementWrapLevel}
          boxShadow="0px 2px 8px #00000055"
        >
          <Icon as={AiOutlineCaretRight}/>
        </Button>
        <Flex
          p={2}
          gap={4}
          ml={[2, 6, 8]}
          w="fit-content"
          overflowX="scroll"
          transition=".3s ease"
          transform={[
            `translateX(-${166 * wrapLevel }px)`,
            `translateX(-${316 * wrapLevel }px)`
          ]}
          sx={{ "&::-webkit-scrollbar": { display: "none" }}}
        >
          {
            courses.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  title={course.title}
                  thumbnail={course.thumbnail_url}
                  href={`/course/${course.id}`}
                />
              )
            })
          }
        </Flex>
      </Box>
    </>
  )
}