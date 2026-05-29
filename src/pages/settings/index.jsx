import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from '../../components/settings/SettingsLayout';
import Profile from './Profile';
import Security from './Security';
import Verification from './Verification';

const Settings = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('profile');

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'security':
        return <Security />;
      case 'verification':
        return <Verification />;
      default:
        return <Profile />;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <SettingsLayout
      activePage={activePage}
      onPageChange={setActivePage}
      onBack={handleBack}
    >
      {renderPage()}
    </SettingsLayout>
  );
};

export default Settings;