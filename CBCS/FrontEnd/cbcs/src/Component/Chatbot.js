// src/components/Chatbot.js
import React, { useState } from 'react';
import '../css/Chatbot.css'; // Import the CSS for styling



const responses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What information do you need about Sathyabama Institute of Science and Technology?",
  ],
  about: [
    "Sathyabama Institute of Science and Technology (SIST) is renowned for its excellence in education and research. We offer a wide range of undergraduate, postgraduate, and doctoral programs.",
    "SIST operates under the Choice Based Credit System (CBCS), allowing students to choose their courses based on their interests and career goals.",
  ],
  admission: [
    "For admission details, you can visit our official website or contact our admissions office. The website has all the information regarding eligibility, application process, and deadlines.",
  ],
  programs: [
    "We offer various programs across disciplines like Engineering, Management, Science, and Humanities. You can check our website for a detailed list of programs and their curriculum.",
  ],
  contact: [
    "You can reach out to us through our official website's contact form, or find contact details of various departments on our website.",
  ],
  cbcs: [
    "The Choice Based Credit System (CBCS) at SIST allows students to select courses from a wide range of options based on their interests and career goals. This system provides flexibility in learning and helps students tailor their education according to their aspirations.",
    "Under CBCS, students can earn credits by completing chosen courses and can also opt for interdisciplinary courses to enhance their learning experience. This system aims to provide a more personalized and engaging education.",
  ],
  environment: [
    "SIST is committed to sustainability and maintaining a green campus. Our university has numerous green initiatives, including solar energy utilization, water conservation, and waste management programs.",
  ],
  rankings: [
    "Sathyabama Institute of Science and Technology consistently ranks among the top institutions in India for its academic excellence, research output, and campus infrastructure.",
  ],
  transportation: [
    "Our campus is well-connected with public transportation. We also offer shuttle services for students and staff to nearby locations, ensuring easy accessibility to and from the campus.",
  ],
  dining: [
    "We have multiple dining options on campus, including canteens and cafes that offer a variety of cuisines. Special dietary requirements are also catered to, ensuring that all students have access to nutritious meals.",
  ],
  health: [
    "SIST has a dedicated health center that provides medical services to students and staff. We also have wellness programs that promote a healthy lifestyle and mental well-being.",
  ],
  counseling: [
    "Our counseling services are available to help students with academic, career, and personal challenges. Trained professionals offer guidance and support to ensure student success and well-being.",
  ],
  internships: [
    "SIST has a robust internship program that connects students with industry leaders. These internships provide practical experience and help students apply their knowledge in real-world settings.",
  ],
  faculty: [
    "Our faculty members are experts in their respective fields, bringing a wealth of knowledge and experience to the classroom. They are dedicated to providing quality education and mentoring students.",
  ],
  researchPublications: [
    "Sathyabama University has a strong focus on research and innovation. Our faculty and students regularly publish their findings in reputed journals and conferences globally.",
  ],
  internationalPrograms: [
    "SIST offers various international exchange programs that allow students to study abroad and experience different cultures. These programs are designed to broaden their perspectives and enhance their educational experience.",
  ],
  festivals: [
    "Our university celebrates a wide range of cultural and academic festivals. These events provide students with opportunities to showcase their talents and engage with the broader campus community.",
  ],
  eLearning: [
    "We offer e-learning platforms that provide digital resources and online courses. These tools support our students in their academic journey and ensure continuous learning opportunities.",
  ],
  security: [
    "Campus security is a top priority at SIST. We have a dedicated security team and surveillance systems in place to ensure the safety of all students and staff.",
  ],
  communityEngagement: [
    "SIST is actively involved in community engagement initiatives. Our students participate in various outreach programs that aim to give back to society and make a positive impact.",
  ],
  exchangePrograms: [
    "We have several student exchange programs with international universities. These programs offer unique opportunities for cultural exchange and academic collaboration.",
  ],
  onlineApplication: [
    "You can apply to our programs online through the official website. The online application process is straightforward, with all necessary guidelines provided for a seamless experience.",
  ],
  environment: [
    "SIST is committed to sustainability and maintaining a green campus. Our university has numerous green initiatives, including solar energy utilization, water conservation, and waste management programs."
  ],
  rankings: [
    "Sathyabama Institute of Science and Technology consistently ranks among the top institutions in India for its academic excellence, research output, and campus infrastructure."
  ],
  transportation: [
    "Our campus is well-connected with public transportation. We also offer shuttle services for students and staff to nearby locations, ensuring easy accessibility to and from the campus."
  ],
  dining: [
    "We have multiple dining options on campus, including canteens and cafes that offer a variety of cuisines. Special dietary requirements are also catered to, ensuring that all students have access to nutritious meals."
  ],
  health: [
    "SIST has a dedicated health center that provides medical services to students and staff. We also have wellness programs that promote a healthy lifestyle and mental well-being."
  ],
  counseling: [
    "Our counseling services are available to help students with academic, career, and personal challenges. Trained professionals offer guidance and support to ensure student success and well-being."
  ],
  internships: [
    "SIST has a robust internship program that connects students with industry leaders. These internships provide practical experience and help students apply their knowledge in real-world settings."
  ],
  faculty: [
    "Our faculty members are experts in their respective fields, bringing a wealth of knowledge and experience to the classroom. They are dedicated to providing quality education and mentoring students."
  ],
  research: [
    "Sathyabama University has a strong focus on research and innovation. Our faculty and students regularly publish their findings in reputed journals and conferences globally."
  ],
  international: [
    "SIST offers various international exchange programs that allow students to study abroad and experience different cultures. These programs are designed to broaden their perspectives and enhance their educational experience."
  ],
  festivals: [
    "Our university celebrates a wide range of cultural and academic festivals. These events provide students with opportunities to showcase their talents and engage with the broader campus community."
  ],
  eLearning: [
    "We offer e-learning platforms that provide digital resources and online courses. These tools support our students in their academic journey and ensure continuous learning opportunities."
  ],
  security: [
    "Campus security is a top priority at SIST. We have a dedicated security team and surveillance systems in place to ensure the safety of all students and staff."
  ],
  community: [
    "SIST is actively involved in community engagement initiatives. Our students participate in various outreach programs that aim to give back to society and make a positive impact."
  ],
  exchange: [
    "We have several student exchange programs with international universities. These programs offer unique opportunities for cultural exchange and academic collaboration."
  ],
  onlineApplication: [
    "You can apply to our programs online through the official website. The online application process is straightforward, with all necessary guidelines provided for a seamless experience."
  ],
  Sathyabama:[
    "Sathyabama is a prestigious institution which excels in the fields of Engineering, Science and Technology for more than three successful decades."
  ],

  default: [
    "I'm sorry, I didn't understand that. Can you please rephrase your question?",
  ],
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
  if (lowerCaseMessage.includes('environment') || lowerCaseMessage.includes('green campus')) {
    return responses.environment[Math.floor(Math.random() * responses.environment.length)];
  }
  if (lowerCaseMessage.includes('ranking')) {
    return responses.rankings[Math.floor(Math.random() * responses.rankings.length)];
  }
  if (lowerCaseMessage.includes('transportation') || lowerCaseMessage.includes('accessibility')) {
    return responses.transportation[Math.floor(Math.random() * responses.transportation.length)];
  }
  if (lowerCaseMessage.includes('food') || lowerCaseMessage.includes('dining')) {
    return responses.dining[Math.floor(Math.random() * responses.dining.length)];
  }
  if (lowerCaseMessage.includes('health') || lowerCaseMessage.includes('wellness')) {
    return responses.health[Math.floor(Math.random() * responses.health.length)];
  }
  if (lowerCaseMessage.includes('counseling') || lowerCaseMessage.includes('support')) {
    return responses.counseling[Math.floor(Math.random() * responses.counseling.length)];
  }
  if (lowerCaseMessage.includes('internship') || lowerCaseMessage.includes('training')) {
    return responses.internships[Math.floor(Math.random() * responses.internships.length)];
  }
  if (lowerCaseMessage.includes('faculty') || lowerCaseMessage.includes('teaching')) {
    return responses.faculty[Math.floor(Math.random() * responses.faculty.length)];
  }
  if (lowerCaseMessage.includes('research') || lowerCaseMessage.includes('publication')) {
    return responses.researchPublications[Math.floor(Math.random() * responses.researchPublications.length)];
  }
  if (lowerCaseMessage.includes('international') || lowerCaseMessage.includes('student programs')) {
    return responses.internationalPrograms[Math.floor(Math.random() * responses.internationalPrograms.length)];
  }
  if (lowerCaseMessage.includes('festival') || lowerCaseMessage.includes('celebration')) {
    return responses.festivals[Math.floor(Math.random() * responses.festivals.length)];
  }
  if (lowerCaseMessage.includes('e-learning') || lowerCaseMessage.includes('digital resources')) {
    return responses.eLearning[Math.floor(Math.random() * responses.eLearning.length)];
  }
  if (lowerCaseMessage.includes('security') || lowerCaseMessage.includes('safety')) {
    return responses.security[Math.floor(Math.random() * responses.security.length)];
  }
  if (lowerCaseMessage.includes('community') || lowerCaseMessage.includes('engagement')) {
    return responses.communityEngagement[Math.floor(Math.random() * responses.communityEngagement.length)];
  }
  if (lowerCaseMessage.includes('exchange') || lowerCaseMessage.includes('student exchange')) {
    return responses.exchangePrograms[Math.floor(Math.random() * responses.exchangePrograms.length)];
  }
  if (lowerCaseMessage.includes('apply online') || lowerCaseMessage.includes('online application')) {
    return responses.onlineApplication[Math.floor(Math.random() * responses.onlineApplication.length)];
  }
  if (lowerCaseMessage.includes('sathyabama') || lowerCaseMessage.includes('sathyabama')) {
    return responses.Sathyabama[Math.floor(Math.random() * responses.Sathyabama.length)];
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
            <h4>Chat about sathyabama cbcs</h4>
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
