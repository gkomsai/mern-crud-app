import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMusicRecords } from "../redux/app/action";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const MusicRecords = () => {
  const dispatch = useDispatch();
  const { musicRecords, isLoading, isError } = useSelector(
    (store) => store.AppReducer
  );
  // console.log(musicRecords);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  // console.log(location);

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
        <Box className="item-box" key={el.id}>
          <Link to={`/albums/${el.id}`}>
            {" "}
            <Box>
              <Image width={"100%"} src={el.image_url} />
            </Box>
            <Box>{el.name}</Box>
            <Box>{el.artist}</Box>
            <Box>{el.genre}</Box>
            <Box>{el.year}</Box>
          </Link>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MusicRecords;
