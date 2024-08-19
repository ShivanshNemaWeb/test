import React from 'react';
// import { Box, Image, Text, Icon, Flex, Link } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa'; // Import your desired icon
import Card from "components/card/Card.js";
import {
  MdHome,
} from 'react-icons/md';
// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
// Assets
import { MdEdit } from "react-icons/md";
const House = ({ boxShadow, mb, image, id, link, address, onClick, bg }) => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <Card bg={bg} p='14px' onClick={onClick} mb={mb}>
    <Flex align='center' direction={{ base: "column", md: "row" }}>
    <Icon as={MdHome} width="50px" height="50px" color="blue" />
      <Box mt={{ base: "10px", md: "0" }}>
        <Text
          color={textColorPrimary}
          fontWeight='500'
          fontSize='md'
          mb='4px'>
          {address}
        </Text>
        <Text
          fontWeight='500'
          color={textColorSecondary}
          fontSize='sm'
          me='4px'>
          House #{id} •{" "}
          <Link fontWeight='500' color={brandColor} fontSize='sm'>
            See House details
          </Link>
        </Text>
      </Box>
    
    </Flex>
  </Card>
  );
};

export default House;
