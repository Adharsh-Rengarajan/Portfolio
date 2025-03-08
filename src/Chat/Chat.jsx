import React, { useState, useRef, useCallback } from 'react';
import './Chat.css';
import userImg from '../assets/user.png';
import botImg from '../assets/bot.png';

// Environment variable - keep track of in a config file
const API_KEY = "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";
const MODEL = 'google/gemini-2.0-flash-lite-preview-02-05:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// System prompt extracted as a constant

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are Adharsh Rengarajan, a software engineering graduate student at Northeastern University, specializing in backend development. You have expertise in Node.js, Flask, and Express.js, with experience in full-stack development using React. You have worked at Amalgam Rx as a software testing intern and prompt engineer, leading L1 testing, ensuring system reliability, and building a Gradio-based automation application. You are also an International FIDE-rated chess player. Don't reveal anything in introduction except your name and you are student from Northeastern University and doing a Masters in Software Engineering Systems. 

  Your goal is to explain your profile concisely—within 50 words per response. Do not engage in unrelated topics; politely ignore them. Provide links only if asked:
  
  LinkedIn: https://www.linkedin.com/in/adharsh-rengarajan  
  LeetCode: https://leetcode.com/u/Adharsh_Rengarajan/  
  GitHub: https://github.com/Adharsh-Rengarajan  
  Chess.com: https://chess.com/member/adharsh_r  
  Email: rengarajan.ad@northeastern.edu  

Your Resume  
 EDUCATION
 Master of Science, Northeastern University
 Software Engineering Systems
 Bachelor of Engineering , K.Ramakrishnan College of Engineering
 Computer Science and Engineering
 SKILLS
 Expected Dec 2026
 Sep 2020- May 2024
 Technical Skills
 Languages
 Frameworks and Libraries
 Databases and Cloud
 Developer Tools
 EXPERIENCE
 Full-Stack Web Development, Prompt Engineering, AI Integration
 Python, Java, C, JavaScript, HTML5, CSS, SQL
 Flask, Gradio, Bootstrap, Node.js, Express.js, React
 MongoDB, Firebase
 Postman, VS Code, GitHub, LM Studio
 Amalgam Rx
 Software Testing Intern
 Oct 2023- Feb 2024
 Boston, MA
 • Executed comprehensive testing across various software models, enhancing system reliability and performance.
 • Led L1 testing, ensuring robust functionality and strict adherence to specifications.
 • Authored detailed reports documenting performance metrics and improvements.
 • Developed and fine-tuned prompts to streamline testing processes, driving process efficiency.
 • Collaborated with cross-functional teams to refine prompts in alignment with evolving project demands.
 • Engineered a Gradio-based automation application, significantly boosting testing efficiency.
 PROJECTS
 MatchWise Jan 2025- React, MongoDB, Flask
 • Engineered MatchWise, an AI-driven job search platform, leveraging Generative AI and Large Language Models
 to intelligently match students and hiring managers through comprehensive resume and job description analysis.
 • Implemented personalized job recommendation features, enabling candidates to receive tailored content aligned
 with their interests and career objectives.
 • Developed AI-driven candidate matching algorithms for recruiters, facilitating the identification of highly suitable
 candidates based on detailed resume content and job requirements.
 MARC Dec 2024- React, MongoDB, Express.js, Node.js
 • Developed a comprehensive web-based platform, MARC, to streamline construction workflows by providing a
 centralized system for tracking and analyzing activities, thereby reducing administrative workload.
 • Architected real-time project tracking dashboards and automated communication workflows, enhancing collabora
tion between contractors, project managers, and stakeholders.
 • Integrated financial management tools, including budgeting, cost management, and cash flow management, to
 improve budget oversight and procurement efficiency within construction projects
  **Achievements:**  
  - Solved 1,900+ coding problems on Skillrack  
  - IMLeague Chess Champion on Northeastern university in Fall 2024
  - Undergraduate college chess team captain
  - Won the Anna University Zonal Chess Champions in 2021, 2022, 2023

  Keep responses professional, engaging, and strictly relevant to your profile. Pick the points from the resume and don't speak anything apart from it.`
};

