import { Box, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusicRecords, getMusicRecords } from "../redux/app/action";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const MusicRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicRecords, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );
  // console.log(musicRecords);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  // console.log(location);
const handleDelete = (id)=>{
  dispatch(deleteMusicRecords(id)).then(() =>
  dispatch(getMusicRecords()))

}
  useEffect(() => {
    if (location.search || musicRecords.length === 0) {
      const sortBy = searchParams.get("sortBy");
      const queryParams = {
        params: {
          genre: searchParams.getAll("genre"),
          _sort: sortBy && "year",
          _order: sortBy,
        },
      };
      dispatch(getMusicRecords(queryParams));
    }
  }, [location.search]);

  return (
    <SimpleGrid
      justifyContent={"flex-start"}
      alignItems={"center"}
      columns={4}
      gap="3rem"
    >
      {musicRecords.map((el) => (
        <Box className="item-box" key={el._id}>
          {" "}
          <Box>
            <Link to={`/albums/${el._id}`}>
              <Image width={"100%"} src={el.image_url} />{" "}
            </Link>
          </Box>
          <Box>{el.name}</Box>
          <Box>{el.artist}</Box>
          <Box>{el.genre}</Box>
          <Box>{el.year}</Box>
          <Flex justify={"space-between"}>
            <Button onClick={() => navigate(`/albums/${el._id}`)}>Edit</Button>
            <Button onClick={() =>handleDelete(el._id)}>
              Delete
            </Button>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MusicRecords;
