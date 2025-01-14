import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa; // Light blue background
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: center;
`;

const StyledButton = styled.button`
  background-color: #0277bd; // Blue background
  color: white;
  font-size: 1.2rem;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #01579b; // Darker blue on hover
    transform: scale(1.05); // Button scale effect
  }

  &:focus {
    outline: none;
  }
`;

const Main: React.FC = () => {
  return (
    <Container>
      

      <ButtonContainer>
        <Link to="/Form">
          <StyledButton>Form</StyledButton>
        </Link>
        <Link to="/TodoList">
          <StyledButton>TodoList</StyledButton>
        </Link>
        <Link to="/Todos">
          <StyledButton>Todos</StyledButton>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default Main;
