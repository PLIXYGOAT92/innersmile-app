import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Modal, Form, Input, message } from 'antd';
import styled from 'styled-components';
import { PlusOutlined, EditOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import { schoolCodes as initialSchoolCodes } from '../config/schoolCodes';

const { Title, Text } = Typography;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f5f5f5;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
`;

const Header = styled.div`
  background-color: #FF69B4;
  color: white;
  padding: 20px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppTitle = styled(Title)`
  color: white !important;
  margin: 0 !important;
  font-size: 24px !important;
  text-align: center;
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SchoolCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SchoolHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SchoolTitle = styled(Title)`
  margin: 0 !important;
  font-size: 18px !important;
`;

const SchoolInfo = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const AddButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #FF69B4;
  border-color: #FF69B4;

  &:hover {
    background-color: #ff4ba8;
    border-color: #ff4ba8;
  }
`;

const AdminPage = () => {
  const [schoolCodes, setSchoolCodes] = useState(initialSchoolCodes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleAdd = () => {
    setEditingCode(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (code) => {
    const school = schoolCodes[code];
    setEditingCode(code);
    form.setFieldsValue({
      code,
      name: school.name,
      city: school.city,
      active: school.active,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (code) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer ce code école ?',
      okText: 'Oui',
      cancelText: 'Non',
      onOk: () => {
        const newCodes = { ...schoolCodes };
        delete newCodes[code];
        setSchoolCodes(newCodes);
        message.success('Code école supprimé avec succès');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newCodes = { ...schoolCodes };
      if (editingCode) {
        delete newCodes[editingCode];
      }
      newCodes[values.code] = {
        name: values.name,
        city: values.city,
        active: values.active,
        createdAt: editingCode ? schoolCodes[editingCode].createdAt : new Date().toISOString().split('T')[0],
      };
      setSchoolCodes(newCodes);
      setIsModalVisible(false);
      message.success(editingCode ? 'Code école modifié avec succès' : 'Code école ajouté avec succès');
    });
  };

  return (
    <PageContainer>
      <Header>
        <AppTitle level={3}>Administration</AppTitle>
        <Button 
          type="text" 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
          style={{ color: 'white' }}
        >
          Déconnexion
        </Button>
      </Header>

      <ContentContainer>
        {Object.entries(schoolCodes).map(([code, school]) => (
          <SchoolCard key={code}>
            <SchoolHeader>
              <SchoolTitle level={4}>{school.name}</SchoolTitle>
              <ActionButtons>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(code)}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(code)}
                />
              </ActionButtons>
            </SchoolHeader>
            <SchoolInfo>Code : {code}</SchoolInfo>
            <SchoolInfo>Ville : {school.city}</SchoolInfo>
            <SchoolInfo>Statut : {school.active ? 'Actif' : 'Inactif'}</SchoolInfo>
          </SchoolCard>
        ))}
      </ContentContainer>

      <AddButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
      />

      <Modal
        title={editingCode ? 'Modifier le code école' : 'Ajouter un code école'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingCode ? 'Modifier' : 'Ajouter'}
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: 'Veuillez entrer un code' }]}
          >
            <Input disabled={!!editingCode} placeholder="Ex: 1234" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nom de l'école"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l\'école' }]}
          >
            <Input placeholder="Ex: Lycée Victor Hugo" />
          </Form.Item>
          <Form.Item
            name="city"
            label="Ville"
            rules={[{ required: true, message: 'Veuillez entrer la ville' }]}
          >
            <Input placeholder="Ex: Paris" />
          </Form.Item>
          <Form.Item
            name="active"
            valuePropName="checked"
          >
            <Input type="checkbox" /> École active
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AdminPage; 