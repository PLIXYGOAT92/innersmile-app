import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { validateSchoolCode } from '../services/schoolCodeService';
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

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 20px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px !important;
  color: #722ed1 !important;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-input-affix-wrapper {
    border-radius: 10px;
    padding: 8px 11px;
  }

  .ant-btn {
    height: 40px;
    border-radius: 10px;
    font-weight: 500;
  }
`;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const validationResult = await validateSchoolCode(values.schoolCode);
      if (validationResult.isValid) {
        sessionStorage.setItem('schoolCode', values.schoolCode);
        sessionStorage.setItem('username', values.username);
        message.success('Connexion réussie !');
        navigate('/groups');
      } else {
        message.error(validationResult.message);
      }
    } catch (error) {
      message.error('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout>
      <LoginContainer>
        <StyledCard>
          <StyledTitle level={2}>InnerSmile</StyledTitle>
          <StyledForm
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="schoolCode"
              rules={[
                { required: true, message: 'Veuillez entrer le code de l\'école' },
                { pattern: /^[A-Za-z0-9]+$/, message: 'Le code doit contenir uniquement des lettres et des chiffres' }
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Code de l'école"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Veuillez entrer votre nom d\'utilisateur' },
                { min: 3, message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nom d'utilisateur"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
              >
                Se connecter
              </Button>
            </Form.Item>
          </StyledForm>
        </StyledCard>
      </LoginContainer>
    </MobileLayout>
  );
};

export default LoginPage; 