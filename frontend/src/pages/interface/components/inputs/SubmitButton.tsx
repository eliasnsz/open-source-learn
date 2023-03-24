import { Button } from "@chakra-ui/react";

interface Props { 
  children: React.ReactNode
  isSending: boolean 
}

export default function SubmitButton({ isSending, children }: Props) {
  return (
    <Button
      py={6}
      w="100%"
      type="submit"
      colorScheme="purple"
      letterSpacing="wider"
      isLoading={isSending}
    >
      {children}
    </Button>
  )
}