import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { testSupabaseConnection } from './lib/supabase';
import { environment } from './lib/environment';

// Log environment info to help with debugging deployment issues
console.log('App environment:', environment.NODE_ENV);
console.log('Base URL:', environment.BASE_URL);

// Test Supabase connection on startup (doesn't block rendering)
testSupabaseConnection().then(connected => {
  if (connected) {
    console.log('Supabase connection successful');
  } else {
    console.error('Failed to connect to Supabase. Check your environment variables.');
  }
});

// Error handling for the entire app
const handleError = (error: Error) => {
  console.error('App Error:', error);
  // You could also send to an error tracking service here
};

// Create container for React
const container = document.getElementById('root');

// Ensure container exists
if (!container) {
  console.error('Root element not found. Check your HTML.');
} else {
  try {
    const root = createRoot(container);
    
    // Wrap app in error boundary (StrictMode in dev)
    if (environment.IS_DEVELOPMENT) {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      root.render(<App />);
    }
  } catch (error) {
    handleError(error as Error);
    // Show a friendly error message instead of a blank screen
    container.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>The application couldn't load properly. Please try refreshing the page.</p>
        <button onclick="window.location.reload()">Refresh Page</button>
      </div>
    `;
  }
}
