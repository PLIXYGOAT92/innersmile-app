import React from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: fixed;
  top: 20px;
  right: calc(50% - 200px);
  z-index: 1000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);
  }

  .anticon {
    font-size: 20px;
    color: #FF69B4;
  }
`;

const HelpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/help');
  };

  return (
    <StyledButton
      icon={<QuestionCircleOutlined />}
      onClick={handleClick}
      aria-label="Aide"
    />
  );
};

export default HelpButton; 