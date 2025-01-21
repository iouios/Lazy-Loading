import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

const Calculator: React.FC = () => {
  const [startValue, setStartValue] = useState<number>(0); 
  const [sum, setSum] = useState<number>(0); 
  const [tempValue, setTempValue] = useState<number>(0); 
  const [isSettingStart, setIsSettingStart] = useState<boolean>(true); 

  const initialValue = useMemo(() => startValue, [startValue]);

  const handleCalculation = useCallback(
    (operation: '+' | '-') => {
      if (isSettingStart) {
        
        setTempValue((prevValue) => {
          if (operation === '+') {
            return prevValue + 1;
          } else if (operation === '-') {
            return prevValue - 1;
          }
          return prevValue;
        });
      } else {
       
        setSum((prevSum) => {
          if (operation === '+') {
            return prevSum + 1;
          } else if (operation === '-') {
            return prevSum - 1;
          }
          return prevSum;
        });
      }
    },
    [isSettingStart] 
  );


  const handleSetStart = useCallback(() => {
    setStartValue(tempValue); 
    setSum(tempValue); 
    setIsSettingStart(false); 
  }, [tempValue]);

  return (
    <Container>
      <Title>ตั้งค่าตัวเลขเริ่มต้น</Title>
      <ValueControl>
        <Button onClick={() => handleCalculation('+')}>+</Button>
        <Value>{isSettingStart ? tempValue : sum}</Value>
        <Button onClick={() => handleCalculation('-')}>-</Button>
      </ValueControl>
      {isSettingStart && (
        <SetStartButton onClick={handleSetStart}>ตั้งค่าเป็นเริ่มต้น</SetStartButton>
      )}
      <ResultSection>
        <h3>ค่าเริ่มต้น: {initialValue}</h3>
        <h3>ผลรวม: {sum}</h3>
      </ResultSection>
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const ValueControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Value = styled.span`
  font-size: 24px;
  margin: 0 20px;
  color: #333;
`;

const SetStartButton = styled(Button)`
  background-color: #007bff;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultSection = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default Calculator;
