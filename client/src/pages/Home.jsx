import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import MusicRecords from "../components/MusicRecords";
import FilterSort from "../components/FilterSort";

const Home = () => {
  return (
    <>
      <Heading> Music Record app</Heading>
      <Box w="20%">
        <FilterSort />
      </Box>
      <Box h="100vw" w="80%" m="auto">
        <MusicRecords />
      </Box>
    </>
  );
};

export default Home;
