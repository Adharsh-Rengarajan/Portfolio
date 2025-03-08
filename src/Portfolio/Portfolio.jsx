import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import { motion, AnimatePresence  } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MARCImage from "../assets/MARC.jpg";
import MatchWiseImage from "../assets/MatchWise.jpg";
import EchoSenseImage from "../assets/EchoSense.jpg";
import NEUImage from "../assets/neu.png";
import KRCEImage from "../assets/KRCE.png";
import AmalgamImage from "../assets/Amalgam.png";
import PythonIcon from "../assets/python.png";
import JavaIcon from "../assets/java.png";
import JSIcon from "../assets/js.png";
import ReactIcon from "../assets/React.png";
import NodeJSIcon from "../assets/Node JS.png";
import ExpressIcon from "../assets/Express.png";
import ServletsIcon from "../assets/Servlets.png";
import SpringIcon from "../assets/Spring.png";
import FlaskIcon from "../assets/Flask.png";
import MongoDBIcon from "../assets/MongoDB.png";
import DownArrowIcon from "../assets/down-arrow.png";
import EmailIcon from "../assets/email.png";
import LocationIcon from "../assets/placeholder.png";
import GitHubIcon from "../assets/github.png";
import LinkedInIcon from "../assets/linkedin.png";
import LeetCodeIcon from "../assets/Leetcode.png";
import ChessIcon from "../assets/chess.com.png";
import ProfileImage from "../assets/Me.jpg";
import ARLogo from "../assets/AR.png";
import ResumeImage from "../assets/Resume.png"
import { nav } from "framer-motion/client";

const projectsData = [
  {
    id: "marc",
    title: "MARC",
    image: MARCImage,
    description: "MARC is an advanced web-based platform designed to optimize workflow management in the construction industry. It centralizes project tracking, streamlines communication, and reduces administrative burdens for contractors, accounts, and procurement teams. MARC enhances financial oversight, automates approval workflows, and ensures seamless procurement management. With real-time dashboards, workflow automation, and financial tracking, MARC improves decision-making and project efficiency. It integrates Fugu for collaboration, MapBox API for project visualization, and React Chart.js for data insights. Built with React, Node.js, Express, and MongoDB, MARC delivers a scalable, responsive, and user-friendly experience, empowering construction professionals to build smarter and manage better.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux",
      "SCSS"
    ],
    githubLink: "https://github.com/Adharsh-Rengarajan/MARC"
  },
  {
    id: "matchwise",
    title: "MatchWise",
    image: MatchWiseImage,
    description: "MatchWise is an innovative AI-driven job search platform that transforms traditional job matching by leveraging Generative AI and Large Language Models (LLMs). Unlike conventional keyword-based systems, MatchWise conducts deep resume and job description analysis to provide intelligent, personalized matches for both candidates and recruiters. Candidates receive tailored job recommendations, SWOT analysis, and skill assessments, while recruiters gain access to AI-matched candidates and job posting tools. Built with a React frontend, Flask backend, and MongoDB database, MatchWise ensures scalability, security, and seamless user experience. This platform empowers job seekers and hiring managers with data-driven insights for more effective employment connections.",
    techStack: [
      "React",
      "Flask",
      "MongoDB",
      "Generative AI",
      "LLMs"
    ],
    githubLink: "https://github.com/Adharsh-Rengarajan/MatchWise"
  },
  {
    id: "echosense",
    title: "EchoSense",
    image: EchoSenseImage,
    description: "EchoSense-Predictive-Analytics is a cutting-edge AI-powered system designed to analyze ECG data and predict potential cardiac conditions with high accuracy. This project leverages supervised machine learning to classify various heart conditions and generate actionable insights for early cardiac risk assessment. Utilizing the annotated CODE-15% dataset, it ensures reliable and scalable analysis of extensive ECG records. Advanced preprocessing, feature engineering, and model optimization techniques enhance predictive capabilities. The system is built for robustness, supporting large-scale datasets while maintaining flexibility. By integrating modern AI frameworks, it provides intelligent ECG analysis, aiding healthcare professionals in proactive monitoring and timely intervention for cardiac health.",
    techStack: [
      "React",
      "Flask",
      "MongoDB",
      "Machine Learning",
      "Python"
    ],
    githubLink: "https://github.com/Adharsh-Rengarajan/EchoSense-Predictive-Analysis-"
  }
];

