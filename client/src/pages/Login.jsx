import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginRequest, loginSuccess } from "../redux/auth/action";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { notify } from "../utils/extraFunction";

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const toast = useToast();
  // console.log(location);
  const comingFrom = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginRequest());
    axios
      .post(`/login`, user)
      .then((res) => {
        // console.log(res.data);
        if (res.data.token) {
          let payload = res.data;
          dispatch(loginSuccess(payload));
          notify(toast, res.data.message, "success");
          navigate(comingFrom, { replace: true });
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        notify(toast, err.response.data.message, "error");
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <form action="" onSubmit={handleLogin}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl className="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text as="span" color={"blue.400"}>
                    Forgot password?
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default Login;
