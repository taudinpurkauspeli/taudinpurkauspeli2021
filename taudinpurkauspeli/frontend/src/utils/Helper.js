import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getConfig = () => ({ headers: { Authorization: token } });

export const getLanguage = () => (localStorage.getItem('i18nextLng') || 'fi');

export const validateName = () => {
  const { t } = useTranslation();

  return (
    Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired'))
  );
};

export const validatePriority = () => {
  const { t } = useTranslation();

  return (
    Yup.number()
      .typeError(t('warningPositiveInteger'))
      .required(t('warningRequired'))
      .positive(t('warningPositiveInteger'))
      .integer(t('warningPositiveInteger'))
  );
};
