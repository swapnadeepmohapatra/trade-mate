import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import Navbar from "../../components/Navbar";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { loginUser } = useUserContext();

  const handleInputChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [type]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!state.email || !state.password) {
      setError({
        email: !state.email,
        password: !state.password,
        message: "Please fill in all the fields.",
      });

      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(state.email, state.password);

      if (data.success === true) {
        navigate("/home");
      } else {
        setError({
          email: false,
          password: false,
          // message: data.response.data.error,
          message: "Invalid email or password.",
        });
      }
    } catch {
      setError({
        email: false,
        password: false,
        message: "Something went wrong. Please try again later.",
      });
    }

    setIsLoading(false);
  };

  const { email, password } = state;

  return (
    <Stack>
      <Navbar />
      <Container>
        <Stack height={"calc(100vh - 6rem)"} justifyContent={"center"}>
          <Heading textAlign="center" size="lg">
            Log In
          </Heading>
          <Text textAlign="center" fontSize="md" color="alphaWhite.400">
            Log in to your account
          </Text>

          {error.message && (
            <Text color="red.500" textAlign="center" marginBottom={4}>
              {error.message}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <Stack>
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
                Don&apos;t have an account?{" "}
                <Text
                  as="span"
                  color="primary.500"
                  cursor="pointer"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </Text>
              </Text>
              <Button
                my={4}
                colorScheme="primary"
                isLoading={isLoading}
                type="submit"
              >
                Submit
              </Button>
              <Flex alignItems="center" gap={4}>
                <Divider />
                <Text>or</Text>
                <Divider />
              </Flex>
              <GoogleSignInButton />
            </Stack>
          </form>
        </Stack>
      </Container>
    </Stack>
  );
}

export default Login;
