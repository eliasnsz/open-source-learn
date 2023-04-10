import { Link as ChakraLink, ThemeComponents, ThemingProps } from "@chakra-ui/react"
import Link from "next/link"

interface Props {
  href: string
  children: React.ReactNode
  color?: string
}

export default function Anchor({ href, children, color }: Props) {
  return (
    <ChakraLink href={href} color={color ? color : "purple.300"}>
      { children }
    </ChakraLink>
  )
}