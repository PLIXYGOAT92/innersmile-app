import React from 'react';
import styled from 'styled-components';

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    width: 430px;
    border-radius: 20px;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
`;

const MobileContent = styled.div`
  flex: 1;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: none;
  width: 100%;
  background: #f5f5f5;
  transition: all 0.3s ease;

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const MobileLayout = ({ children }) => {
  return (
    <MobileContainer>
      <MobileContent>
        {children}
      </MobileContent>
    </MobileContainer>
  );
};

export default MobileLayout; 