// Message component extracted for better organization
const Message = ({ sender, text, isLoading = false }) => (
  <div className={`message-container ${sender === 'user' ? 'user-message' : 'system-message'}`}>
    <img src={sender === 'user' ? userImg : botImg} alt={sender} />
    <div className="message">
      {isLoading ? (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        text
      )}
    </div>
  </div>
);

// Navigation component extracted
const Navigation = () => (
  <nav className="navbar">
    <h1 className="logo">My Portfolio</h1>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#education">Education & Experience</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="chat">Chat</a></li>
    </ul>
  </nav>
);

function Chat() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationEndRef = useRef(null);
  
  // Memoized scroll to bottom function
  const scrollToBottom = useCallback(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  // Effect for auto-scrolling - using layoutEffect for synchronous measurement
  React.useLayoutEffect(() => {
    scrollToBottom();
  }, [conversation, scrollToBottom]);

  // Format messages for the API - memoized for performance
  const formatMessages = useCallback((messages) => {
    return messages.map(msg => ({
      role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
      content: msg.content || msg.text
    }));
  }, []);

  // Send message to OpenRouter API
  const sendMessageToOpenRouter = useCallback(async (userMessage) => {
    setIsLoading(true);
    
    // Create new conversation array with user message
    const newMessage = { text: userMessage, sender: 'user' };
    const isFirstMessage = conversation.length === 0;
    
    // Create a new array instead of modifying the existing one
    const updatedConversation = isFirstMessage 
      ? [newMessage] // We'll handle system prompt separately in API call
      : [...conversation, newMessage];
    
    // Update state immediately for UI feedback
    setConversation(updatedConversation);
    
    try {
      // Prepare messages for API - handle system prompt specially
      const apiMessages = formatMessages(updatedConversation);
      if (isFirstMessage) {
        apiMessages.unshift(SYSTEM_PROMPT);
      }
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          max_tokens: 1000,
          temperature: 0.3,
          repetition_penalty:1.15
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error);
        let errorMessage = "Error communicating with AI.";
        if (data.error.code === 502) {
          errorMessage = "Service temporarily unavailable. Try again later.";
        }
        setConversation(prev => [...prev, { text: errorMessage, sender: 'system' }]);
        return;
      }

      // Extract and add bot response to conversation
      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].message.content;
        setConversation(prev => [...prev, { text: botResponse, sender: 'system' }]);
      } else {
        console.error("Unexpected response format:", data);
        setConversation(prev => [...prev, { text: "Unexpected response. Try again later.", sender: 'system' }]);
      }
    } catch (error) {
      console.error("Network or API Error:", error);
      setConversation(prev => [...prev, { text: "Connection issue. Check your network and retry.", sender: 'system' }]);
    } finally {
      setIsLoading(false);
    }
  }, [conversation, formatMessages]);

  // Handle send message button click
  const handleSendMessage = useCallback(() => {
    if (message.trim() !== '' && !isLoading) {
      const userMessage = message.trim();
      setMessage(''); // Clear input field immediately for better UX
      sendMessageToOpenRouter(userMessage);
    }
  }, [message, isLoading, sendMessageToOpenRouter]);

  // Handle enter key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !isLoading && message.trim() !== '') {
      e.preventDefault(); // Prevent default to avoid form submission
      handleSendMessage();
    }
  }, [handleSendMessage, isLoading, message]);

  return (
    <div className="chat-page">
      <Navigation />

      <div className="chat-container">
        <div className="chat-box">
          <div className="conversation">
            {conversation.length === 0 && (
              <div className="welcome-message">
                <p>Welcome to the chat! How can I help you today?</p>
              </div>
            )}
            
            {conversation.map((msg, index) => (
              <Message 
                key={`message-${index}`} 
                sender={msg.sender} 
                text={msg.text} 
              />
            ))}
            
            {isLoading && <Message sender="system" isLoading={true} />}
            
            <div ref={conversationEndRef} />
          </div>
          
          <div className="input-area">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isLoading}
              aria-label="Chat message"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading || message.trim() === ''}
              aria-label="Send message"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;