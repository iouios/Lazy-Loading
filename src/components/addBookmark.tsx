import React from "react";
import styled from "styled-components";

// Define types for the props
interface AddBookmarkProps {
  bookmarkedItems: string[]; // Array of strings representing the bookmarked items
  setBookmarkedItems: React.Dispatch<React.SetStateAction<string[]>>; // Function to update the bookmarkedItems state
  item: string; // The item that might be bookmarked
}

// Styled button for the "Bookmark" action
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

const AddBookmark: React.FC<AddBookmarkProps> = ({
  bookmarkedItems,
  setBookmarkedItems,
  item,
}) => {
  const handleBookmark = () => {
    const isBookmarked = bookmarkedItems.includes(item);
    const updatedBookmarks = isBookmarked
      ? bookmarkedItems.filter((val) => val !== item)
      : [...bookmarkedItems, item];

    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
  };

  return (
    <div>
      <YellowCircle
        className={`border-2 rounded-lg ${
          bookmarkedItems.includes(item)
            ? "bg-yellow-300 text-black"
            : "border-yellow-300 text-white"
        }`}
        onClick={handleBookmark}
      >
        Bookmark
      </YellowCircle>
    </div>
  );
};

export default AddBookmark;
