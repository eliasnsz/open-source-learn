import { Flex, Heading, Center, IconButton, Box, Text } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { Lesson } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  lesson: Lesson
}

export default function LessonCard({ lesson }: Props) {
  
    const { uuid: courseUuid } = useRouter().query
  
    return (
      <Link href={`/course/${courseUuid}/lesson/${lesson.id}`}>
        <Flex
          p={4}
          gap={4}
          w="100%"
          h="100%"
          minH="100px"
          cursor="pointer"
          borderRadius="lg"
          border="1px solid"
          borderColor="dark.200"
          direction={["column", "row"]}
          bgImage="linear-gradient(to right, #1a1a1a 60%, #151515 90%)"
          _hover={{
            borderColor: "primary.purple",
            bgImage: "linear-gradient(to right, #222222 60%, #191919 90%)"
          }}
        >
          <Box
            w="100%"
            color="primary.white"
          >
            <Heading
              mb={1}
              fontSize="xl"
            >
              { lesson.title }
            </Heading>
            <Text
              fontSize="sm"
              noOfLines={2}
              color="font.200"
            >
              { lesson.description }
            </Text>
          </Box>
          <Center w={["100%", "10%"]}>
            <IconButton
              size="md"
              borderRadius={50}
              colorScheme="purple"
              aria-label="play-button"
              icon={<FaPlay fontSize={"0.9rem"}/>}
              w={["100%", "fit-content"]}
            />
          </Center>
        </Flex >
      </Link>
    )
}