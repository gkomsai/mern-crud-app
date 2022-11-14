import React from "react";
import { Box } from "@chakra-ui/react";
import MusicRecords from "../components/MusicRecords";
import FilterSort from "../components/FilterSort";

const Home = () => {
  return (
    <>
      <Box w="20%" mt="1rem" ml="20px">
        <FilterSort />
      </Box>
      <Box
        w={{ base: "80%", sm: "90%", md: "90%", lg: "85%", xl: "80%" }}
        m="auto"
      >
        <MusicRecords />
      </Box>
    </>
  );
};

export default Home;
