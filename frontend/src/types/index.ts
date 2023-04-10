export interface Course {
  id: string,
  thumbnail_url: string,
  title: string,
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string 
  description: string
  duration_in_seconds: number
  video_url: string
  courseId: string
  isChecked: boolean
}