import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React, { useState } from "react";

const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];

function AutocompleteSelect() {
  const [options, setOptions] = useState(countries);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCreateItem = (item) => {
    setOptions((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };
  return (
    <CUIAutoComplete
      placeholder="Type a Country"
      onCreateItem={handleCreateItem}
      items={options}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
      inputStyleProps={{ variant: "unstyled" }}
      toggleButtonStyleProps={{ display: "none" }}
      listStyleProps={{ zIndex: 99 }}
      listItemStyleProps={{ zIndex: 99 }}
    />
  );
}

export default AutocompleteSelect;
