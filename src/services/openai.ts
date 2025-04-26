import OpenAI from 'openai';

// Initialize OpenAI client
// Note: In production, the API key should be stored in environment variables
let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Only for demo purposes
  });
  return openai;
};

export const getOpenAIClient = () => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Call initializeOpenAI first.');
  }
  return openai;
};

// Customer Service AI function
export const generateAIResponse = async (conversation: Array<{ role: string; message: string }>) => {
  try {
    const openaiClient = getOpenAIClient();
    
    // Format conversation for OpenAI - create a proper copy
    const messages = conversation.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.message
    }));
    
    // Add system prompt to guide the AI's behavior
    messages.unshift({
      role: 'system',
      content: 'You are a helpful customer support agent for OrchestrAI, a platform that connects multiple AI agents into automated workflows for businesses. Be professional, friendly, and concise. Provide useful information about our product, pricing (starts at $499/month), and technical capabilities.'
    });
    
    console.log('Sending to OpenAI:', JSON.stringify(messages)); // Debug log
    
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      max_tokens: 250, // Increased from 150 to allow for more detailed responses
      temperature: 0.7,
    });
    
    const responseText = response.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this time.';
    console.log('Received from OpenAI:', responseText); // Debug log
    
    return responseText;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, there was an error processing your request. Please try again later.';
  }
};

// Data Analysis AI function
export const analyzeConversation = async (conversation: Array<{ role: string; message: string }>) => {
  try {
    const openaiClient = getOpenAIClient();
    
    // Join conversation messages into a single text
    const conversationText = conversation
      .map(msg => `${msg.role === 'assistant' ? 'Support Agent' : 'Customer'}: ${msg.message}`)
      .join('\n');
    
    // Create a prompt for analysis
    const analysisPrompt = [
      {
        role: 'system',
        content: `You are an advanced conversation analysis AI that specializes in customer service interactions. 
        Analyze the conversation for sentiment, key topics, and provide a brief summary. 
        Format your response as a JSON object with the following structure:
        {
          "sentiment": "positive|neutral|negative",
          "keyPhrases": ["topic1", "topic2", "topic3"],
          "summary": "A concise summary of the conversation and what the customer needs"
        }`
      },
      {
        role: 'user',
        content: `Analyze this customer service conversation:\n\n${conversationText}`
      }
    ];
    
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: analysisPrompt as any,
      max_tokens: 500,
      temperature: 0.3,
    });
    
    const content = response.choices[0]?.message?.content || '';
    
    // Extract the JSON part
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from OpenAI');
    }
    
    // Parse the JSON
    const analysisResult = JSON.parse(jsonMatch[0]);
    
    // Add timestamp
    analysisResult.timestamp = new Date().toISOString();
    
    return analysisResult;
  } catch (error) {
    console.error('Error analyzing conversation:', error);
    // Fallback to a default analysis
    return {
      sentiment: 'neutral',
      keyPhrases: ['error processing'],
      summary: 'There was an error analyzing this conversation. Please try again.',
      timestamp: new Date().toISOString()
    };
  }
}; 