import { Box, Center, Grid, Text } from "@chakra-ui/react"
import Divider from "../utils/Divider"

export default function Footer() {
  return (
    <Grid 
      h="80px" 
      bg="dark.50"
      fontSize="sm"
      color="font.300"
      textAlign="center"
    >
      <Divider/>
      <Text>
        Copyright © 2023 - Open Source Learning. Todos os direitos reservados.
      </Text>
    </Grid>
  )
}