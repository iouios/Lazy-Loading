import React from "react";
import { Provider } from "react-redux";
import { store } from '../store/store'
import UserForm from '../Pages/userForm'
import UserInfo from "../Pages/userInfo";
import styled from "styled-components";


const TextMargin = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; 
`;

const Form: React.FC = () => {
  return (
    <Provider store={store}>
        <div>
          <TextMargin><h1>Form</h1></TextMargin>
          <UserForm />
          <UserInfo />
        </div>
    </Provider>
  );
};

export default Form;
