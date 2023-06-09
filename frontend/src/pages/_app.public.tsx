import { AuthProvider } from '@/contexts/AuthContext'
import ChakraContext from '@/styles/ChakraContext'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraContext>
        <Component {...pageProps} />
      </ChakraContext>
    </AuthProvider>
  )
}
