declare const process: {
  env: {
    REACT_APP_API_BASE_URL?: string;
  };
};


export default {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api',

  PORTFOLIO_WEB_BASE_URL:
    import.meta.env.VITE_PORTFOLIO_WEB_BASE_URL ||
    'http://localhost:5174',

  PORTFOLIO_MANAGEMENT_BASE_URL:
    import.meta.env.VITE_PORTFOLIO_MANAGEMENT_BASE_URL ||
    'http://localhost:5173',
};
