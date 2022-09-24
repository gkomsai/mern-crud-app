
import { Box, Heading,  } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenreParams = searchParams.getAll("genre");
  const initialSortParams = searchParams.get("sortBy"); //since we have only one initialSort params i.e radio type so, we are using .get only in this case
  // console.log(initialSortParams);
  const [category, setCategory] = useState(initialGenreParams || []);
  const [sortBy, setSortBy] = useState(initialSortParams || "");

  const handleGenreChange = (e) => {
    const option = e.target.value;
    let newCategory = [...category];
    if (category.includes(option)) {
      //if the option is already present in the category, remove it
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      //else add it in the category array
      newCategory.push(option);
    }
    setCategory(newCategory);
  };
  // console.log(category);

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    //if the category changes then reflect it on the URL search as well & for this we are giving the category= categoryname
    if (category || sortBy) {
      setSearchParams({ genre: category, sortBy: sortBy });
    }
  }, [category, setSearchParams, sortBy]);

  return (
    <Box>
      <Heading m="1.5rem 1rem .5rem 1rem" size={"sm"}>Filter</Heading>

      <Box>
        <input
          type="checkbox"
          defaultChecked={category.includes("K-Pop")}
          value="K-Pop"
          onChange={handleGenreChange}
        />
        <label>K-Pop</label>
      </Box>
      <Box>
        <input
          type="checkbox"
          defaultChecked={category.includes("Country")} //this is for persisting our data based on the category.
          value="Country"
          onChange={handleGenreChange}
        />
        <label>Country</label>
      </Box>
      <Box>
        <input
          type="checkbox"
          defaultChecked={category.includes("Pop")}
          value="Pop"
          onChange={handleGenreChange}
        />
        <label>Pop</label>
      </Box>

      <Box>
        <input
          type="checkbox"
          defaultChecked={category.includes("Holiday")}
          onChange={handleGenreChange}
          value="Holiday"
        />
        <label>Holiday</label>
      </Box>

      <Box>
        <input
          type="checkbox"
          defaultChecked={category.includes("Heavy Metal")}
          onChange={handleGenreChange}
          value="Heavy Metal"
        />
        <label>Heavy Metal</label>
      </Box>
      <Heading m="1.5rem 1rem .5rem 1rem" size={"sm"}>Sort by year</Heading>
      <div onChange={handleSortBy}>
        <div>
          <input
            type="radio"
            value="asc"
            name="sortBy"
            defaultChecked={sortBy === "asc"}
          />
          <label>Ascending</label>
        </div>
        <div>
          <input
            type="radio"
            name="sortBy"
            value="desc"
            defaultChecked={sortBy === "desc"}
          />
          <label>Descending</label>
        </div>
      </div>
    </Box>
  );
};

export default FilterSort;


 

