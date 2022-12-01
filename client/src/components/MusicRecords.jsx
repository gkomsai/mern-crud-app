import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteMusicRecords, getMusicRecords } from "../redux/app/action";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { useMemo } from "react";

const MusicRecords = ({ CurrentLocation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { musicRecords, totalPages, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );
  const { token } = useSelector((store) => store.AuthReducer);

  const [searchParams] = useSearchParams();
  let location = useLocation();

  const handleDelete = (id) => {
    dispatch(deleteMusicRecords(id, token, toast));
  };
  let fetchData;
  useMemo(() => {
    fetchData = location.search;
  }, [location.search, page, limit]);

  useEffect(() => {
    let isCancelled = false;
    if (
      fetchData ||
      (musicRecords.length === 0 && CurrentLocation === "homePage")
    ) {

      const sortBy = searchParams.get("sortBy");
      const queryParams = {
        params: {
          genre: searchParams.getAll("genre"),
          _sort: sortBy && "year",
          _order: sortBy,
          page: page,
          limit: limit,
        },
      };
      if (!isCancelled) {
        dispatch(getMusicRecords(queryParams, token, toast));
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [location.search, musicRecords.length, page, limit]);



  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <Box>
      <Flex
        mt="-35px"
        mb={"4rem"}
        w="100%"
        justify={"flex-end"}
        gap={{ base: ".1rem", sm: "1rem" }}
        fontSize={{ base: "5px", md: "16px" }}
        alignItems="center"
      >
        <Button
          size={{ base: "sm", sm: "md" }}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          PREV
        </Button>
        <Text
          as="span"
          bg="green"
          fontSize={"15px"}
          p="6px 20px"
          borderRadius="40px"
        >
          {page}{" "}
        </Text>
        <Button
          size={{ base: "sm" }}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </Button>
        <Select
          w={{ base: "2rem", md: "8rem" }}
          placeholder="Apply Limit"
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="6">6/page</option>
          <option value="12">12/page</option>
          <option value="18">18/page</option>
        </Select>
      </Flex>

      <SimpleGrid
        justifyContent={"flex-start"}
        alignItems={"center"}
        columns={[1, 1, 2, 3]}
        gap="3rem"
      >
        {musicRecords.map((el) => (
          <Box
            key={el._id}
            boxShadow="dark-lg"
            borderRadius={"20px"}
            p="20px"
            minH={"500px"}
          >
            <VStack justifyContent={"center"} align={"flex-start"}>
              <Box
                 mb="10px"
                alignSelf={"center"}
                borderRadius={"20px"}
                w="100%"
                height={{
                  base: "15rem",
                  sm: "20rem",
                  md: "15rem",
                  lg: "20rem",
                }}
                overflow="hidden"
              >
                <Image
                  w="900px"
                  h="300px"
                  borderRadius={"20px"}
                  transition="all 3s linear"
                  _hover={{ transform: "scale(1.2)" }}
                  src={el.image_url}
                  cursor="pointer"
                />{" "}
              </Box>

              <Text fontWeight={"bold"} noOfLines="1">
                {" "}
                SongName:{" "}
                <Text as="span" color={"green"}>
                  {" "}
                  {el.name}{" "}
                </Text>{" "}
              </Text>
              <Text fontWeight={"bold"} noOfLines="1">
                {" "}
                Artist:{" "}
                <Text as="span" color={"green"}>
                  {" "}
                  {el.artist}{" "}
                </Text>{" "}
              </Text>
              <Text fontWeight={"bold"} noOfLines="1">
                {" "}
                Genere:{" "}
                <Text as="span" color={"green"}>
                  {" "}
                  {el.genre}{" "}
                </Text>{" "}
              </Text>
              <Text fontWeight={"bold"} noOfLines="1">
                {" "}
                Year:{" "}
                <Text as="span" color={"green"}>
                  {" "}
                  {el.year}{" "}
                </Text>{" "}
              </Text>
            </VStack>
            <HStack justifyContent={"space-between"} mt="1.5rem">
              <Button onClick={() => navigate(`/albums/${el._id}/edit`)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(el._id)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default React.memo(MusicRecords);
