import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMusicRecords} from "../redux/app/action";

const AddMusicRecords = () => {
  const navigate = useNavigate();
  const [musicRecord, setMusicRecord] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { token } = useSelector((store) => store.AuthReducer);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setMusicRecord({ ...musicRecord, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMusicRecords(musicRecord, token, toast)).then(() =>
      navigate(`/`)
    );
  };

  return (
    <Box h="100vh">
      <Container
        border={"1px solid silver"}
        mt={["60px", "80px"]}
        borderRadius={"2%"}
        p={["10px", "20px", "30px"]}
        maxW={"400px"}
        boxShadow="dark-lg"
      >
        <form action="" onSubmit={handleSubmit}>
          <VStack gap={"10px"}>
            <Heading>Add Album</Heading>

            <Input
              type="text"
              name="name"
              placeholder="Enter music Name"
              onChange={handleChange}
            />

            <Input
              type="text"
              name="artist"
              placeholder="Enter Artist Name"
              onChange={handleChange}
            />

            <Input
              type="text"
              name="genre"
              placeholder="Enter Genere"
              onChange={handleChange}
            />

            <Input
              type="text"
              name="year"
              placeholder="Enter year Of Release"
              onChange={handleChange}
            />

            <Input
              type="text"
              name="no_of_songs"
              placeholder="Enter no of songs"
              onChange={handleChange}
            />

            <Input
              type="url"
              name="image_url"
              placeholder="Enter Image Url"
              onChange={handleChange}
            />

            <Button w="100%" bg={"pink"} fontWeight="bold" type="submit">
              ADD
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default AddMusicRecords;
