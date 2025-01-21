import React, { useState, useEffect } from "react";
import Input from "../components/input";
import AddDelete from "../components/addDelete";
import AddBookmark from "../components/addBookmark";
import styled from "styled-components";

function TodoList() {
  const [valueList, setValueList] = useState<Item[]>([]); 
  const [bookmarkedItems, setBookmarkedItems] = useState<Item[]>([]); 

  useEffect(() => {
    const storedValueList = localStorage.getItem("valueList");
    const storedBookmarks = localStorage.getItem("bookmarkedItems");

    const savedData = storedValueList ? JSON.parse(storedValueList) : [];
    const savedBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    setValueList(savedData);
    setBookmarkedItems(savedBookmarks);
  }, []);

  console.log(valueList, bookmarkedItems);

  return (
    <Container>
      <div className="justify-self-center border-2 border-yellow-300 rounded-lg p-4 text-white">
        <Input valueList={valueList} setValueList={setValueList} />
        <ul>
          {valueList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 items-center pt-2 pb-2"
            >
              <YellowCircle>{item}</YellowCircle>
              <AddDelete
                item={item}
                valueList={valueList}
                setValueList={setValueList}
                bookmarkedItems={bookmarkedItems}
                setBookmarkedItems={setBookmarkedItems}
              />
              <AddBookmark
                item={item}
                bookmarkedItems={bookmarkedItems}
                setBookmarkedItems={setBookmarkedItems}
              />
            </div>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default TodoList;

type Item = string;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  border: 4px solid #ffdd5b;  // Adding yellow border here
  border-radius: 12px;  // Optional: rounded corners for the border
`;

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