import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

interface FormValues {
  userName: string;
  address: string;
  email: string;
  cardNumber: string;
  secret: string;
  expirationDate: string;
}

interface User {
  userName: string;
  address: string;
  email: string;
  cardDetails: {
    cardNumber: string;
    secret: string;
    expirationDate: string;
  };
}

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const userSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .test("includes-char", "โปรดใส่ @", (value) => {
        return value ? value.includes("@") : false;
      })
      .test("includes-dot", "โปรดใส่ . (จุด)", (value) => {
        return value ? value.includes(".") : false;
      })
      .test("no-spaces", "อีเมลต้องไม่มีช่องว่าง", (value) => {
        return value ? !value.includes(" ") : true;
      })
      .email("รูปแบบอีเมลไม่ถูกต้อง เช่น user@example.com")
      .required("กรุณากรอกอีเมล"),
  });

  const cardSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .matches(/^\d+$/, "ต้องเป็นตัวเลขเท่านั้น")
      .required("Card number is required"),
    secret: Yup.string().required("Secret is required"),
    expirationDate: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "รูปแบบวันหมดอายุต้องเป็น MM/YY เช่น 01/25"
      )
      .required("Expiration date is required"),
  });

  const combinedSchema = step === 1 ? userSchema : cardSchema;

  const initialValues: FormValues = {
    userName: "",
    address: "",
    email: "",
    cardNumber: "",
    secret: "",
    expirationDate: "",
  };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (step === 1) {
      setStep(2);
    } else {
      const newUser: User = {
        userName: values.userName,
        address: values.address,
        email: values.email,
        cardDetails: {
          cardNumber: values.cardNumber,
          secret: values.secret,
          expirationDate: values.expirationDate,
        },
      };
      dispatch(addUser(newUser));
      resetForm();
      setStep(1);
    }
  }; 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={combinedSchema}
      onSubmit={handleSubmit}
    >
      {(formDatas) => (
        <Center>
          <form onSubmit={formDatas.handleSubmit}>
            {step === 1 ? (
              <>
                <h3>Contact Details</h3>
                <TextMargin>
                  <label>Name</label>
                  <StyledInput
                    type="text"
                    name="userName"
                    value={formDatas.values.userName}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.userName && formDatas.errors.userName
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.userName && formDatas.errors.userName && (
                    <ErrorText>{formDatas.errors.userName}</ErrorText>
                  )}
                </TextMargin>
                <TextMargin>
                  <label>Address</label>
                  <StyledInput
                    type="text"
                    name="address"
                    value={formDatas.values.address}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.address && formDatas.errors.address
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.address && formDatas.errors.address && (
                    <ErrorText>{formDatas.errors.address}</ErrorText>
                  )}
                </TextMargin>
                <TextMargin>
                  <label>Email</label>
                  <StyledInput
                    type="email"
                    name="email"
                    value={formDatas.values.email}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.email && formDatas.errors.email
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.email && formDatas.errors.email && (
                    <ErrorText>{formDatas.errors.email}</ErrorText>
                  )}
                </TextMargin>
                <ButtonGroup>
                  <StyledButton type="button" onClick={() => formDatas.resetForm()}>
                    Cancel
                  </StyledButton>
                  <StyledButton type="submit">Next</StyledButton>
                </ButtonGroup>
              </>
            ) : (
              <>
                <h3>Payment Details</h3>
                <TextMargin>
                  <label>Card Number</label>
                  <StyledInput
                    type="text"
                    name="cardNumber"
                    value={formDatas.values.cardNumber}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.cardNumber && formDatas.errors.cardNumber
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.cardNumber && formDatas.errors.cardNumber && (
                    <ErrorText>{formDatas.errors.cardNumber}</ErrorText>
                  )}
                </TextMargin>
                <TextMargin>
                  <label>Secret</label>
                  <StyledInput
                    type="text"
                    name="secret"
                    value={formDatas.values.secret}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.secret && formDatas.errors.secret
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.secret && formDatas.errors.secret && (
                    <ErrorText>{formDatas.errors.secret}</ErrorText>
                  )}
                </TextMargin>
                <TextMargin>
                  <label>Expiration Date</label>
                  <StyledInput
                    type="text"
                    name="expirationDate"
                    value={formDatas.values.expirationDate}
                    onChange={formDatas.handleChange}
                    onBlur={formDatas.handleBlur}
                    className={
                      formDatas.touched.expirationDate &&
                      formDatas.errors.expirationDate
                        ? "input-error"
                        : ""
                    }
                  />
                  {formDatas.touched.expirationDate &&
                    formDatas.errors.expirationDate && (
                      <ErrorText>{formDatas.errors.expirationDate}</ErrorText>
                    )}
                </TextMargin>
                <ButtonGroup>
                  <StyledButton type="button" onClick={() => setStep(1)}>
                    Previous
                  </StyledButton>
                  <StyledButton type="submit">Submit</StyledButton>
                </ButtonGroup>
              </>
            )}
          </form>
        </Center>
      )}
    </Formik>
  );
};

export default UserForm;


const Center = styled.div`
  margin: auto;
  width: 50%;
  border: 1px solid;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TextMargin = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &.input-error {
    border: 1px solid red;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