const timelineData = [
  {
    date: "Sep 2024 - Present",
    title: "Master of Science in Software Engineering Systems",
    institution: "Northeastern University, Boston",
    image: NEUImage,
    detailsTitle: "Courses Taken",
    details: [
      "Object Oriented Design",
      "Web Design and User Experience Engineering",
      "Enterprise Software Design",
      "Program Structures & Algorithms",
    ],
  },
  {
    date: "Sep 2020 - May 2024",
    title: "Bachelor of Engineering in Computer Science and Engineering",
    institution: "K. Ramakrishnan College of Engineering, Trichy",
    image: KRCEImage,
    detailsTitle: "Major Subjects",
    details: [
      "Object Oriented Programming",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Cloud Computing",
      "Artificial Intelligence",
      "Machine Learning",
    ],
  },
  {
    date: "Oct 2023 - Feb 2024",
    title: "Software Testing Intern",
    institution: "Amalgam Rx",
    image: AmalgamImage,
    detailsTitle: "Roles & Responsibilities",
    details: [
      "Executed comprehensive testing across various software models, enhancing system reliability and performance.",
      "Led L1 testing, ensuring robust functionality and strict adherence to specifications.",
      "Authored detailed reports documenting performance metrics and improvements.",
      "Developed and fine-tuned prompts to streamline testing processes, driving process efficiency.",
      "Collaborated with cross-functional teams to refine prompts in alignment with evolving project demands.",
      "Engineered a Gradio-based automation application, significantly boosting testing efficiency.",
    ],
  },
];

const skillsData = {
  programmingLanguages: [
    { name: "Python", icon: PythonIcon },
    { name: "Java", icon: JavaIcon },
    { name: "JavaScript", icon: JSIcon }
  ],
  frontendFrameworks: [
    { name: "React", icon: ReactIcon }
  ],
  backendFrameworks: [
    { name: "Node.js", icon: NodeJSIcon },
    { name: "Express.js", icon: ExpressIcon },
    { name: "Servlets", icon: ServletsIcon },
    { name: "Spring", icon: SpringIcon },
    { name: "Flask", icon: FlaskIcon }
  ],
  databases: [
    { name: "MongoDB", icon: MongoDBIcon }
  ]
};





