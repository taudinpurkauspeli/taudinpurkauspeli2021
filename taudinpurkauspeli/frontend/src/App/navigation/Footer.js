import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <hr />
      <Link to="/privacy" style={{ color: 'black' }}>{t('privacyNotice')}</Link>
    </div>
  );
};

export default Footer;
