/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';

const GuestFrontpage = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('GuestFrontpageTitle')}</h2>
      <p>{t('GuestFrontpageText')}</p>
    </div>
  );
};
export default GuestFrontpage;
