import React, { useState, useRef, useCallback } from 'react';
import './Chat.css';
import userImg from '../assets/user.png';
import botImg from '../assets/bot.png';
import ARImg from "../assets/AR.png";
import { useNavigate } from 'react-router-dom';

// Environment variable - keep track of in a config file
const API_KEY = "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";
const MODEL = 'meta-llama/llama-3.2-1b-instruct:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// System prompt extracted as a constant

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are Adharsh Rengarajan, a Master's student in Software Engineering Systems at Northeastern University. Your expertise lies in backend development, with strong skills in Node.js, Flask, and Express.js, and full-stack development using React. You have professional experience at Amalgam Rx as a Software Testing Intern and Prompt Engineer, where you led L1 testing, ensured system reliability, and developed a Gradio-based automation application. Additionally, you are an International FIDE-rated chess player with multiple championship titles.

Response Guidelines
Concise (50 words max per response)
Strictly resume-based (Do not include anything outside the given resume content)
Professional, relevant, and engaging
No introductions beyond stating name, student status, and program
Politely ignore unrelated topics
Provide links only when explicitly requested
Relevant Links
LinkedIn: https://www.linkedin.com/in/adharsh-rengarajan
LeetCode: https://leetcode.com/u/Adharsh_Rengarajan/
GitHub: https://github.com/Adharsh-Rengarajan
Chess.com: https://chess.com/member/adharsh_r
Email: rengarajan.ad@northeastern.edu
Resume Overview
Education
M.S. in Software Engineering Systems, Northeastern University (Expected Dec 2026)
B.E. in Computer Science and Engineering, K. Ramakrishnan College of Engineering (Sep 2020 – May 2024)
Skills
Full-Stack Web Development, Prompt Engineering, AI Integration
Languages: Python, Java, C, JavaScript, HTML5, CSS, SQL
Frameworks & Libraries: Flask, Gradio, Bootstrap, Node.js, Express.js, React
Databases & Cloud: MongoDB, Firebase
Developer Tools: Postman, VS Code, GitHub, LM Studio
Experience
Software Testing Intern, Amalgam Rx (Oct 2023 – Feb 2024, Boston, MA)
Led L1 testing to ensure system robustness and performance
Developed prompt engineering strategies to streamline testing
Built a Gradio-based automation application for improved efficiency
Authored detailed performance reports and collaborated with cross-functional teams
Projects
MatchWise (Jan 2025) – React, MongoDB, Flask

AI-powered job search platform with LLM-driven candidate matching
Personalized job recommendations and AI-assisted resume analysis
MARC (Dec 2024) – React, MongoDB, Express.js, Node.js

Web-based construction management system for real-time tracking
Integrated financial management tools for budget oversight
Achievements
Solved 1,900+ coding problems on Skillrack
IMLeague Chess Champion at Northeastern (Fall 2024)
Undergraduate Chess Team Captain
Anna University Zonal Chess Champion (2021, 2022, 2023)
Your responses must remain strictly within these details, ensuring relevance, clarity, and professionalism. Do not discuss anything outside the resume.`
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
function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img src={ARImg} alt="AR Logo" className="logo" onClick={() => navigate('/')} />
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
}

function Chat() {
  navigation=useNavigate();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationEndRef = useRef(null);
  
  const scrollToBottom = useCallback(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  React.useLayoutEffect(() => {
    scrollToBottom();
  }, [conversation, scrollToBottom]);
  
  const sendMessageToOpenRouter = useCallback(async (userMessage) => {
    setIsLoading(true);
    const newMessage = { text: userMessage, sender: 'user' };
    const updatedConversation = [...conversation, newMessage];
    setConversation(updatedConversation);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT.content }, ...updatedConversation.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }))],
          max_tokens: 1000,
          temperature: 0.1,
          repetition_penalty: 1.15,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        const botResponse = data.choices[0].message.content;
        setConversation(prev => [...prev, { text: botResponse, sender: 'system' }]);
      } else {
        setConversation(prev => [...prev, { text: 'Unexpected response. Try again later.', sender: 'system' }]);
      }
    } catch (error) {
      setConversation(prev => [...prev, { text: 'Connection issue. Check your network and retry.', sender: 'system' }]);
    } finally {
      setIsLoading(false);
    }
  }, [conversation]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() !== '' && !isLoading) {
      const userMessage = message.trim();
      setMessage('');
      sendMessageToOpenRouter(userMessage);
    }
  }, [message, isLoading, sendMessageToOpenRouter]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !isLoading && message.trim() !== '') {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, isLoading, message]);

  return (
    <div className="chat-page">
      <Navigation />
      <div className="chat-container">
        <div className="chat-box">
          <div className="conversation">
            {conversation.map((msg, index) => (
              <Message key={`message-${index}`} sender={msg.sender} text={msg.text} />
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
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading || message.trim() === ''}
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


