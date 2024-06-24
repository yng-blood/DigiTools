import React, { useState } from "react";

const JpegConvertor = () => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    // Handle file selection here
  };

  const convertPdfToImages = () => {
    setLoading(true);

    // Fake long-running conversion task
    setTimeout(() => {
      setLoading(false);
      // TODO: Add code here to convert the selected PDF to images
    }, 5000);
  };

  return (
    <div className="onRoll">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={convertPdfToImages} disabled={loading}>Convert PDF to Images</button>
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Converting...</p>
        </div>
      )}
    </div>
  );
};

export default JpegConvertor;