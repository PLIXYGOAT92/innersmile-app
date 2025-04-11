import React from 'react';
import { Card, Typography, Button, Table, Space } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';

const { Title } = Typography;

const AdminContainer = styled.div`
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

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <MobileLayout>
      <AdminContainer>
        <Header>
          <StyledTitle level={2}>Panneau d'administration</StyledTitle>
        </Header>
        
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" block onClick={() => navigate('/admin/users')}>
              Gérer les utilisateurs
            </Button>
            <Button type="primary" block onClick={() => navigate('/admin/messages')}>
              Gérer les messages
            </Button>
            <Button type="primary" block onClick={() => navigate('/admin/schools')}>
              Gérer les écoles
            </Button>
            <Button danger block onClick={handleLogout}>
              Déconnexion
            </Button>
          </Space>
        </Card>
      </AdminContainer>
    </MobileLayout>
  );
};

export default AdminPage; 