import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Switch } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { validateSchoolCode } from '../services/schoolCodeService';
import { validateAdminCode } from '../services/adminCodeService';
import MobileLayout from '../components/MobileLayout';

const { Title, Text } = Typography;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
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

const LoginForm = styled(Form)`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AdminSwitch = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const LoginButton = styled(Button)`
  background-color: #722ed1;
  border-color: #722ed1;
  height: 40px;
  border-radius: 10px;
  font-weight: 500;

  &:hover {
    background-color: #531dab;
    border-color: #531dab;
  }
`;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const generateRandomUsername = () => {
    const adjectives = ['Cool', 'Super', 'Gentil', 'Sympa', 'Drôle', 'Calme', 'Doux', 'Vif', 'Rapide', 'Lent'];
    const nouns = ['Chat', 'Chien', 'Lion', 'Tigre', 'Ours', 'Loup', 'Renard', 'Aigle', 'Dauphin', 'Panda'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  };

  useEffect(() => {
    const randomUsername = generateRandomUsername();
    setUsername(randomUsername);
    form.setFieldsValue({ username: randomUsername });
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (isAdmin) {
        const validationResult = validateAdminCode(values.schoolCode, values.adminCode);
        if (validationResult.isValid) {
          sessionStorage.setItem('isAdmin', 'true');
          sessionStorage.setItem('schoolCode', values.schoolCode);
          sessionStorage.setItem('username', values.username);
          navigate('/admin');
        } else {
          message.error(validationResult.message);
        }
      } else {
        const validationResult = validateSchoolCode(values.schoolCode);
        if (validationResult.isValid) {
          sessionStorage.setItem('schoolCode', values.schoolCode);
          sessionStorage.setItem('username', values.username);
          navigate('/groups');
        } else {
          message.error(validationResult.message);
        }
      }
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  };

  return (
    <MobileLayout>
      <LoginContainer>
        <Header>
          <StyledTitle level={2}>InnerSmile</StyledTitle>
          <StyledDescription>
            Connectez-vous pour accéder à la plateforme
          </StyledDescription>
        </Header>

        <LoginForm
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <AdminSwitch>
            <Switch
              checked={isAdmin}
              onChange={setIsAdmin}
              checkedChildren="Admin"
              unCheckedChildren="Élève"
            />
          </AdminSwitch>

          <Form.Item
            name="schoolCode"
            label="Code école"
            rules={[{ required: true, message: 'Veuillez entrer le code école' }]}
          >
            <Input placeholder="Entrez le code école" />
          </Form.Item>

          {isAdmin && (
            <Form.Item
              name="adminCode"
              label="Code administrateur"
              rules={[{ required: true, message: 'Veuillez entrer le code administrateur' }]}
            >
              <Input.Password placeholder="Entrez le code administrateur" />
            </Form.Item>
          )}

          <Form.Item
            name="username"
            label={isAdmin ? "Nom d'utilisateur admin" : "Nom d'utilisateur"}
            rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur' }]}
          >
            <Input placeholder={isAdmin ? "Nom d'utilisateur admin" : "Votre nom d'utilisateur"} />
          </Form.Item>

          <Form.Item>
            <LoginButton type="primary" htmlType="submit" block>
              {isAdmin ? 'Connexion Admin' : 'Connexion'}
            </LoginButton>
          </Form.Item>
        </LoginForm>
      </LoginContainer>
    </MobileLayout>
  );
};

export default LoginPage; 