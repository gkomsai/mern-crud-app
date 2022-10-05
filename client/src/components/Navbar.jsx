import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromLocal } from "../utils/accessLocal";
import { logoutSuccess } from "../redux/auth/action";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const token = useSelector((store) => store.AuthReducer.token);
  console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    removeItemFromLocal("token");
    removeItemFromLocal("user");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Music app
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            onClick={() => {
              navigate("/albums/create");
            }}
            fontSize={"sm"}
            fontWeight={400}
            bg={"blue"}
            color={"white"}
          >
            AddAlbum
          </Button>
          {token ? (
            <Button
              onClick={handleLogout}
              fontSize={"sm"}
              fontWeight={400}
              bg={"blue"}
              color={"white"}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              fontSize={"sm"}
              fontWeight={400}
              bg={"blue"}
              color={"white"}
            >
              Login
            </Button>
          )}

          <Button
            hidden={token}
            display={{ base: "none", md: "inline-flex" }}
            onClick={() => {
              navigate("/signup");
            }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    ></Stack>
  );
};
