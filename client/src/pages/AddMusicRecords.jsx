import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMusicRecords, getMusicRecords } from "../redux/app/action";

const AddMusicRecords = () => {
  const navigate = useNavigate();
  const [musicRecord, setMusicRecord] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setMusicRecord({ ...musicRecord, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMusicRecords(musicRecord)).then(() =>
      dispatch(getMusicRecords()).then(() => navigate(`/`))
    );
  };
  return (
    <div>
      <Heading m="4rem 0rem">Add Music Records</Heading>

      <form action="" onSubmit={handleSubmit}>
        <VStack w="80" m="auto" spacing={8}>
          <Box>
            <label> Music Name</label>
            <Input type="text" name="name" onChange={handleChange} />
          </Box>

          <Box>
            <label> Artist Name</label>
            <Input type="text" name="artist" onChange={handleChange} />
          </Box>
          <Box>
            <label>Genre</label>
            <Input type="text" name="genre" onChange={handleChange} />
          </Box>

          <Box>
            <label>year</label>
            <Input type="text" name="year" onChange={handleChange} />
          </Box>
          <Box>
            <label>no_of_songs</label>
            <Input type="text" name="no_of_songs" onChange={handleChange} />
          </Box>
          <Box>
            <label>Image</label>
            <Input type="url" name="image_url" onChange={handleChange} />
          </Box>

          <Button w="100%" bg={"pink"} fontWeight="bold" type="submit">
            ADD
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default AddMusicRecords;
