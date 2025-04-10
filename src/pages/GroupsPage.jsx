import React from 'react';
import { Card, Typography, Avatar } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { categories } from '../config/categories';
import MobileLayout from '../components/MobileLayout';

const { Title, Text } = Typography;

const GroupsContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const StyledTitle = styled(Title)`
  color: #722ed1 !important;
  margin-bottom: 8px !important;
`;

const StyledDescription = styled(Text)`
  color: #666;
  font-size: 16px;
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const GroupCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const GroupTitle = styled(Title)`
  margin: 0 !important;
  color: ${props => props.color} !important;
`;

const GroupDescription = styled(Text)`
  color: #666;
  font-size: 14px;
`;

const GroupsPage = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const handleGroupClick = (groupId) => {
    navigate(`/chat/${groupId}`);
  };

  return (
    <MobileLayout>
      <GroupsContainer>
        <Header>
          <StyledTitle level={2}>Bienvenue {username} !</StyledTitle>
          <StyledDescription>
            Choisissez une catégorie pour commencer à discuter
          </StyledDescription>
        </Header>

        <GroupsGrid>
          {categories.map(category => (
            <GroupCard
              key={category.id}
              onClick={() => handleGroupClick(category.id)}
              hoverable
            >
              <GroupHeader>
                <Avatar 
                  size="large" 
                  style={{ 
                    backgroundColor: category.color,
                    color: 'white'
                  }}
                >
                  {category.title[0]}
                </Avatar>
                <GroupTitle level={4} color={category.color}>
                  {category.title}
                </GroupTitle>
              </GroupHeader>
              <GroupDescription>
                {category.description}
              </GroupDescription>
            </GroupCard>
          ))}
        </GroupsGrid>
      </GroupsContainer>
    </MobileLayout>
  );
};

export default GroupsPage; 