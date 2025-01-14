import React from "react";
import styled from "styled-components";

// Define types for the props
interface AddDeleteProps {
  item: string; // Assuming item is a string
  valueList: string[]; // Array of strings representing the value list
  setValueList: React.Dispatch<React.SetStateAction<string[]>>; // Function to update the valueList state
  bookmarkedItems: string[]; // Array of strings representing the bookmarked items
  setBookmarkedItems: React.Dispatch<React.SetStateAction<string[]>>; // Function to update the bookmarkedItems state
}

const AddDelete: React.FC<AddDeleteProps> = ({
  item,
  valueList,
  setValueList,
  bookmarkedItems,
  setBookmarkedItems,
}) => {
  const handleDeleteValue = (item: string) => {
    const updatedList = valueList.filter((val) => val !== item);
    setValueList(updatedList);
    localStorage.setItem("valueList", JSON.stringify(updatedList));

    const updatedBookmarks = bookmarkedItems.filter((val) => val !== item);
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
  };

  // Styled button for the "Delete" action
  const YellowCircle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: white;
    border-radius: 10px;
    border: 2px solid #ffdd5b;
    padding: 20px;
    width: 100px;
    height: 40px;
  `;

  return (
    <YellowCircle onClick={() => handleDeleteValue(item)}>
      Delete
    </YellowCircle>
  );
};

export default AddDelete;
