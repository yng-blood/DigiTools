import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Card.css';

const FileUpload = () => {
  const { id: userId } = useParams();
  const [images, setImages] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [pdfSaved, setPdfSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        imageFiles.push({ url: event.target.result, file: file });
        if (imageFiles.length === files.length) {
          setImages(imageFiles);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleConvertToPDF = () => {
    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const pdf = new jsPDF();
    images.forEach((image, index) => {
      if (index !== 0) {
        pdf.addPage();
      }
      pdf.addImage(image.url, 'JPEG', 0, 0, 210, 297); // Assuming A4 size for simplicity
    });

    const bytes = pdf.output('arraybuffer'); // Get PDF bytes
    const blob = new Blob([bytes], { type: 'application/pdf' });
    setPdfBlob(blob); // Set pdfBlob state

    const shouldSave = window.confirm('Do you want to save this PDF?');

    if (shouldSave) {
      saveAs(blob, 'Gyanganga_tools.pdf');
    }
  };

  const handlePdfChanges = (e) => {
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

  const toggleMessageBox = () => {
    setShowMessageBox(!showMessageBox);
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
        <h1>Image to PDF Converter</h1>
        <input className="pdf-button exact" type="file" accept="image/*" multiple onChange={handleImageChange} />
        <button className="pdf-button" onClick={handleConvertToPDF}>Convert to PDF</button>
        <button className="pdf-button" onClick={toggleMessageBox}>Save PDF to Database</button>
        {showMessageBox && (
          <div className="message-box">
            <input type="file" accept=".pdf" onChange={handlePdfChanges} />
            <input type="text"  className='none' placeholder="User ID" value={userId} readOnly />
            <button onClick={handleUploadPdf}>Upload PDF</button>
            {pdfSaved && <p>PDF saved successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={toggleMessageBox}>Close</button>
          </div>
        )}
        <div className="container">
          {images.map(({ url }, index) => (
            <div className="image-container" key={index} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>
              <img src={url} alt={`Image ${index}`} />
              {hoverIndex === index && (
                <button className="delete-button" onClick={() => handleDeleteImage(index)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
