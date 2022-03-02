import { Box, Button, ChakraProvider, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const COUNTDOWN_INIT_TIME_IN_SECONDS = 10;

function App(): JSX.Element {
  const [secondsAmount, setSecondsAmount] = useState(
    COUNTDOWN_INIT_TIME_IN_SECONDS
  );

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (secondsAmount > 0 && isRunning) {
      timer = setTimeout(() => {
        setSecondsAmount((state) => state - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isRunning, secondsAmount]);

  const toggleState = (): void => {
    setIsRunning(!isRunning);
  };

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;
  return (
    <ChakraProvider>
      <Box>
        <Box
          bg="gray.600"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box color="white" display="flex" mb="20px">
            <Heading size="4xl">{minutes.toString().padStart(2, "0")}</Heading>
            <Heading size="4xl">:</Heading>
            <Heading size="4xl">{seconds.toString().padStart(2, "0")}</Heading>
          </Box>
          <Button
            colorScheme="whatsapp"
            w="100px"
            onClick={() => {
              setSecondsAmount(COUNTDOWN_INIT_TIME_IN_SECONDS);
              toggleState();
            }}
          >
            Iniciar
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export { App };
