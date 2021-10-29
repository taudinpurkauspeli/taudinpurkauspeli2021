import React from 'react';
import { useTranslation } from 'react-i18next';

const HowToPlay = () => {
  const { t } = useTranslation();

  return (
    <div id="wrapper">
      <h2>{t('howToPlay')}</h2>
      <p>{t('gameInstructions')}</p>
    </div>
  );
};

export default HowToPlay;