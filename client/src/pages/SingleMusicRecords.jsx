import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { getMusicRecords } from "../redux/app/action";
import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
const SingleMusicRecords = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const musicRecords = useSelector((store) => store.AppReducer.musicRecords);
  const [currentMusicAlbum, setCurrentMusicAkbun] = useState({});

  const { name, artist, genre, year } = currentMusicAlbum;

  useEffect(() => {
    // note we can do the api Request and get the data based on the id but,if my the data is already present in the store then why doibg the api request. if the  user refresh then the store data will ve gone then, only to show the data we are making the api request. this will saves the money also.
    if (musicRecords.length === 0) {
      dispatch(getMusicRecords());
    }
  }, [dispatch, musicRecords.length]);

  useEffect(() => {
    if (id) {
      // if the id is present then we getting it from the store.
      const currentMusic = musicRecords.find((album) => album.id === id);
      // if we don't find the the element then it will return the undefined, so, no meaning of setting the value, that's why I am using the && operator here.

      currentMusic && setCurrentMusicAkbun(currentMusic);
    }
  }, [id, musicRecords]);

  return (
    <Box mt="5rem">
      <Flex m="4rem 2rem" justifyContent={"space-evenly"} alignItems="center">
        <Box
          cursor={"pointer"}
          transition="all 2s linear"
          _hover={{ transform: "scale(1.5)" }}
        >
          <Image w="25rem" src={currentMusicAlbum.image_url} alt=""></Image>
        </Box>

        <VStack spacing="3rem" align={"left"}>
          <Flex gap="3rem" justifyContent={"flex-start"}>
            <Heading>Name: </Heading>
            <Heading> {name} </Heading>
          </Flex>

          <Flex gap="3rem">
            <Heading>Artist: </Heading>
            <Heading color={"grey"}>{artist} </Heading>
          </Flex>

          <Flex gap="6rem" fontWeight={"bold"} alignItems="center">
            <Text>Ratings:</Text>
            <Text className="ratings">★ {4.4}</Text>
          </Flex>

          <Flex gap="7rem">
            <Text fontWeight={"bold"}>Genere:</Text>
            <Text fontWeight={"bold"} color={"Gray"}>
              {genre}
            </Text>
          </Flex>

          <Flex gap="4rem">
            <Text fontWeight={"bold"}>Year of release:</Text>
            <Text fontWeight={"bold"} as="h3">
              {year}{" "}
            </Text>
          </Flex>
          <Box>
            <Button
              w="100%"
              bg={"pink"}
              fontWeight="bold"
              onClick={() => {
                navigate(`/albums/${id}/edit`);
              }}
            >
              EDIT MUSIC DETAILS
            </Button>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default SingleMusicRecords;
