/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('userProfile')}</h2>
    </div>
  );
};

export default Profile;
