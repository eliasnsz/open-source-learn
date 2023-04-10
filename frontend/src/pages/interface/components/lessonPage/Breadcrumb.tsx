import { Course, Lesson } from "@/types";
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { GoChevronRight } from "react-icons/go";

interface Props {
  lesson: Lesson;
  course: Course;
}

export default function Breadcrumb({ course, lesson }: Props) {
  return (
    <ChakraBreadcrumb 
      fontSize={["xs", "md"]}
      spacing='8px' 
      color="font.200"
      separator={<GoChevronRight color='font.100' />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href='/dashboard'>
          Início
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/course/${course.id}`}>
          {course.title}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>
          {lesson.title}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  )
}