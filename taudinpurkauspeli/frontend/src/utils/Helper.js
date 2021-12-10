let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getConfig = () => ({ headers: { Authorization: token } });
