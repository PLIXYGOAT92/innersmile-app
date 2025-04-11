import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message } from 'antd';
import { MessageOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';

const MessagesContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const MessageContent = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessagesPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Bonjour, je me sens stressé pour mes examens...',
      username: 'Élève1',
      group: 'Examens et stress',
      date: '2024-03-20 14:30',
      status: 'actif'
    },
    {
      id: 2,
      content: 'Comment gérer son temps pendant les révisions ?',
      username: 'Élève2',
      group: 'Méthodes de travail',
      date: '2024-03-20 15:45',
      status: 'actif'
    },
    {
      id: 3,
      content: 'Je n\'arrive pas à dormir la veille des examens...',
      username: 'Élève3',
      group: 'Examens et stress',
      date: '2024-03-20 16:20',
      status: 'inactif'
    },
  ]);

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    message.success('Message supprimé avec succès');
  };

  const handleToggleStatus = (messageId) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const newStatus = msg.status === 'actif' ? 'inactif' : 'actif';
        message.success(`Statut du message mis à jour`);
        return { ...msg, status: newStatus };
      }
      return msg;
    }));
  };

  const columns = [
    {
      title: 'Message',
      dataIndex: 'content',
      key: 'content',
      render: (text) => (
        <MessageContent>
          <MessageOutlined style={{ marginRight: 8 }} />
          {text}
        </MessageContent>
      ),
    },
    {
      title: 'Utilisateur',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Groupe',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'actif' ? 'green' : 'red'}>
          {status === 'actif' ? 'Visible' : 'Masqué'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === 'actif' ? 'Masquer' : 'Afficher'}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMessage(record.id)}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MobileLayout>
      <MessagesContainer>
        <Header>
          <h2>Gestion des messages</h2>
        </Header>
        <Card>
          <Table
            columns={columns}
            dataSource={messages}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </MessagesContainer>
    </MobileLayout>
  );
};

export default MessagesPage; 