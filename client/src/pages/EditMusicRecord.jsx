import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMusicRecords, updateMusicRecords } from "../redux/app/action";

const EditMusicRecord = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const musicRecords = useSelector((store) => store.AppReducer.musicRecords);
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.AuthReducer);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (musicName && artistName) {
      const payload = {
        name: musicName,
        artist: artistName,
      };
      dispatch(updateMusicRecords(id, payload, token, toast)).then(() =>
        navigate(`/`)
      );
    }
  };

  useEffect(() => {
    if (musicRecords.length === 0) {
      dispatch(getMusicRecords(...Array(2),toast));
    }
  }, [dispatch,]);


  useEffect(() => {
    let isCancelled = false;
    if (id) {
      const currentMusic = musicRecords.find((album) => album._id === id);

      if (currentMusic && !isCancelled) {
        setMusicName(currentMusic.name);
        setArtistName(currentMusic.artist);
      }
    }
    return () => {
      isCancelled = true;
    }
  }, [id, musicRecords]);


  
  return (
    <Container
      border={"1px solid #edf2f7"}
      mt={["60px", "80px"]}
      borderRadius={"2%"}
      p={["10px", "20px", "30px"]}
      maxW={"400px"}
      boxShadow="dark-lg"
    >
      <form action="" onSubmit={handleSubmit}>
        <VStack gap={"10px"}>
          <Heading>Update Album</Heading>
          <label>Edit Music Name</label>
          <Input
            type="text"
            value={musicName}
            name="name"
            onChange={(e) => setMusicName(e.target.value)}
          />
          <label>Edit Artist Name</label>
          <Input
            type="text"
            value={artistName}
            name="artist"
            onChange={(e) => setArtistName(e.target.value)}
          />
          <Button w="100%" bg={"pink"} fontWeight="bold" type="submit">
            UPDATE
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default EditMusicRecord;
