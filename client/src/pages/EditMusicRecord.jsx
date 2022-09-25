import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMusicRecords, updateMusicRecords } from "../redux/app/action";

const EditMusicRecord = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const musicRecords = useSelector((store) => store.AppReducer.musicRecords);
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (musicName && artistName) {
      const payload = {
        name: musicName,
        artist: artistName,
      };
      dispatch(updateMusicRecords(id, payload)).then(() =>
        dispatch(getMusicRecords()).then(() => navigate(`/albums/${id}`))
      );
    }
  };

  useEffect(() => {
    // note we can do the api Request and get the data based on the id but,if my the data is already present in the store then why doibg the api request. if the  user refresh then the store data will ve gone then, only to show the data we are making the api request. this will saves the money also.
    if (musicRecords.length === 0) {
      dispatch(getMusicRecords());
    }
  }, [dispatch, musicRecords.length]);

  useEffect(() => {
    if (id) {
      // if the id is present then we getting it from the store.
      const currentMusic = musicRecords.find((album) => album._id === id);
      // if we don't find the the element then it will return the undefined, so, no meaning of setting the value, that's why I am using the if condition below here.
      if (currentMusic) {
        setMusicName(currentMusic.name);
        setArtistName(currentMusic.artist);
      }
    }
  }, [id, musicRecords]);

  return (
    <div>
      <Heading m="4rem 0rem">Edit Page</Heading>

      <form action="" onSubmit={handleSubmit}>
        <VStack w="80" m="auto" spacing={8}>
          <Box>
            <label>Edit Music Name</label>
            <Input
              type="text"
              value={musicName}
              name="name"
              onChange={(e) => setMusicName(e.target.value)}
            />
          </Box>

          <Box>
            <label>Edit Artist Name</label>
            <Input
              type="text"
              value={artistName}
              name="artist"
              onChange={(e) => setArtistName(e.target.value)}
            />
          </Box>

          <Button w="100%" bg={"pink"} fontWeight="bold" type="submit">
            UPDATE
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default EditMusicRecord;
