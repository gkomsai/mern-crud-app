import React from "react";

import { Box, Heading } from "@chakra-ui/react";
// import FilterSort from "../components/FilterSort";
import MusicRecords from "../components/MusicRecords";

const Home = () => {
  return (
    <>
      <Heading> Music Record app</Heading>
      <Box h="100vw" w="80%" m="auto">
        <MusicRecords />
      </Box>
    </>
  );
};

export default Home;
