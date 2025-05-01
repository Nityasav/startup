// Handle environment variables in both development and production
const getEnvironmentVariable = (key: string): string => {
  // For Vite, environment variables are prefixed with VITE_
  const value = import.meta.env[key] || import.meta.env[`VITE_${key}`];
  
  if (!value && process.env.NODE_ENV === 'development') {
    console.warn(`Missing environment variable: ${key}`);
  }
  
  return value || '';
};

export const environment = {
  // Supabase
  SUPABASE_URL: getEnvironmentVariable('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvironmentVariable('SUPABASE_ANON_KEY'),
  
  // App environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  
  // Base URL
  BASE_URL: import.meta.env.BASE_URL || '/',
  
  // Deployment URL - useful for OG images, etc.
  DEPLOYMENT_URL: getEnvironmentVariable('DEPLOYMENT_URL') || 'https://venturly.ca'
}; 