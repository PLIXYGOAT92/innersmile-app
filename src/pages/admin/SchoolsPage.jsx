import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Modal, Form, Input } from 'antd';
import { BankOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';

const SchoolsContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const SchoolsPage = () => {
  const [schools, setSchools] = useState([
    { id: 1, code: '1234', name: 'Lycée Victor Hugo', adminCode: '1234_AdminComplex2024!', status: 'actif' },
    { id: 2, code: '5678', name: 'Collège Marie Curie', adminCode: '5678_SecureAdmin2024!', status: 'actif' },
    { id: 3, code: '9012', name: 'Lycée Louis Pasteur', adminCode: '9012_AdminAccess2024!', status: 'inactif' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddSchool = () => {
    form.validateFields().then(values => {
      const newSchool = {
        id: schools.length + 1,
        ...values,
        status: 'actif'
      };
      setSchools([...schools, newSchool]);
      setIsModalVisible(false);
      form.resetFields();
      message.success('École ajoutée avec succès');
    });
  };

  const handleDeleteSchool = (schoolId) => {
    setSchools(schools.filter(school => school.id !== schoolId));
    message.success('École supprimée avec succès');
  };

  const handleToggleStatus = (schoolId) => {
    setSchools(schools.map(school => {
      if (school.id === schoolId) {
        const newStatus = school.status === 'actif' ? 'inactif' : 'actif';
        message.success(`Statut de l'école ${school.name} mis à jour`);
        return { ...school, status: newStatus };
      }
      return school;
    }));
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code Admin',
      dataIndex: 'adminCode',
      key: 'adminCode',
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type={record.status === 'actif' ? 'default' : 'primary'}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === 'actif' ? 'Désactiver' : 'Activer'}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSchool(record.id)}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MobileLayout>
      <SchoolsContainer>
        <Header>
          <h2>Gestion des écoles</h2>
        </Header>
        <Card>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            Ajouter une école
          </Button>
          <Table
            columns={columns}
            dataSource={schools}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <Modal
          title="Ajouter une école"
          visible={isModalVisible}
          onOk={handleAddSchool}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="code"
              label="Code de l'école"
              rules={[{ required: true, message: 'Veuillez entrer le code de l\'école' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nom de l'école"
              rules={[{ required: true, message: 'Veuillez entrer le nom de l\'école' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="adminCode"
              label="Code administrateur"
              rules={[{ required: true, message: 'Veuillez entrer le code administrateur' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </SchoolsContainer>
    </MobileLayout>
  );
};

export default SchoolsPage; 