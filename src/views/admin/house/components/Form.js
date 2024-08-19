import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Card,
} from "@chakra-ui/react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { createHouse } from "../../../../actions/houseActions";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (e.g., San Francisco)
  lng: -122.4194, // Default longitude (e.g., San Francisco)
};

export default function HouseForm() {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCT_wko6Hef9u0cBMQD89PIPig0mGBkqRI';
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    lat: "",
    lng: "",
    rentAmount: "",
    currency: "",
    frequency: "",
    createdById: "",
    payid:""
  });

  const [selectedPosition, setSelectedPosition] = useState(defaultCenter);

  const dispatch = useDispatch();
  const autocompleteRef = useRef(null);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    await updateAddressFromCoordinates(lat, lng);
  };

  const updateAddressFromCoordinates = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const address = data.results[0].formatted_address;

    const mappedData = {
      address: address,
      city:
        addressComponents.find((component) =>
          component.types.includes("locality")
        )?.long_name || "",
      state:
        addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name || "",
      country:
        addressComponents.find((component) =>
          component.types.includes("country")
        )?.long_name || "",
      zipcode:
        addressComponents.find((component) =>
          component.types.includes("postal_code")
        )?.long_name || "",
      lat: lat,
      lng: lng,
    };

    setFormData({ ...formData, ...mappedData });
  };

  const handlePlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setSelectedPosition({ lat, lng });

    updateAddressFromCoordinates(lat, lng);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createHouse(formData));
  };

  return (
    <Card>
      <Box
        as="form"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        height="100%"
        onSubmit={handleSubmit}
      >
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelected}
          >
            <Input
              type="text"
              placeholder="Search location"
              mb="4"
              width="100%"
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={selectedPosition}
            onClick={handleMapClick}
          >
            <Marker position={selectedPosition} />
          </GoogleMap>
        </LoadScript>

        {/* Rent Amount and Currency Fields */}
        <Flex mt="4" mb="4">
          <FormControl id="rentAmount" mr="4" isRequired>
            <FormLabel>Rent Amount</FormLabel>
            <Input
              type="number"
              placeholder="Enter rent amount"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="payid" mr="4" isRequired>
            <FormLabel>Payid</FormLabel>
            <Input
              type="text"
              placeholder="Enter payid"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="currency" isRequired>
            <FormLabel>Currency</FormLabel>
            <Select
              placeholder="Select currency"
              onChange={handleInputChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
          </FormControl>
        </Flex>

        {/* Payment Frequency Field */}
        <Flex mb="4">
          <FormControl id="frequency" isRequired>
            <FormLabel>Payment Frequency</FormLabel>
            <Select
              placeholder="Select frequency"
              onChange={handleInputChange}
            >
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
              <option value="WEEKLY">Weekly</option>
            </Select>
          </FormControl>
        </Flex>

        <Button type="submit" colorScheme="blue" width="100%">
          Create House
        </Button>
      </Box>
    </Card>
  );
}
