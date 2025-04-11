import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';

const UsersContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'Élève1', schoolCode: '1234', status: 'actif', lastActive: '2024-03-20' },
    { id: 2, username: 'Élève2', schoolCode: '1234', status: 'inactif', lastActive: '2024-03-19' },
    { id: 3, username: 'Élève3', schoolCode: '5678', status: 'actif', lastActive: '2024-03-20' },
  ]);

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'actif' ? 'inactif' : 'actif';
        message.success(`Statut de l'utilisateur ${user.username} mis à jour`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const columns = [
    {
      title: 'Utilisateur',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Code École',
      dataIndex: 'schoolCode',
      key: 'schoolCode',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'actif' ? 'green' : 'red'}>
          {status === 'actif' ? 'Actif' : 'Inactif'}
        </Tag>
      ),
    },
    {
      title: 'Dernière activité',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type={record.status === 'actif' ? 'default' : 'primary'}
            icon={record.status === 'actif' ? <CloseOutlined /> : <CheckOutlined />}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === 'actif' ? 'Désactiver' : 'Activer'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MobileLayout>
      <UsersContainer>
        <Header>
          <h2>Gestion des utilisateurs</h2>
        </Header>
        <Card>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </UsersContainer>
    </MobileLayout>
  );
};

export default UsersPage; 