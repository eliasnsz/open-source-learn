export interface UserProps {
  id?: string
  name: string,
  email: string,
  password: string,
}

export interface CourseProps {
  id?: string
  title: string,
  thumbnail_url: string,
  lessons?: LessonProps[],
}

export interface LessonProps {
  id?: string
  title: string
  description: string
  duration_in_seconds: number
  video_url: string
  course: CourseProps
  courseId: string
  isChecked: boolean
}
