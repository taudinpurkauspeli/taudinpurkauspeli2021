/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';

const HowToPlay = () => {
  /* istanbul ignore next */
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('howToPlay')}</h2>
    </div>
  );
};

export default HowToPlay;
