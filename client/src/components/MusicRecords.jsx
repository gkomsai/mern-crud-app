import {
  Box,
  Button,
  color,
  Flex,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusicRecords, getMusicRecords } from "../redux/app/action";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const MusicRecords = () => {
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
  const location = useLocation();

  const handleDelete = (id) => {
    dispatch(deleteMusicRecords(id, token, toast));
    //   .then(() =>
    //   dispatch(getMusicRecords()) // if I call this get Method here then even  the our delete method got error but this getMusicRecord() is get called, which is the unnecessary call so moved it into the the action file.
    // );
  };

  useEffect(() => {
    if (location.search || musicRecords.length === 0) {
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
      dispatch(getMusicRecords(queryParams, token, toast));
    }
  }, [location.search, page, limit]);
 
  return (
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
          <option value="10">10/page</option>
          <option value="20">20/page</option>
        </Select>
      </Flex>

      <SimpleGrid
        justifyContent={"flex-start"}
        alignItems={"center"}
        columns={[1, 1, 2, 3]}
        gap="3rem"
      >
        {musicRecords.map((el) => (
          <Box key={el._id} boxShadow="dark-lg" p="20px" minH={"500px"}>
            <VStack justifyContent={"center"} align={"flex-start"}>
              <Box
                transition="all 2s linear"
                _hover={{ transform: "scale(1.1)" }}
              >
                <Link to={`/albums/${el._id}`}>
                  <Image objectFit={"cover"} h="300px" src={el.image_url} />{" "}
                </Link>
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
              <Button onClick={() => navigate(`/albums/${el._id}`)}>
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

export default MusicRecords;
