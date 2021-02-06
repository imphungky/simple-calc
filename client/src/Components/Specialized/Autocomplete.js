import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Autocomplete({ listId, options, setValue, value, ...props }) {
  const [searchTerm, setSearchTerm] = useState(value ? value : "");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (options.includes(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <InputGroup>
      <Input
        list={listId}
        onChange={handleChange}
        value={searchTerm}
        {...props}
      />
      <datalist id={listId}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </datalist>
      <InputRightElement>
        <IconButton
          aria-label="Clear input"
          colorScheme="blue"
          icon={<CloseIcon />}
          size="xs"
          variant="unstyled"
          onClick={() => {
            setSearchTerm("");
            setValue("");
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default Autocomplete;
