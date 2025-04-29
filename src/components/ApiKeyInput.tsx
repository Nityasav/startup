import { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { initializeOpenAI } from '@/services/openai';
// API KEY IS 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
interface ApiKeyInputProps {
  onApiKeySubmit: (isValid: boolean) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize OpenAI client with the provided API key
      initializeOpenAI(apiKey);
      
      // In a real app, we would validate the API key by making a test request
      // For demo purposes, we'll just accept any non-empty key
      onApiKeySubmit(true);
    } catch (err) {
      console.error('Error initializing OpenAI:', err);
      setError('Invalid API key or error connecting to OpenAI');
      onApiKeySubmit(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  const useTestKey = () => {
    // Use a placeholder for the button, but in a real app you would use an actual demo key
    setApiKey('fakekey123');
        setError(null);
  };
  return (
    <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl overflow-hidden border border-blue-900/30 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Connect to OpenAI</h2>
        <p className="text-slate-300">
          Enter your OpenAI API key to enable the AI agents in this demo. 
          Your key is not stored on our servers and is only used for this session.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-1">
            OpenAI API Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="pl-10 pr-10 py-2 w-full bg-slate-800 text-white rounded-lg border border-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={toggleShowApiKey}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showApiKey ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
              )}
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
        
        <div className="flex justify-between">
          <button 
            type="button"
            onClick={useTestKey}
            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
          >
            Use Demo Key
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isLoading ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isLoading ? 'Connecting...' : 'Connect to OpenAI'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-xs text-slate-400 border-t border-slate-800 pt-4">
        <p>
          Need an OpenAI API key? Visit <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI's dashboard</a> to create one.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput; 