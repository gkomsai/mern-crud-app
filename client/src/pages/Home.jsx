import React from "react";

import { Box, Heading } from "@chakra-ui/react";
import FilterSort from "../components/FilterSort";
import MusicRecords from "../components/MusicRecords";

const Home = () => {
  return (
    <>
      <Heading> Music Record app</Heading>
      <Box h="100vw" display={"flex"} mt={"1rem"}>
        <Box w="20%" border="1px solid blue">
          <FilterSort />
        </Box>
        <Box w="80%">
          <MusicRecords />
        </Box>
      </Box>
    </>
  );
};

export default Home;
