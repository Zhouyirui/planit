import React, { useState } from "react";
import "./AutoCompleteSearch.css";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";

function AutoCompleteSearch(props) {
  const { setDisplayedModule, moduleData } = props;
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState(false);

  function handleSearchChange(event) {
    if (event.target.value.length === 0) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    setSearchText(event.target.value);
  }
  return (
    <div>
      <InputGroup>
        <FormControl
          placeholder="Search for module code"
          onChange={handleSearchChange}
          value={searchText}
          className="search-bar"
        />
      </InputGroup>
      {display && (
        <SuggestionsList
          searchText={searchText}
          setSearchText={setSearchText}
          setDisplay={setDisplay}
          setDisplayedModule={setDisplayedModule}
          moduleData={moduleData}
        />
      )}
    </div>
  );
}

function SuggestionsList(props) {
  const {
    searchText,
    setSearchText,
    setDisplay,
    setDisplayedModule,
    moduleData,
  } = props;
  const filteredList = moduleData.filter(
    (item) =>
      item.moduleCode.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );

  const handleSelectItem = (i) => {
    setSearchText("");
    setDisplay(false);
    setDisplayedModule(i);
  };

  return (
    <Dropdown>
      {filteredList.length ? (
        filteredList.map((item, index) => {
          return (
            <Dropdown.Item
              as="button"
              onClick={() => handleSelectItem(item)}
              key={index}
              className="dropdown-list"
            >
              {item.moduleCode + " " + item.title}
            </Dropdown.Item>
          );
        })
      ) : (
        <Dropdown.ItemText>Cannot find module "{searchText}"</Dropdown.ItemText>
      )}
    </Dropdown>
  );
}

export default AutoCompleteSearch;
