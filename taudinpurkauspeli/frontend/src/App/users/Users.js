import React from 'react';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('userInformation')}</h2>
    </div>
  );
};

export default Users;
