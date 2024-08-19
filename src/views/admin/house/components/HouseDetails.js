import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Badge,
  Card,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { updateHouseField } from "../../../../actions/houseActions";

export default function HouseDetails({ house }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const dispatch = useDispatch();

  if (!house) {
    return <Text>No house details available</Text>;
  }

  const handleEditClick = (field, value) => {
    setEditField(field);
    setEditValue(value);
    onOpen();
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    dispatch(updateHouseField(house.id, editField, editValue));
    onClose();
  };

  return (
    <Box>
      <Card p="20px">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="xl" mb={4}>
            {house.address || "No address provided"}
            <IconButton
              icon={<EditIcon />}
              size="sm"
              ml="2"
              onClick={() => handleEditClick("address", house.address)}
            />
          </Text>
          <Badge colorScheme="blue"># {house.id || "No ID"}</Badge>
        </Flex>

        <Divider mb={4} />

        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            City:
          </Text>
          {house.city || "No city provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("city", house.city)}
          />
        </Text>

        {/* Add similar sections for other fields like state, country, etc. */}

        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Rent Amount:
          </Text>
          {house.rentAmount} {house.currency}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("rentAmount", house.rentAmount)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            State:
          </Text>
          {house.state || "No state provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("state", house.state)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Country:
          </Text>
          {house.country || "No country provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("country", house.country)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Zipcode:
          </Text>
          {house.zipcode || "No zipcode provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("zipcode", house.zipcode)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Lat:
          </Text>
          {house.lat || "No latitude provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("lat", house.lat)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Lng:
          </Text>
          {house.lng || "No longitude provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("lng", house.lng)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Frequency:
          </Text>
          {house.frequency || "No frequency provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("frequency", house.frequency)}
          />
        </Text>
        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Payid:
          </Text>
          {house.payid || "No payid provided"}
          <IconButton
            icon={<EditIcon />}
            size="sm"
            ml="2"
            onClick={() => handleEditClick("payid", house.payid)}
          />
        </Text>
      </Card>

      {/* Modal for editing fields */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {editField}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id={editField}>
              <FormLabel>{editField}</FormLabel>
              <Input
                value={editValue}
                onChange={handleInputChange}
                placeholder={`Enter new ${editField}`}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
