import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const FileUpload = () => {
  const { id: userId } = useParams();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfSaved, setPdfSaved] = useState(false);
  const [error, setError] = useState(null);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleUploadPdf = async () => {
    if (!pdfFile || !userId) {
      setError('Please select a PDF file and enter user ID.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('pdf', pdfFile);

      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setPdfSaved(true);
        setError(null);
      }
    } catch (error) {
      setError('Failed to upload PDF.');
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <>
      <Link to={`../UserHome/${userId}`} className="back-button">
        back to page
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.354 2.354a.5.5 0 0 1 0 .708L2.707 7.5H14.5a.5.5 0 0 1 0 1H2.707l4.647 4.646a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
        </svg>
      </Link>
      <div>
        <h1>PDF Upload</h1>
        <input className='pdf-button exact' type="file" accept=".pdf" onChange={handlePdfChange} />
        <button className="pdf-button" onClick={handleUploadPdf}>Upload PDF</button>
        {pdfSaved && <h1>PDF saved successfully!</h1>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
}

export default FileUpload;
