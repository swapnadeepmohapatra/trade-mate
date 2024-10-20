import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

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
        message: "dsa",
      });

      setIsLoading(false);
      return;
    }

    try {
      const data = await login(state.email, state.password);

      if (data.success === true) {
        navigate("/home");
      } else {
        setError({
          email: false,
          password: false,
          message: data.response.data.error,
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
    <Container>
      <Flex alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Stack minWidth={"620"}>
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
              <Button
                mt={4}
                colorScheme="primary"
                isLoading={isLoading}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Container>
  );
}

export default Login;
