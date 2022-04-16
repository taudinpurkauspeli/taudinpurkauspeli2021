import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const phantom = {
    display: 'block',
    padding: '40px',
    height: '60px',
    width: '100%',
  };

  return (
    <div>
      <div style={phantom} />
      <div className="footer">
        <hr />
        <Link to="/privacy" style={{ color: 'black' }}>{t('privacyNotice')}</Link>
      </div>
    </div>
  );
};

export default Footer;
