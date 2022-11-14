import React from "react";
import { Box } from "@chakra-ui/react";
import MusicRecords from "../components/MusicRecords";
import FilterSort from "../components/FilterSort";

const Home = () => {
  return (
    <>
      <Box w="20%" mt="1rem">
        <FilterSort />
      </Box>
      <Box w="80%" m="auto">
        <MusicRecords />
      </Box>
    </>
  );
};

export default Home;
