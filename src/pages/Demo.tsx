import { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageSquare, BarChart, CheckCircle, AlertCircle, Send, RefreshCw } from "lucide-react";
import { generateAIResponse, analyzeConversation } from "@/services/openai";
import ApiKeyInput from "@/components/ApiKeyInput";

// Fallback greeting in case API fails
const FALLBACK_GREETING = "Hello! Welcome to OrchestrAI support. How can I help you today?";

const Demo = () => {
  const [stage, setStage] = useState("setup"); // "setup", "chat", "analysis", "approval", "complete"
  const [conversation, setConversation] = useState<Array<{role: string, message: string}>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [approved, setApproved] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize conversation with greeting after API key is provided
  useEffect(() => {
    if (isApiKeyValid && conversation.length === 0) {
      // Start with AI greeting
      setIsTyping(true);
      
      // Try to get AI response, or use fallback
      generateAIResponse([])
        .then(response => {
          setConversation([{ role: "assistant", message: response }]);
        })
        .catch(error => {
          console.error("Error getting initial greeting:", error);
          setConversation([{ role: "assistant", message: FALLBACK_GREETING }]);
        })
        .finally(() => {
          setIsTyping(false);
        });
    }
  }, [isApiKeyValid, conversation.length]);
  
  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  
  // Handle API key submission
  const handleApiKeySubmit = (isValid: boolean) => {
    setIsApiKeyValid(isValid);
    if (isValid) {
      setStage("chat");
    }
  };
  
  // Get AI response using OpenAI
  const getAIResponse = async () => {
    setIsTyping(true);
    
    try {
      const response = await generateAIResponse(conversation);
      setConversation(prev => [...prev, { role: "assistant", message: response }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setConversation(prev => [
        ...prev, 
        { 
          role: "assistant", 
          message: "I'm sorry, I'm having trouble connecting to my language model. Please try again later." 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || isTyping) return;
    
    // Create the updated conversation with the new message
    const updatedConversation = [...conversation, { role: "user", message: newMessage }];
    
    // Update state with the new conversation
    setConversation(updatedConversation);
    setNewMessage("");
    
    // Use the updated conversation (not the state) for the AI response
    setIsTyping(true);
    generateAIResponse(updatedConversation)
      .then(response => {
        setConversation(prev => [...prev, { role: "assistant", message: response }]);
      })
      .catch(error => {
        console.error("Error getting AI response:", error);
        setConversation(prev => [
          ...prev, 
          { 
            role: "assistant", 
            message: "I'm sorry, I'm having trouble connecting to my language model. Please try again later." 
          }
        ]);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };
  
  // Move to analysis stage
  const handleFinishChat = async () => {
    setIsTyping(true);
    
    try {
      // Use OpenAI to analyze the conversation
      const analysisResults = await analyzeConversation(conversation);
      setAnalysis(analysisResults);
      setStage("analysis");
    } catch (error) {
      console.error("Error analyzing conversation:", error);
      // Show an error message to the user
      alert("There was an error analyzing the conversation. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };
  
  // Handle approval decision
  const handleApproval = (isApproved: boolean) => {
    setApproved(isApproved);
    
    // In a real implementation, this would save to a database or trigger further actions
    setTimeout(() => {
      setStage("complete");
    }, 1000);
  };
  
  // Reset the demo
  const resetDemo = () => {
    setConversation([]);
    setNewMessage("");
    setAnalysis(null);
    setApproved(null);
    setFeedback("");
    setStage("chat");
    
    // Initialize with AI greeting
    setIsTyping(true);
    generateAIResponse([])
      .then(response => {
        // Set the complete conversation with the greeting
        setConversation([{ role: "assistant", message: response }]);
      })
      .catch(() => {
        setConversation([{ role: "assistant", message: FALLBACK_GREETING }]);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-blue-900/30 bg-black">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">OrchestrAI Workflow Demo</h1>
            <div className="flex items-center gap-4">
              <div className="px-4 py-1 bg-blue-900/20 rounded-full text-blue-400 text-sm">
                Demo Mode
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container py-8">
        {/* API Key Setup Stage */}
        {stage === "setup" && (
          <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
        )}
        
        {/* Workflow visualization (only show after setup) */}
        {stage !== "setup" && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stage === "chat" ? "bg-blue-600" : "bg-blue-900"}`}>
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className={`mt-2 text-sm ${stage === "chat" ? "text-blue-400" : "text-slate-400"}`}>Customer Service AI</span>
              </div>
              
              <div className="flex-1 h-1 mx-2 bg-blue-900/30">
                <div className={`h-full bg-blue-600 transition-all ${stage === "chat" ? "w-0" : "w-full"}`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stage === "analysis" ? "bg-blue-600" : stage === "chat" ? "bg-blue-900/30" : "bg-blue-900"}`}>
                  <BarChart className="h-5 w-5 text-white" />
                </div>
                <span className={`mt-2 text-sm ${stage === "analysis" ? "text-blue-400" : "text-slate-400"}`}>Data Analysis AI</span>
              </div>
              
              <div className="flex-1 h-1 mx-2 bg-blue-900/30">
                <div className={`h-full bg-blue-600 transition-all ${stage === "chat" || stage === "analysis" ? "w-0" : "w-full"}`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stage === "approval" || stage === "complete" ? "bg-blue-600" : "bg-blue-900/30"}`}>
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className={`mt-2 text-sm ${stage === "approval" || stage === "complete" ? "text-blue-400" : "text-slate-400"}`}>Human Approval</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Chat Interface */}
        {stage === "chat" && (
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl overflow-hidden border border-blue-900/30">
            <div className="bg-slate-800 p-4 border-b border-blue-900/30">
              <h2 className="text-white font-medium">Customer Support Chat</h2>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "assistant" 
                        ? "bg-slate-800 text-white" 
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-slate-800 text-white">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t border-blue-900/30">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 border border-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                  disabled={!newMessage.trim() || isTyping}
                >
                  <span>Send</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            <div className="p-4 border-t border-blue-900/30 bg-slate-800">
              <div className="flex justify-between items-center">
                <div className="text-slate-400 text-sm">
                  {conversation.length > 1 ? `${conversation.length - 1} messages exchanged` : "Start the conversation"}
                </div>
                <button 
                  onClick={handleFinishChat}
                  disabled={conversation.length < 3 || isTyping}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    conversation.length < 3 || isTyping
                      ? "bg-slate-700 text-slate-400"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <span>Finish Chat & Analyze</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Analysis Interface */}
        {stage === "analysis" && analysis && (
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl overflow-hidden border border-blue-900/30">
            <div className="bg-slate-800 p-4 border-b border-blue-900/30">
              <h2 className="text-white font-medium">Data Analysis Results</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Conversation Summary</h3>
                <p className="text-slate-300">{analysis.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Overall Sentiment</h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        analysis.sentiment === "positive" 
                          ? "bg-green-500" 
                          : analysis.sentiment === "neutral" 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-white capitalize">{analysis.sentiment}</span>
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Key Topics Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyPhrases.map((phrase: string, idx: number) => (
                      <span key={idx} className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-md text-sm">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Conversation Transcript</h3>
                <div className="bg-slate-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                  {conversation.map((msg, idx) => (
                    <div key={idx} className="mb-2">
                      <span className={`font-medium ${msg.role === "assistant" ? "text-blue-400" : "text-green-400"}`}>
                        {msg.role === "assistant" ? "Support AI: " : "Customer: "}
                      </span>
                      <span className="text-slate-300">{msg.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-blue-900/30 bg-slate-800">
              <div className="flex justify-end">
                <button 
                  onClick={() => setStage("approval")}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <span>Send for Human Approval</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Approval Interface */}
        {stage === "approval" && analysis && (
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl overflow-hidden border border-blue-900/30">
            <div className="bg-slate-800 p-4 border-b border-blue-900/30">
              <h2 className="text-white font-medium">Human Approval Required</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Analysis Summary</h3>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-300">{analysis.summary}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Provide Feedback (Optional)</h3>
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter any corrections or additional insights..."
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
                ></textarea>
              </div>
              
              <div>
                <h3 className="text-white text-lg font-medium mb-4">Decision</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleApproval(true)}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Approve Analysis</span>
                  </button>
                  
                  <button 
                    onClick={() => handleApproval(false)}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <span>Reject & Request Revision</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Completion Screen */}
        {stage === "complete" && (
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl overflow-hidden border border-blue-900/30 text-center p-8">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${approved ? "bg-green-600" : "bg-red-600"}`}>
              {approved ? (
                <CheckCircle className="h-10 w-10 text-white" />
              ) : (
                <AlertCircle className="h-10 w-10 text-white" />
              )}
            </div>
            
            <h2 className="text-white text-2xl font-medium mb-2">
              {approved ? "Analysis Approved" : "Analysis Rejected"}
            </h2>
            
            <p className="text-slate-300 mb-8">
              {approved 
                ? "The conversation analysis has been approved and stored. The insights will be used to improve customer service." 
                : "The analysis has been rejected and sent back for revision. Your feedback has been recorded."
              }
            </p>
            
            {feedback && (
              <div className="bg-slate-800 p-4 rounded-lg mb-8 text-left">
                <h3 className="text-white font-medium mb-2">Provided Feedback:</h3>
                <p className="text-slate-300">{feedback}</p>
              </div>
            )}
            
            <button 
              onClick={resetDemo}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-6 py-3 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Start New Demo</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Demo; 