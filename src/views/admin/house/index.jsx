import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import HouseList from "./components/HouseList";
import Form from "./components/Form";
import HouseDetails from "./components/HouseDetails";
export default function Overview() {
  const [isCreate, setIsCreate] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleHouseClick = (house) => {
    setIsCreate(false);
    setSelectedHouse(house);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <HouseList
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          onHouseClick={handleHouseClick}
          selectedHouse ={selectedHouse}
        />
        {isCreate ? (
          <Form />
        ) : (
          <Box>
           <HouseDetails house ={selectedHouse}/>
          </Box>
        )}
      </Grid>
    </Box>
  );
}
