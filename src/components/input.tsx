import React, { useState } from 'react';
import styled from "styled-components";

// Define types for the props
interface InputProps {
  valueList: string[]; // Array of strings representing the list of values
  setValueList: React.Dispatch<React.SetStateAction<string[]>>; // Function to update the valueList state
}

const Input: React.FC<InputProps> = ({ valueList, setValueList }) => {
  const [valueitem, setValueitem] = useState<string>(''); // State to store the current input value

  // Handle the change in input field
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueitem(event.target.value);
  };

  // Handle adding the new value to the list
  const handleAddValue = () => {
    if (valueitem.trim() === "") return; // Don't add empty values

    const updatedList = [valueitem, ...valueList];
    setValueList(updatedList); 
    localStorage.setItem("valueList", JSON.stringify(updatedList)); // Save the updated list to localStorage
    setValueitem(""); // Reset the input field
  };

  // Styled button for adding the value
  const YellowCircle = styled.button`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 16px;
    color: white;
    border-radius: 10px;
    border: 2px solid #ffdd5b;
    width: 100px;
    height: 42px;
  `;

  return (
    <div className="grid grid-rows-1 grid-flow-col gap-2 pb-2 justify-center">
      <input
        type="text"
        className="border-2 bg-black rounded-lg p-2"
        value={valueitem}
        onChange={handleNameChange}
        onKeyDown={(event) => {
            if (event.key === "Enter") handleAddValue();
          }}
      />
      <YellowCircle onClick={handleAddValue}>Add Value</YellowCircle>
    </div>
  );
};

export default Input;
