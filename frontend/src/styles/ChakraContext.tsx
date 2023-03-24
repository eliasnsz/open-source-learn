import { ChakraBaseProvider , extendTheme } from "@chakra-ui/react"

import "@fontsource/roboto"
import "@fontsource/roboto/700.css"

interface Props {
  children: React.ReactNode
}

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        overflowX: "hidden",
        fontFamily: "Roboto, sans-serif"
      }
    },
  },
  colors: {
    primary: {
      "gray": '#898989',
      "white": '#e5e5e5',
      "purple": '#bf00ff',
    },
    dark: {
      50: "#141414",
      100: "#1f1f1f",
      200: "#343434",
      300: "#404040",
    },
    font: {
      100: "#ffffffbb",
      200: "#ffffff96", 
      300: "#ffffff67",
    }
  },
})

export default function ChakraContext({ children}: Props) {
  return (  
    <ChakraBaseProvider theme={theme}>
      { children }
    </ChakraBaseProvider>
  )
}