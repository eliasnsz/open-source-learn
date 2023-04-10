import { Box, Heading } from "@chakra-ui/react"
import Link from "next/link"

interface Props {
  title: string,
  thumbnail: string
  href: string
}

export default function CourseCard({ title, thumbnail, href }: Props) {
  return (
    <Link href={href}>
      <Box
        bgSize="cover"
        cursor="pointer"
        borderRadius="lg"
        transition=".2s ease"
        bgImage={`url('${thumbnail}')`}
        minW={["150px", "200px", "300px"]}
        minH={["200px", "250px", "400px"]}
        boxShadow="0px 0px 8px 3px #77777722"
        _hover={{ boxShadow: "0px 0px 10px 2px #ff00ffbb" }}
      >
      
      </Box>
    </Link>
  )
}