import React from 'react';
import { useTranslation } from 'react-i18next';

const FileBank = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('fileBank')}</h2>
    </div>
  );
};

export default FileBank;
