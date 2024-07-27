import React, { useState, useEffect } from "react";


const CustomSelect = ({
  isClearable = false,
  isSearchable = false,
  isDisabled = false,
  options = [],
  value = null,
  placeholder="select",
  isGrouped = false,
  isMulti = false,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    if (value) {
      setSelectedOptions(value);
    }
  }, [value]);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
      if (!isOpen && onMenuOpen) {
        onMenuOpen();
      }
    }
  };

  const handleOptionClick = (option) => {
    if (isMulti) {
      const newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((ele) => ele !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      if (onChangeHandler) {
        onChangeHandler(newSelectedOptions);
      }
    } else {
      setSelectedOptions(option);
      if (onChangeHandler) {
        onChangeHandler(option);
      }
      setIsOpen(false);
      
    }
  };

  const clearSelection = () => {
    setSelectedOptions(isMulti ? [] : null);
    if (onChangeHandler) {
      onChangeHandler(isMulti ? [] : null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchHandler) {
      onSearchHandler(e.target.value);
    }
  };

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const renderOptions = () => {
    if (isGrouped) {
      const groupedOptions = [];
      filteredOptions.forEach((option) => {
        const group = option.group || "Ungrouped";
        if (!groupedOptions[group]) {
          groupedOptions[group] = [];
        }
        groupedOptions[group].push(option);
      });

      return Object.entries(groupedOptions).map(([group, options]) => (
        <div key={group}>
          
          <div style={{ fontWeight: "bold", padding: "5px" }}>{group}</div>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedOptions.includes(option)
                  ? "#e6e6e6"
                  : "#fff",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      ));
    } else {
      return filteredOptions.map((option) => (
        <div
          key={option.value}
          onClick={() => handleOptionClick(option)}
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: selectedOptions.includes(option)
              ? "#e6e6e6"
              : "#fff",
          }}
        >
          {option.label}
        </div>
      ));
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <div className="custom-select-container"
        onClick={toggleDropdown}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: isDisabled ? "#f5f5f5" : "#fff",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        placeholder={placeholder}
      >
      {isMulti ? (
        selectedOptions.map((option) => (
          <button key={option.value} style={{
            color:"black",
            border:"carve"

          }} className="badge">
            {option.label}
          </button>
        ))
      ) : ( 
      null
      )}
      { selectedOptions.length===0 ? "Please Select Item" : null}
      
        {isClearable && selectedOptions.length > 0 && (
          // <button
          //   onClick={(e) => {
          //     e.preventDefault();
          //     clearSelection();
          //   }}
          //   style={{ marginLeft: "10px" }}
          // >
            <i onClick={(e) => {
              e.preventDefault();
              clearSelection();
            }}
            style={{ marginLeft: "10px" }} class="bi bi-x-lg"></i>
          // </button>
        )}
      </div>
      {isOpen && !isDisabled && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            zIndex: "1",
          }}
        >
          {isSearchable && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                borderBottom: "1px solid #ccc",
              }}
            />
          )}
          {renderOptions()}
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
