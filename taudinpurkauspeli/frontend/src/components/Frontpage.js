import React from 'react';
import { useTranslation } from 'react-i18next';

const Frontpage = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('frontpage_title')}</h2>
      <p>{t('frontpage_text')}</p>
    </div>
  );
};

export default Frontpage;
