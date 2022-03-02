import { Box, ChakraProvider } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <ChakraProvider>
      <Box bg="gray.100" height="100vh">
        oi
      </Box>
    </ChakraProvider>
  );
}

export { App };
