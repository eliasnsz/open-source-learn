import { Lesson } from "@/types";
import { Box } from "@chakra-ui/react";

interface Props {
  lesson: Lesson
}

export default function VideoContainer({ lesson }: Props) {
  return (
    <Box w="100%">
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe 
            style={{ border: "none", position: "absolute", top: 0, height: "100%", width: "100%" }}
            width="560" 
            height="315" 
            src={lesson.video_url} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          >
        </iframe>
      </div>
    </Box>
  )
}