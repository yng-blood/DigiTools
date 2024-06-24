import React, { useEffect, useState } from 'react';
import './Autcss.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import IHeaders from './IHeaders';


const Home = () => {
  const [previousChatText, setPreviousChatText] = useState("");
  const [chatText, setChatText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const chatData = [
    "📄 Convert your documents effortlessly! 💼",
    "🔄 Transform PDFs into images with just a click! 📷",
    "📚 Supports multiple file formats for your convenience! 📑",
    "⚡ Fast and reliable conversions every time! 🚀",
    "🔍 Preview your files before converting! 👀",
    "🎨 High-quality output to meet your needs! 🖼️",
    "📂 Organize and manage your files with ease! 📁",
    "🌐 Access your converted files from anywhere! 🌍",
    "🔒 Your data is secure and private! 🔐",
    "💬 Get instant support for all your queries! 📞"
];


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Set the previous text before updating with the new text
      setPreviousChatText(chatText);
      // Display text in sequence
      setChatText(chatData[textIndex]);
      setTextIndex((prevIndex) => (prevIndex + 1) % chatData.length);
    }, 3000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [textIndex, chatData, chatText]);

  return (
    <>
      <div className='Navtopper'>
        <div>
          <Link to='./Login'><button className='button-5'>Login</button></Link>
        </div>
        <div>
          <Link to='./Signup'><button className='button-5'>Signup</button></Link>
        </div>
      </div>
  <div>  <IHeaders/>  
      </div>

      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"><div className="chat-text"><br/>{chatText} </div> </span>
        <span className="screen__background__shape screen__background__shape3"><div className="chat-text">{previousChatText}</div>
        <div className="chat-text">{chatText}</div> 
        </span>
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"> <br/><br/>   <div className="chat-text"><h1>{chatText} </h1></div>   </span>
      </div>
    </>
  );
};

export default Home;
