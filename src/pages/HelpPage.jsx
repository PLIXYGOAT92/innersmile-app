import React from 'react';
import { Typography, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background-color: transparent;
  border: none;
  color: white;
  padding: 0;
  height: auto;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HelpCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-head {
    background-color: #f8f8f8;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 12px 12px 0 0;
  }
`;

const HelpSection = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const HelpTitle = styled(Title)`
  color: white !important;
  margin: 0 !important;
  font-size: 20px !important;
  text-align: center;
`;

const SectionTitle = styled(Title)`
  color: #FF69B4 !important;
  margin-bottom: 8px !important;
  font-size: 16px !important;
`;

const HelpText = styled(Text)`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
`;

const HelpPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeftOutlined />
        </BackButton>
        <HelpTitle level={4}>Aide et Support</HelpTitle>
      </Header>

      <ContentContainer>
        <HelpCard>
          <HelpSection>
            <SectionTitle level={5}>À propos d'InnerSmile</SectionTitle>
            <HelpText>
              InnerSmile est une application de soutien psychologique conçue pour les étudiants. 
              Elle offre un espace sûr et anonyme pour discuter de vos préoccupations avec d'autres étudiants 
              qui peuvent comprendre ce que vous traversez.
            </HelpText>
          </HelpSection>
        </HelpCard>

        <HelpCard>
          <HelpSection>
            <SectionTitle level={5}>Comment ça marche ?</SectionTitle>
            <HelpText>
              1. Connectez-vous avec votre code établissement<br />
              2. Choisissez un groupe de discussion qui correspond à vos besoins<br />
              3. Échangez anonymement avec d'autres étudiants<br />
              4. Trouvez du soutien et des conseils bienveillants
            </HelpText>
          </HelpSection>
        </HelpCard>

        <HelpCard>
          <HelpSection>
            <SectionTitle level={5}>Règles de la communauté</SectionTitle>
            <HelpText>
              • Restez respectueux et bienveillant<br />
              • Ne partagez pas d'informations personnelles<br />
              • Évitez tout contenu inapproprié ou offensant<br />
              • Signalez tout comportement inadéquat
            </HelpText>
          </HelpSection>
        </HelpCard>

        <HelpCard>
          <HelpSection>
            <SectionTitle level={5}>Besoin d'aide urgente ?</SectionTitle>
            <HelpText>
              Si vous avez besoin d'une aide immédiate ou si vous traversez une crise :<br /><br />
              • Numéro d'urgence : 112<br />
              • SOS Amitié : 09 72 39 40 50<br />
              • Fil Santé Jeunes : 0800 235 236<br />
              • Service de santé universitaire de votre établissement
            </HelpText>
          </HelpSection>
        </HelpCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default HelpPage; 