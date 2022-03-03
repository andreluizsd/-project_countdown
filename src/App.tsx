import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_INIT_TIME_IN_SECONDS = 0;

function App(): JSX.Element {
  const [secondsAmount, setSecondsAmount] = useState(
    COUNTDOWN_INIT_TIME_IN_SECONDS
  );

  const [isRunning, setIsRunning] = useState(false);
  const [minutesEntryInput, setMinutesEntryInput] = useState(0);
  const [secondsEntryInput, setSecondsEntryInput] = useState(0);

  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const secondsAux = minutesEntryInput * 60 + secondsEntryInput;
    setSecondsAmount(secondsAux);
  }, [minutesEntryInput, secondsEntryInput]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (secondsAmount > 0 && isRunning) {
      timer = setTimeout(() => {
        setSecondsAmount((state) => state - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isRunning, secondsAmount]);

  const handleInitTimer = (): void => {
    setIsRunning(true);
  };

  const handleStopTimer = (): void => {
    setIsRunning(false);
  };

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  function handleClearInput(): void {
    if (minutesInputRef.current && secondsInputRef.current) {
      minutesInputRef.current.value = "";
      secondsInputRef.current.value = "";
    }
  }
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
          <HStack mb="10rem" w="30%" gap={4} color="white">
            <Flex alignItems="center">
              Minutes:
              <Input
                ref={minutesInputRef}
                size="sm"
                borderRadius="0.25rem"
                borderColor="aqua"
                onChange={(event) => {
                  setMinutesEntryInput(Number(event.target.value));
                }}
              />
            </Flex>
            <Flex alignItems="center">
              Seconds:
              <Input
                ref={secondsInputRef}
                size="sm"
                borderRadius="0.25rem"
                borderColor="aqua"
                onChange={(event) => {
                  setSecondsEntryInput(Number(event.target.value));
                }}
              />
            </Flex>
          </HStack>

          <Box color="white" display="flex" mb="20px">
            <Heading size="4xl">{minutes.toString().padStart(2, "0")}</Heading>
            <Heading size="4xl">:</Heading>
            <Heading size="4xl">{seconds.toString().padStart(2, "0")}</Heading>
          </Box>
          <Flex mt={16}>
            <Button
              colorScheme="whatsapp"
              w="100px"
              onClick={() => {
                handleInitTimer();
                handleClearInput();
              }}
              mr={4}
            >
              Start
            </Button>

            <Button colorScheme="red" onClick={handleStopTimer}>
              Stop
            </Button>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export { App };
