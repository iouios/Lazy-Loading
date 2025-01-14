import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/userSlice'; 

interface RemoveProps {
  id: number; 
}

const Remove: React.FC<RemoveProps> = ({ id }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeUser(id)); // Dispatch action เพื่อลบผู้ใช้ที่มี id นี้
  };

  return (
    <button onClick={handleRemove}>Remove</button> // ปุ่มลบ
  );
};

export default Remove;
