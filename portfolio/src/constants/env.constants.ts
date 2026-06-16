declare const process: {
  env: {
    REACT_APP_API_BASE_URL?: string;
  };
};

export default {
  API_BASE_URL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
};