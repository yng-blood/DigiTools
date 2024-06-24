import React from 'react';
import './IHeaders.css'; // Import CSS file for styling

const IHeaders = () => {
  return (
    <div className="header-container">
        <text x="0" y="35" className="svg-text"><div></div><h3 className='t'>Digi</h3></text>
      <svg className="svg-title" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <text x="35" y="35" className="svg-text svg-text-purple">T</text>
        <text x="50" y="35" className="svg-text svg-text-blue">o</text>
        <text x="65" y="35" className="svg-text svg-text-white">o</text>
        <text x="80" y="35" className="svg-text svg-text-purple bold">l</text>
        <text x="95" y="35" className="svg-text svg-text-blue bold">s</text>
      </svg>
      
    </div>
  );
}

export default IHeaders;
