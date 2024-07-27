import React from "react";
import CustomSelect from "./customselect.components";

const options = [
  { id: "1", value: "apple", label: "Apple" },
  { id: "2", value: "banana", label: "Banana" },
  { id: "3", value: "cherry", label: "Cherry" },
  { id: "4", value: "date", label: "Date", group: "Fruits" },
  { id: "5", value: "fig", label: "Fig", group: "Fruits" },
  { id: "6", value: "grape", label: "Grape", group: "Fruits" },
  { id: "7", value: "carrot", label: "Carrot", group: "Vegetables" },
  { id: "8", value: "broccoli", label: "Broccoli", group: "Vegetables" },
  { id: "9", value: "spinach", label: "Spinach", group: "Vegetables" },
];

const MyComponent = () => {
  const handleChange = (selected) => {
    return selected
    
  };

  const handleMenuOpen = () => {
    console.log("Menu opened");
  };

  const handleSearch = (searchTerm) => {
    return searchTerm;
   
  };

  return (
    <CustomSelect
      isClearable
      isSearchable
      isDisabled={false}
      options={options}
      placeholder="Select item"
      isGrouped
      isMulti
      onChangeHandler={handleChange}
       onMenuOpen={handleMenuOpen}
      onSearchHandler={handleSearch}
    />
  );
};

export default MyComponent;
