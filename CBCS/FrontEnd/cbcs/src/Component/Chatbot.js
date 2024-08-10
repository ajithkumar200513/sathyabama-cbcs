// src/components/Chatbot.js
import React, { useState } from 'react';
import '../css/Chatbot.css'; // Import the CSS for styling

const responses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What information do you need about Sathyabama Institute of Science and Technology?"
  ],
  about: [
    "Sathyabama Institute of Science and Technology (SIST) is renowned for its excellence in education and research. We offer a wide range of undergraduate, postgraduate, and doctoral programs.",
    "SIST operates under the Choice Based Credit System (CBCS), allowing students to choose their courses based on their interests and career goals."
  ],
  admission: [
    "For admission details, you can visit our official website or contact our admissions office. The website has all the information regarding eligibility, application process, and deadlines."
  ],
  programs: [
    "We offer various programs across disciplines like Engineering, Management, Science, and Humanities. You can check our website for a detailed list of programs and their curriculum."
  ],
  contact: [
    "You can reach out to us through our official website's contact form, or find contact details of various departments on our website."
  ],
  cbcs: [
    "The Choice Based Credit System (CBCS) at SIST allows students to select courses from a wide range of options based on their interests and career goals. This system provides flexibility in learning and helps students tailor their education according to their aspirations.",
    "Under CBCS, students can earn credits by completing chosen courses and can also opt for interdisciplinary courses to enhance their learning experience. This system aims to provide a more personalized and engaging education."
  ],
  default: [
    "I'm sorry, I didn't understand that. Can you please rephrase your question?"
  ]
};

const getResponse = (message) => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }
  if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('information')) {
    return responses.about[Math.floor(Math.random() * responses.about.length)];
  }
  if (lowerCaseMessage.includes('admission') || lowerCaseMessage.includes('apply')) {
    return responses.admission[Math.floor(Math.random() * responses.admission.length)];
  }
  if (lowerCaseMessage.includes('program') || lowerCaseMessage.includes('course')) {
    return responses.programs[Math.floor(Math.random() * responses.programs.length)];
  }
  if (lowerCaseMessage.includes('contact')) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }
  if (lowerCaseMessage.includes('cbcs') || lowerCaseMessage.includes('choice based credit system')) {
    return responses.cbcs[Math.floor(Math.random() * responses.cbcs.length)];
  }
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      const response = getResponse(input);
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: response }]);
      setInput('');
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button className='chatbot-toggle' onClick={toggleChatbot}>
        <i className='fas fa-comments'></i>
      </button>
      {isOpen && (
        <div className='chatbot-box'>
          <div className='chatbot-header'>
            <h4>Chat with us</h4>
            <button className='chatbot-close' onClick={toggleChatbot}>
              <i className='fas fa-times'></i>
            </button>
          </div>
          <div className='chatbot-content'>
            <div className='chatbot-messages'>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          <div className='chatbot-input'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder='Type your message...'
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
