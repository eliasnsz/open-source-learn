import { Box } from "@chakra-ui/react"
import Head from "next/head"
import Footer from "../footer/Footer"

interface Props {
  title: string
  children: React.ReactNode
}

export default function PageContainer({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title + " | OSL"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../../../logo/favicon.ico" />
      </Head>
      <Box minH="calc(100vh - 80px)" bg="dark.50">
        { children }
      </Box>
      <Footer/>
    </>
  )
}