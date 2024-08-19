import {
    Text,
    useColorModeValue,
    Divider,
    Flex,
    IconButton,
    List,
    Button,
  } from "@chakra-ui/react";
  import { AddIcon } from "@chakra-ui/icons";
  import React, { useState, useEffect } from "react";
  // Custom components
  import Card from "components/card/Card.js";
  import House from "./House";
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchHouse } from '../../../../actions/houseActions';
  
  export default function HouseList({ isCreate, setIsCreate, onHouseClick, selectedHouse }) {
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const cardShadow = useColorModeValue(
      "0px 18px 40px rgba(112, 144, 176, 0.12)",
      "unset"
    );
    
    const dispatch = useDispatch();
    const houseData = useSelector((state) => state.house.house || []); // Adjust if needed
    console.log(houseData)
    useEffect(() => {
      dispatch(fetchHouse());
    }, [dispatch]);
  
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const housesPerPage = 4;
  
    // Calculate current houses
    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houseData.slice(indexOfFirstHouse, indexOfLastHouse);
  
    // Calculate total pages
    const totalPages = Math.ceil(houseData.length / housesPerPage);
  
    // Handlers for pagination
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleAddNewHouseClick = () => {
      setIsCreate(true);
    };
  
    return (
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          All Houses
        </Text>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="10px">
          Here you can manage the listing of houses
        </Text>
  
        <Divider mb="20px" />
  
        {/* Row with Add New House text, vertical divider, and button */}
        <Flex
          alignItems="center"
          mb="20px"
          bg={isCreate ? "blue.50" : "transparent"}
          p="10px"
        >
          <Text
            color={textColorPrimary}
            fontSize="lg"
            fontWeight="bold"
            onClick={handleAddNewHouseClick}
          >
            Add New House
          </Text>
          <Divider orientation="vertical" height="20px" mx="10px" />
          <IconButton
            aria-label="Add new house"
            icon={<AddIcon />}
            colorScheme="blue"
            variant="solid"
            borderRadius="md"
            onClick={handleAddNewHouseClick}
            marginLeft="50%"
          />
        </Flex>
  
        <Divider mb="20px" />
  
        <List overflowY="auto" height="80%" cursor="pointer">
          {currentHouses.map((house) => (
            <House
              key={house.id} // Use house.id as the key
              boxShadow={cardShadow}
              mb="20px"
              image={house.image} // Ensure `image` is a valid property or remove it
              id={house.id}
              link="#"
              address={house.address}
              onClick={() => onHouseClick(house)}
              bg={selectedHouse?.id === house.id && !isCreate ? "blue.50" : "Transparent"}
            />
          ))}
        </List>
  
        {/* Pagination Controls */}
        <Flex justifyContent="space-between" mt="20px">
          <Button
            onClick={handlePreviousPage}
            isDisabled={currentPage === 1}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </Flex>
      </Card>
    );
  }
  