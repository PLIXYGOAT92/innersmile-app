import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';
import LoginPage from './pages/LoginPage';
import GroupsPage from './pages/GroupsPage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import AdminPage from './pages/AdminPage';
import HelpButton from './components/HelpButton';

const App = () => {
  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: '#722ed1',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/chat/:groupId" element={<ChatPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <HelpButton />
      </Router>
    </ConfigProvider>
  );
};

export default App;