const ProjectCard = ({ project, index, isExpanded, toggleExpand }) => {
  return (
    <motion.div
      className={`project-card project-card-${index + 1}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={project.image} alt={project.title} className={`project-card-image-${index + 1}`} />
      <div className={`project-card-content-${index + 1}`}>
        <h3 className={`project-card-title-${index + 1}`}>{project.title}</h3>
        <p className={`project-card-description-${index + 1}`}>
          {isExpanded ? project.description : `${project.description.split(' ').slice(0, 10).join(' ')}...`}
        </p>
      </div>
      <div className={`project-card-expand-${index + 1}`}>
        <ChevronDown
          className={`expand-icon-${index + 1} ${isExpanded ? 'rotated' : ''}`}
          onClick={toggleExpand}
        />
      </div>
      {isExpanded && (
        <div className={`project-card-details-${index + 1} expanded`}>
          <div className={`tech-stack-${index + 1}`}>
            <h4 className={`tech-stack-title-${index + 1}`}>Tech Stack</h4>
            <div className={`tech-stack-list-${index + 1}`}>
              {project.techStack.map((tech, idx) => (
                <span key={idx} className={`tech-item-${index + 1}`}>{tech}</span>
              ))}
            </div>
          </div>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
            View on GitHub
          </a>
        </div>
      )}
    </motion.div>
  );
};



// Projects component
const Projects = ({ projectsData }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleExpand = (projectId) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section id="projects" className="projects-section section glass">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        My Projects
      </motion.h2>

      <div className="projects-container">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedProject === project.id}
            toggleExpand={() => toggleExpand(project.id)}
          />
        ))}
      </div>
    </section>
  );
};


const TimelineItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <motion.div className="timeline-item" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="timeline-content">
        <img src={item.image} alt={item.institution} className="timeline-image" />
        <div className="timeline-text">
          <h3>{item.date}</h3>
          <p className="timeline-title">{item.title}</p>
          <p className="timeline-institution">{item.institution}</p>
        </div>
      </div>
      <div className="dropdown-container">
        <img src={DownArrowIcon} alt="Toggle Details" className={`dropdown-icon ${expanded ? "rotated" : ""}`} onClick={toggleExpanded} />
      </div>
      {expanded && (
        <div className="dropdown-content">
          <h4>{item.detailsTitle}</h4>
          <ul>
            {item.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const SkillBubble = ({ skill, index }) => {
  return (
    <motion.div 
      className="skill-bubble"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1 
      }}
    >
      <img src={skill.icon} alt={skill.name} />
      <span>{skill.name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("programmingLanguages");

  const tabs = [
    { id: "programmingLanguages", label: "Programming Languages" },
    { id: "frontendFrameworks", label: "Frontend Frameworks" },
    { id: "backendFrameworks", label: "Backend Frameworks" },
    { id: "databases", label: "Databases" }
  ];

  return (
    <section id="skills" className="skills-section section glass">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        My Skills
      </motion.h2>
      
      <div className="skills-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`skills-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="skills-content">
        <div className="skills-grid">
          {skillsData[activeTab].map((skill, index) => (
            <SkillBubble key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact section for Portfolio.jsx

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // In a real implementation, you would send this to an API endpoint
      // that forwards the message to rengarjan.ad@northeastern.edu
      console.log("Form submitted:", formData);
      
      // For demo purposes - normally you'd check the response from your API
      const success = true;
      setSubmitStatus(success ? 'success' : 'error');
      
      if (success) {
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section section glass">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Get In Touch
      </motion.h2>
      
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3>Let's Connect</h3>
          <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
          
          <div className="contact-item">
            <img src={EmailIcon} alt="Email" className="contact-icon" />
            <span>rengarjan.ad@northeastern.edu</span>
          </div>
          
          <div className="contact-item">
      <img src={LocationIcon} alt="Location" className="contact-icon" />
            <span>Boston, Massachusetts</span>
          </div>
          
          <div className="contact-social">
            <a href="https://github.com/Adharsh-Rengarajan" target="_blank" rel="noopener noreferrer">
              <img src={GitHubIcon} alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/adharsh-rengarajan/" target="_blank" rel="noopener noreferrer">
              <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </motion.div>
        
        <motion.form 
          className="contact-form"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject" 
              required 
            />
          </div>
          
          <div className="form-group">
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="submission-message success">
              Your message has been sent successfully!
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="submission-message error">
              There was an error sending your message. Please try again.
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const navigate=useNavigate()
  const messages = [
    'console.log("Welcome")',
    'print("Welcome")',
    'System.out.println("Welcome")',
    '<h1>Welcome</h1>'
  ];

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      // Reset to first message after completing all
      setTimeout(() => {
        setDisplayText('');
        setCurrentMessageIndex(0);
        setCurrentCharIndex(0);
      }, 100);
      return;
    }

    if (currentCharIndex < messages[currentMessageIndex].length) {
      // Type out current character
      const typingTimer = setTimeout(() => {
        setDisplayText(prev => prev + messages[currentMessageIndex][currentCharIndex]);
        setCurrentCharIndex(currentCharIndex + 1);
      }, 100); // Adjust typing speed here
      
      return () => clearTimeout(typingTimer);
    } else {
      // Move to next message after delay
      const messageChangeTimer = setTimeout(() => {
        setDisplayText('');
        setCurrentMessageIndex(currentMessageIndex + 1);
        setCurrentCharIndex(0);
      }, 1500); // Delay between messages
      
      return () => clearTimeout(messageChangeTimer);
    }
  }, [currentMessageIndex, currentCharIndex]);

  return (
    <div className="portfolio-container">
      {/* Navigation Bar */}
      <nav className="navbar">
      <img src={ARLogo} alt="AR Logo" className="logo" onPress={() => navigate('/')}/>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education & Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="chat">Chat</a></li>

        </ul>
      </nav>

      {/* Hero Section */}
{/* Hero Section */}
<header className="hero">
  <motion.h1
    className="typing-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <pre className="typing-text">{displayText}</pre>
  </motion.h1>
  
  <motion.div 
    className="hero-message"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
  >
    <span className="code-comment">// Skip the scrolling and start a conversation with my bot</span>
  </motion.div>

  <motion.div 
    className="hero-buttons"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <button 
      className="chat-btn pulse-animation"
      onClick={() => navigate("/chat")}
    >
      <span className="btn-icon">💬</span>
      <span className="btn-text">Chat with Me</span>
    </button>
  </motion.div>
</header>

      {/* About Section */}
      <section id="about" className="section glass about-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am Adharsh Rengarajan and I'm a software engineering graduate student at Northeastern University, specializing in backend development with expertise in building server-side applications.
              My experience includes working with technologies like Node.js, Flask, and Express.js to develop efficient, data-driven systems. While my primary focus is backend architecture,
              I also have hands-on experience with frontend technologies like React, enabling me to build seamless full-stack applications.
            </p>
            <br />
            <p>
              At Amalgam Rx, I worked as both a software testing intern and a prompt engineer, gaining experience in AI-driven healthcare applications and software quality assurance.
              I led L1 testing, ensured system reliability, documented performance improvements, and developed prompts to optimize workflows. Additionally,
              I built a Gradio-based automation application to streamline testing efficiency. I am eager to connect with professionals in software development to exchange knowledge
              and explore opportunities to create impactful solutions.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a href={"https://leetcode.com/u/Adharsh_Rengarajan/"} target="_blank" rel="noopener noreferrer">
                <img src={LeetCodeIcon} alt="LeetCode" className="social-icon" />
              </a>
              <a href="https://github.com/Adharsh-Rengarajan" target="_blank" rel="noopener noreferrer">
                <img src={GitHubIcon} alt="GitHub" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/adharsh-rengarajan" target="_blank" rel="noopener noreferrer">
                <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://drive.google.com/file/d/1Y0HL0OZrUtBSiZYtagEkIugQYEwFR6rW/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <img src={ResumeImage} alt="LinkedIn" className="social-icon" />
              </a>
            </div>

            {/* Chess.com Challenge */}
            <div className="chess-challenge">
              <span>Think you can beat me in chess?</span>
              <a href="https://www.chess.com/member/adharsh_r" target="_blank" rel="noopener noreferrer">
                <img src={ChessIcon} alt="Chess.com" className="social-icon" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <img src={ProfileImage} alt="My Profile" className="about-image" />
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Education & Experience Section */}
      <section id="education" className="timeline-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Education & Experience
        </motion.h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <TimelineItem item={item} index={index} key={index} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <Skills />
      <Projects projectsData={projectsData}/>
      <Contact />
    </div>
  );
};

export default Portfolio;
