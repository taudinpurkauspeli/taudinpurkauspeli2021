let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getConfig = () => ({ headers: { Authorization: token } });

export const getLanguage = () => (localStorage.getItem('i18nextLng') || 'fi');
