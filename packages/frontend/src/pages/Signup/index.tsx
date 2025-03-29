import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../../components/GoogleSignInButton";

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleInputChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [type]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!state.name || !state.email || !state.password) {
      setError({
        name: !state.name,
        email: !state.email,
        password: !state.password,
      });

      setIsLoading(false);
      return;
    }

    try {
      const data = await signup(state.name, state.email, state.password);

      if (data.success === true) {
        onOpen();
        startProgress();
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const { name, email, password } = state;

  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 27);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const startProgress = () => {
    setProgress(0);
    setIsRunning(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        onClose();
        navigate("/login");
      }, 3100);
    }

    return () => clearTimeout(timeout);
  }, [isOpen, navigate, onClose]);

  const close = () => {
    onClose();
    navigate("/login");
  };

  const successModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <Alert status="success">
            <AlertIcon />
            <Box>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your account has been created. You will be redirect to the login
                page.
              </AlertDescription>
              <Progress value={progress} size="md" colorScheme="green" />
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={close}
            />
          </Alert>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Container>
      <Flex alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Stack minWidth={"620"}>
          <Heading textAlign="center" size="lg">
            Sign Up
          </Heading>
          <Text textAlign="center" fontSize="md" color="alphaWhite.400">
            Create a new account
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack>
              <FormControl isInvalid={error.name} marginBottom={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={handleInputChange("name")}
                  placeholder="Enter your name"
                />
                {error.name && (
                  <FormHelperText color="error.400">
                    Name is required.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={error.email} marginBottom={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleInputChange("email")}
                  placeholder="Enter your email"
                />
                {error.email && (
                  <FormHelperText color="error.400">
                    Email is required.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={error.password} marginBottom={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handleInputChange("password")}
                  placeholder="Enter your password"
                />
                {error.password && (
                  <FormHelperText color="error.400">
                    Password is required.
                  </FormHelperText>
                )}
              </FormControl>
              <Text textAlign={"center"}>
                Already have an account?{" "}
                <Text
                  as="span"
                  color="primary.500"
                  cursor="pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Text>
              </Text>
              <Button
                my={4}
                colorScheme="primary"
                isLoading={isLoading}
                type="submit"
              >
                Submit
              </Button>{" "}
              <Flex alignItems="center" gap={4}>
                <Divider />
                <Text>or</Text>
                <Divider />
              </Flex>
              <GoogleSignInButton />
            </Stack>
          </form>
        </Stack>
      </Flex>
      {successModal()}
    </Container>
  );
}

export default Signup;
