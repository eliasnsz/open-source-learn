import { ChakraBaseProvider , extendTheme } from "@chakra-ui/react"

import "@fontsource/roboto"
import "@fontsource/roboto/700.css"

interface Props {
  children: React.ReactNode
}

const theme = extendTheme({
  styles: {
    global: {
      'html::-webkit-scrollbar': {
        width: "8px"
      },
      'html::-webkit-scrollbar-track': {
        background: '#141414',
      },
      'html::-webkit-scrollbar-thumb': {
        backgroundColor: "#bf00ff77",
        borderRadius: "20px",
      },
      'body': {
        overflowX: "hidden",
        fontFamily: "Roboto, sans-serif",
      },
      '*::selection': {
          color: "#e5e5e5",
          backgroundColor: "#bf00ff"
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